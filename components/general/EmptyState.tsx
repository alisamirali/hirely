import { Button } from "@/components/ui/button";
import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";

type EmptyStateProps = {
  title: string;
  description: string;
  buttonText: string;
  href: string;
};

export function EmptyState({
  buttonText,
  description,
  href,
  title,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 gap-6">
      <div className="flex size-24 items-center justify-center rounded-full bg-destructive/10">
        <Ban className="size-14 text-destructive" />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-center text-sm leading-tight text-muted-foreground max-w-sm mx-auto">
          {description}
        </p>
      </div>

      <Button asChild>
        <Link href={href}>
          <PlusCircle className="size-4" /> {buttonText}
        </Link>
      </Button>
    </div>
  );
}
