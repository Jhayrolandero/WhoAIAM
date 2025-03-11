import Markdown from "markdown-to-jsx";
import React, { Children, useContext } from "react";
import Code from "../ui/code";
import { Bot, PersonStanding } from "lucide-react";

const MessageBox: React.FC<{
  children?: React.ReactNode;
  message: string;
  user: string;
}> = ({ children, message, user }) => {
  //   const {userState, setUserState} = useContext(UserContext);

  if (!message) return null;
  const Pre = ({ children }: { children: string }) => (
    <pre className="bg-[#36383A]  border-[1px]  rounded-sm my-4">
      {children}
    </pre>
  );

  const H3 = ({ children }: { children: string }) => (
    <h3 className="text-white">{children}</h3>
  );

  const Strong = ({ children }: { children: string }) => (
    <strong className="font-bold text-white">{children}</strong>
  );

  return (
    <div
      className={`grid w-full ${
        user === "user"
          ? "place-items-end grid-cols-[1fr_auto]"
          : "grid-cols-[auto_1fr]"
      } gap-1`}
    >
      <div
        className={`rounded-lg max-h-max ${
          user === "user" ? "order-2" : "order-1"
        }`}
      >
        {user === "user" ? (
          <div className="size-8 rounded-lg">
            <PersonStanding className=" w-full h-full aspect-square" />
            {/* <img className='w-full h-full aspect-square' src={userState.userState.profile_url} alt={userState.userState.display_name} /> */}
          </div>
        ) : (
          <div className="size-8 rounded-lg bg-[#0080FF] p-[0.1em] ">
            <Bot className=" w-full h-full aspect-square" />
          </div>
        )}
      </div>
      <div
        className={`${user === "user" && "bg-[#2D2E2F]"} px-3 py-2 rounded-lg`}
        // className={`${
        //   entity === "user" ? "order-1 max-w-[70%]" : "order-2"
        // } px-4 space-y-3 py-2 rounded-md flex flex-col group`}
      >
        <Markdown
          className="prose text-white text-[1rem] leading-7"
          options={{
            overrides: {
              code: {
                component: Code,
              },
              pre: {
                component: Pre,
              },
              h3: {
                component: H3,
              },
              strong: {
                component: Strong,
              },
            },
          }}
        >
          {message}
        </Markdown>

        {/* <button
          onClick={() => {
            navigator.clipboard.writeText(message);
          }}
          className={`${entity === "user" ? "" : "group-hover:block"} hidden`}
        >
          <FaCopy />
        </button> */}
      </div>
    </div>
  );
};

export default MessageBox;
