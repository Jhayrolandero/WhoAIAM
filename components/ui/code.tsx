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
      <div className="relative w-full">
        {/* <button
          onClick={() => {
            navigator.clipboard.writeText(String(children));
          }}
          className="absolute top-0 right-0 flex items-center"
        >
          <IoCopyOutline /> Copy
        </button> */}
        <span className="border-b-[1px] border-white w-full">{language}</span>
        <SyntaxHighlighter language={language} style={materialDark}>
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    );
  }
};

export default Code;
