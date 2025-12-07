"use client";

import { Heart, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export function GeneralSubmitButton({
  text,
  icon,
  variant,
  width = "w-full",
}: {
  text: string;
  icon?: React.ReactNode;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  width?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={variant}
      disabled={pending}
      className={width}
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin " />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          {icon && <div>{icon}</div>}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
}

export function SaveJobButton({ savedJob }: { savedJob: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="outline"
      disabled={pending}
      type="submit"
      className="flex items-center gap-2"
    >
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <Heart
            className={`size-4 transition-colors ${
              savedJob ? "fill-current text-red-500" : ""
            }`}
          />

          {savedJob ? "Saved" : "Save Job"}
        </>
      )}
    </Button>
  );
}
