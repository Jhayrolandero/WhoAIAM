import Markdown from "markdown-to-jsx";
import React, { Children, useContext } from "react";
import Code from "../ui/code";

const MessageBox: React.FC<{
  children?: React.ReactNode;
  message: string;
  user: string;
}> = ({ children, message, user }) => {
  //   const {userState, setUserState} = useContext(UserContext);

  const Pre = ({ children }: { children: string }) => (
    <pre className="bg-[#2F2F2F]  border-[1px] px-2 py-1">{children}</pre>
  );

  const H3 = ({ children }: { children: string }) => (
    <h3 className="text-white">{children}</h3>
  );

  const Strong = ({ children }: { children: string }) => (
    <strong className="font-bold text-white">{children}</strong>
  );

  return (
    <div
    //   className={`grid w-full ${
    //     entity === "user"
    //       ? "place-items-end grid-cols-[1fr_auto]"
    //       : "grid-cols-[auto_1fr]"
    //   } gap-1`}
    >
      {/* <div className={`rounded-lg max-h-max ${entity === 'user' ? 'order-2' : 'order-1'}`}>
          {
            entity === 'user'
            ?
            <div className='size-8 rounded-lg'>
              <img className='w-full h-full aspect-square' src={userState.userState.profile_url} alt={userState.userState.display_name} />
            </div>
            :
            <div className="size-8 rounded-lg bg-[#0080FF] p-[0.1em] ">
              <IoLogoIonic  className=" w-full h-full aspect-square"/>
            </div>
          }
        </div> */}
      <div
        className={`${user === "ai" && "bg-[#1e1e1e]"} p-2 rounded-md`}
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
