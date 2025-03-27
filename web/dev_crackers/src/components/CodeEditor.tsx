import React from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import { FaPlay } from "react-icons/fa";
import CircleLoader from "@/components/CircleLoader";

interface CodeEditorProps {
  language?: string;
  theme?: string;
  code: string;
  loading?: boolean;
  output?: string[];
  onChange: (value: string | undefined) => void;
  onRunCode: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language = "javascript",
  theme = "vs-dark",
  code,
  loading = false,
  output = [],
  onChange,
  onRunCode,
}) => {
  const handleEditorDidMount = (editor: any, monaco: any) => {
    monaco.languages.registerCompletionItemProvider("javascript", {
      provideCompletionItems: () => {
        return {
          suggestions: [
            {
              label: "log",
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              insertText: "console.log($1);",
              documentation: "Console log shortcut",
            },
            {
              label: "arr",
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              insertText: "const $1 = ($2) => { $3 };",
              documentation: "Arrow function snippet",
            },
          ],
        };
      },
    });
  };
  return (
    <div className="flex flex-col md:flex-row border border-gray-300 rounded-2xl overflow-hidden relative">
      {/* Monaco Editor */}
      <div className=" w-full md:w-[70%]">
        <Editor
          height="70vh"
          width="100%"
          defaultLanguage={language}
          defaultValue="// Start coding here"
          value={code}
          onChange={onChange}
          onMount={handleEditorDidMount}
          theme={theme}
          options={{
            fontSize: 14,
            minimap: { enabled: true },
            automaticLayout: true,
            wordWrap: "on",
            suggestOnTriggerCharacters: true,
            quickSuggestions: { other: true, comments: true, strings: true },
          }}
        />
      </div>

      {/* Run Button */}
      <button
        onClick={onRunCode}
        className="absolute bottom-5 transition-all duration-300 ease-in-out hover:scale-125 bg-green-600 h-fit w-fit rounded-full text-white p-3 z-40 right-[24rem] cursor-pointer"
      >
        {loading ? <CircleLoader /> : <FaPlay className="text-2xl" />}
      </button>

      {/* Output Section */}
      <div className=" w-full md:w-[30%] h-[26rem] md:h-auto">
        <div className="p-4 bg-[#1e1e1e]">
          <h3 className="text-white">Your Output</h3>
        </div>
        <div className="w-full h-full bg-black p-3 text-green-500 font-thin">
          {output.length > 0 ? output[0] : "No output yet"}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
