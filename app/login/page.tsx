import { LoginForm } from "@/components/forms/LoginForm";
import Logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <section className="min-h-screen w-screen flex items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center">
          <Image src={Logo} alt="Logo" className="size-8" />
          <h1 className="text-2xl font-bold">
            Hirely<span className="text-primary">.</span>
          </h1>
        </Link>
        <LoginForm />
      </div>
    </section>
  );
}
