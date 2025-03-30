"use client"; // Ensure it's a client component

import React, { useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";

// Dynamically import JoditEditor to avoid SSR issues
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const JoditRichTextEditor = ({
  value,
  onChange,
  placeholder = "Start typing...",
}: any) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder,
      theme: "dark", // Change to 'default' or 'dark'
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => onChange(newContent)} // Update content on blur
    />
  );
};

export default JoditRichTextEditor;
