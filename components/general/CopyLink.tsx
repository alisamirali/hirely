"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Link2 } from "lucide-react";
import { toast } from "sonner";

type CopyLinkMenuItemProps = {
  jobUrl: string;
};

export function CopyLinkMenuItem({ jobUrl }: CopyLinkMenuItemProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jobUrl);
      toast.success("URL copied to clipboard");
    } catch (err) {
      console.error("Could not copy text: ", err);
      toast.error("Failed to copy URL");
    }
  };

  return (
    <DropdownMenuItem onSelect={handleCopy} className="cursor-pointer">
      <Link2 className="size-4" />
      <span>Copy Job URL</span>
    </DropdownMenuItem>
  );
}
