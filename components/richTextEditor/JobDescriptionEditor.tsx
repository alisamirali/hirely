"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
// @ts-expect-error - TipTap extension types
import LinkExtension from "@tiptap/extension-link";
// @ts-expect-error - TipTap extension types
import TextAlignExtension from "@tiptap/extension-text-align";
import { useEffect } from "react";
import type { ControllerRenderProps } from "react-hook-form";
import { MenuBar } from "./MenuBar";

type JobDescriptionEditorProps = {
  field: ControllerRenderProps<Record<string, unknown>, string>;
};

export function JobDescriptionEditor({ field }: JobDescriptionEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      TextAlignExtension.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl " +
          "leading-snug prose-p:my-1.5 prose-p:leading-snug " +
          "focus:outline-none min-h-[300px] p-4 max-w-none dark:prose-invert",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : "",
    immediatelyRender: false,
  });

  // Update editor content when form value changes externally
  useEffect(() => {
    if (editor && field.value && editor.getHTML() !== field.value) {
      editor.commands.setContent(JSON.parse(field.value));
    }
  }, [editor, field.value]);

  return (
    <div className="w-full">
      <div className="border rounded-lg overflow-hidden bg-card">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
