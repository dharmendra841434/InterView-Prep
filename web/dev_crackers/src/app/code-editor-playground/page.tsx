"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { FaPlay } from "react-icons/fa";
import axios from "axios";
import CircleLoader from "@/components/CircleLoader";
import CodeEditor from "@/components/CodeEditor";

const Playground = () => {
  const [code, setcode] = useState("");
  const [output, setOutput] = useState([]);

  const [loading, setLoading] = useState(false);

  function handleEditorChange(value: any, event: any) {
    setcode(value);
    // console.log("here is the current model value:", value);
  }

  async function executeCode(code: string) {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://interview-prep-backend-pi.vercel.app/execute",
        { code },
        { headers: { "Content-Type": "application/json" } }
      );

      setOutput(response.data?.output);
    } catch (error: any) {
      console.error("Error executing code:", error);
      return {
        success: false,
        output: `Request failed: ${
          error?.response?.data?.message || error.message
        }`,
      };
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" -mt-4">
      <div className=" w-full flex flex-col items-center justify-center py-4">
        <h2 className=" font-bold text-2xl">JavaScript Code Editor</h2>
        <p className=" font-thin text-gray-400">
          write and test your logic here
        </p>
      </div>
      <CodeEditor
        language="javascript"
        theme="vs-dark"
        code={code}
        output={output}
        loading={loading}
        onChange={(newCode) => setcode(newCode || "")}
        onRunCode={() => executeCode(code)}
      />
    </div>
  );
};

export default Playground;
