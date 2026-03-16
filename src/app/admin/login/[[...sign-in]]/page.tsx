import { SignIn } from "@clerk/nextjs";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignIn fallbackRedirectUrl="/admin" />
    </div>
  );
}
