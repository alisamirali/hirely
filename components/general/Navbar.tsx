import Image from "next/image";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";

import { ThemeToggle } from "@/components/general/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logo from "@/public/logo.png";
import { Menu } from "lucide-react";

export async function Navbar() {
  return (
    <nav className="flex justify-between items-center py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Hirely Logo" width={30} height={30} />
        <h1 className="text-2xl font-bold">
          Hirely<span className="text-primary">.</span>
        </h1>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-5">
        <ThemeToggle />
        <Link href="/post-job" className={buttonVariants({ size: "lg" })}>
          Post Job
        </Link>

        {true ? (
          //   <UserDropdown
          //     email={session.user.email as string}
          //     name={session.user.name as string}
          //     image={session.user.image as string}
          //   />
          <></>
        ) : (
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center gap-4">
        <ThemeToggle />
        {false ? (
          //   <UserDropdown
          //     email={session.user.email as string}
          //     name={session.user.name as string}
          //     image={session.user.image as string}
          //   />
          <></>
        ) : (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader className="text-left">
                <SheetTitle>
                  Job<span className="text-primary">Marshal</span>
                </SheetTitle>
                <SheetDescription>
                  Find or post your next job opportunity
                </SheetDescription>
              </SheetHeader>

              <div className="flex flex-col gap-4 mt-6">
                <Link
                  href="/"
                  className="text-lg px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors duration-200"
                >
                  Find New Job
                </Link>
                <Link
                  href="/post-job"
                  className="text-lg px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors duration-200"
                >
                  Post a Job
                </Link>
                <Link
                  href="/login"
                  className="text-lg px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors duration-200"
                >
                  Login
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </nav>
  );
}
