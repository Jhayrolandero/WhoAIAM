import Markdown from "markdown-to-jsx";
import React from "react";
import Code from "../ui/code";
import Image from "next/image";

const MessageBox: React.FC<{
  children?: React.ReactNode;
  message: string;
  user: string;
}> = ({ children, message, user }) => {
  if (!message) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      console.log("Text copied to clipboard!");
      // Optionally, add a toast/notification here to confirm success
    } catch (err) {
      console.error("Failed to copy: ", err);
      // Optionally, handle the error with a user-facing message
    }
  };

  const Pre = ({ children }: { children?: React.ReactNode }) => (
    <pre className="bg-[#36383A] border-[1px] rounded-sm my-4 overflow-auto">
      {children}
    </pre>
  );

  const H3 = ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-white">{children}</h3>
  );

  const Strong = ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-bold text-white">{children}</strong>
  );

  return (
    <div
      className={`group grid w-full ${
        user === "user"
          ? "place-items-end grid-cols-[1fr_auto]"
          : "grid-cols-[auto_1fr]"
      } gap-1 max-w-full container`}
    >
      <div
        className={`rounded-lg max-h-max ${
          user === "user" ? "order-2" : "order-1"
        }`}
      >
        {user === "user" ? (
          <div className="size-8 rounded-lg">
            <Image
              src="/pic.avif"
              alt="me"
              width={18}
              height={18}
              className="w-full h-full aspect-square rounded-full"
            />
          </div>
        ) : (
          <div className="size-8 rounded-lg p-[0.1em]">
            <svg
              className="w-full h-full aspect-square stroke-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#ffffff"
              fill="none"
            >
              {/* SVG paths unchanged for brevity */}
              <path
                d="M11.7453 14.85L6.90436 12V7C6.90436 4.79086 8.72949 3 10.9809 3C12.3782 3 13.6113 3.6898 14.3458 4.74128"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* ... other paths ... */}
            </svg>
          </div>
        )}
      </div>
      <div
        className={`${
          user === "user" ? "bg-[#2D2E2F] order-1" : "order-2"
        } px-3 py-2 rounded-lg max-w-[80%] break-words`}
      >
        <Markdown
          className="prose text-white text-[1rem] leading-7 text-wrap max-w-full"
          options={{
            overrides: {
              code: { component: Code },
              pre: { component: Pre },
              h3: { component: H3 },
              strong: { component: Strong },
            },
          }}
        >
          {message}
        </Markdown>
        {user !== "user" && (
          <div className="group-hover:">
            <button onClick={handleCopy}>Copy</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
