import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Input } from "antd"; // Ant Design components
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Bold from "@tiptap/extension-bold";
import Underline from "@tiptap/extension-underline";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";
// Custom Icons (your existing Icons.jsx)
import * as Icons from "./Icon";
import "./tiny.css"

const EditorTiny = ({ description, handleEditorChange }) => {
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Link.configure({ openOnClick: false }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code,
    ],
    content: description,
    onUpdate: ({ editor }) => {
      handleEditorChange(editor.getHTML()); // Pass content to parent component
    },
  });
  console.log(description);
  
  
  useEffect(() => {
    if (editor && description) {
      editor.commands.setContent(description);
    }
  }, [description, editor]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");

  const openModal = useCallback(() => {
    setUrl(editor.getAttributes("link").href);
    setIsOpen(true);
  }, [editor]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setUrl("");
  }, []);

  const saveLink = useCallback(() => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    } else {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    }
    closeModal();
  }, [editor, url, closeModal]);

  const removeLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    closeModal();
  }, [editor, closeModal]);

  const toggleBold = useCallback(
    () => editor.chain().focus().toggleBold().run(),
    [editor]
  );
  const toggleUnderline = useCallback(
    () => editor.chain().focus().toggleUnderline().run(),
    [editor]
  );
  const toggleItalic = useCallback(
    () => editor.chain().focus().toggleItalic().run(),
    [editor]
  );
  const toggleStrike = useCallback(
    () => editor.chain().focus().toggleStrike().run(),
    [editor]
  );
  const toggleCode = useCallback(
    () => editor.chain().focus().toggleCode().run(),
    [editor]
  );

  if (!editor) return null;

  return (
    <div className="relative w-full mb-6 bg-white ">
      {/* Toolbar */}
      <div className="absolute top-1 flex w-full items-center gap-2 h-[40px] m-0 py-0 px-2 rounded-tl-sm rounded-tr-sm border-b-[1px] border-b-gray-400 text-gray-200">
        <Button
          icon={<Icons.RotateLeft />}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          size="small"
        />
        <Button
          icon={<Icons.RotateRight />}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          size="small"
        />
        <Button
          icon={<Icons.Link />}
          className={editor.isActive("link") ? "bg-blue-500 text-white" : ""}
          onClick={openModal}
          size="small"
        />
        <Button
          icon={<Icons.Bold />}
          className={editor.isActive("bold") ? "bg-yellow-500 text-white" : ""}
          onClick={toggleBold}
          size="small"
        />
        <Button
          icon={<Icons.Underline />}
          className={
            editor.isActive("underline") ? "bg-green-500 text-white" : ""
          }
          onClick={toggleUnderline}
          size="small"
        />
        <Button
          icon={<Icons.Italic />}
          className={editor.isActive("italic") ? "bg-red-500 text-white" : ""}
          onClick={toggleItalic}
          size="small"
        />
        <Button
          icon={<Icons.Strikethrough />}
          className={editor.isActive("strike") ? "bg-gray-500 text-white" : ""}
          onClick={toggleStrike}
          size="small"
        />
        <Button
          icon={<Icons.Code />}
          className={editor.isActive("code") ? "bg-blue-300 text-white" : ""}
          onClick={toggleCode}
          size="small"
        />
      </div>

      {/* Editor Content */}
      <EditorContent className="" editor={editor} />

      {/* Link Modal */}
      <Modal
        title="Edit Link"
        visible={modalIsOpen}
        onCancel={closeModal}
        onOk={saveLink}
      >
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <Button className="mt-4" danger onClick={removeLink}>
          Remove Link
        </Button>
      </Modal>
    </div>
  );
};

export default EditorTiny;
