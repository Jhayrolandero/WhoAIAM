import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeProps {
  children: React.ReactNode;
  className?: string;
}

const Code: React.FC<CodeProps> = ({ children, className }) => {
  const language = className ? className.replace("lang-", "") : "";

  if (language === "") {
    return <strong className="">{String(children).replace(/\n$/, "")}</strong>;
  } else {
    return (
      <div className="relative w-full rounded-4xl">
        {/* <button
          onClick={() => {
            navigator.clipboard.writeText(String(children));
          }}
          className="absolute top-0 right-0 flex items-center"
        >
          <IoCopyOutline /> Copy
        </button> */}
        <span className="border-b-[1px] h-2 border-white w-full">
          <p className="p-2">{language}</p>
        </span>
        <SyntaxHighlighter
          customStyle={{ background: "#121314", margin: 0 }}
          language={language}
          style={{
            ...materialDark,
            'pre[class*="language-"]': {
              ...materialDark['pre[class*="language-"]'],
              background: "none", // Remove background from the <pre> element
            },
            'code[class*="language-"]': {
              ...materialDark['code[class*="language-"]'],
              background: "none", // Remove background from the <code> element
            },
          }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    );
  }
};

export default Code;
