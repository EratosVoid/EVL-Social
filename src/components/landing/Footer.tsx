"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h3 className="text-lg font-bold text-white">
              EVL Startup Social
            </h3>
            <p className="mt-1 text-sm text-white/30">
              Mangalore&apos;s founder community
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 transition-colors hover:text-white/60"
            >
              WhatsApp
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 transition-colors hover:text-white/60"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 transition-colors hover:text-white/60"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-white/20">
          &copy; {new Date().getFullYear()} EVL Startup Social
        </div>
      </div>
    </footer>
  );
}
