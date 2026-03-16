const DB_NAME = "evl-templates";
const DB_VERSION = 1;
const STORE_NAME = "templates";

export type Template = {
  id: string;
  name: string;
  channel: "email" | "whatsapp";
  subject?: string;
  body: string;
  createdAt: number;
  updatedAt: number;
};

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("channel", "channel", { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function getTemplates(channel?: "email" | "whatsapp"): Promise<Template[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);

    let req: IDBRequest;
    if (channel) {
      const index = store.index("channel");
      req = index.getAll(channel);
    } else {
      req = store.getAll();
    }

    req.onsuccess = () => {
      const results = req.result as Template[];
      results.sort((a, b) => b.updatedAt - a.updatedAt);
      resolve(results);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function saveTemplate(
  template: Omit<Template, "id" | "createdAt" | "updatedAt"> & { id?: string }
): Promise<Template> {
  const db = await openDB();
  const now = Date.now();
  const full: Template = {
    id: template.id || crypto.randomUUID(),
    name: template.name,
    channel: template.channel,
    subject: template.subject,
    body: template.body,
    createdAt: template.id ? now : now, // will be overwritten if updating
    updatedAt: now,
  };

  // If updating, preserve original createdAt
  if (template.id) {
    const existing = await getTemplate(template.id);
    if (existing) {
      full.createdAt = existing.createdAt;
    }
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(full);
    req.onsuccess = () => resolve(full);
    req.onerror = () => reject(req.error);
  });
}

export async function getTemplate(id: string): Promise<Template | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result || null);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteTemplate(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}
