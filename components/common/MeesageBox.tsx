import Markdown from "markdown-to-jsx";
import React, { Children, useContext } from "react";
import Code from "../ui/code";
import { Bot, PersonStanding } from "lucide-react";
import Image from "next/image";
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
            <Image
              src="/pic.avif"
              alt="me"
              width={18}
              height={18}
              className=" w-full h-full aspect-square rounded-full"
            />
            {/* <PersonStanding className=" w-full h-full aspect-square" /> */}
            {/* <img className='w-full h-full aspect-square' src={userState.userState.profile_url} alt={userState.userState.display_name} /> */}
          </div>
        ) : (
          <div className="size-8 rounded-lg p-[0.1em] ">
            <svg
              className=" w-full h-full aspect-square stroke-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              color="#ffffff"
              fill="none"
            >
              <path
                d="M11.7453 14.85L6.90436 12V7C6.90436 4.79086 8.72949 3 10.9809 3C12.3782 3 13.6113 3.6898 14.3458 4.74128"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.59961 19.1791C10.3266 20.2757 11.5866 21.0008 13.0192 21.0008C15.2707 21.0008 17.0958 19.21 17.0958 17.0008V12.0008L12.1612 9.0957"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.45166 13.5L9.45123 7.66938L13.8642 5.16938C15.814 4.06481 18.3072 4.72031 19.4329 6.63348C20.1593 7.86806 20.1388 9.32466 19.5089 10.4995"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.48963 13.4993C3.8595 14.6742 3.83887 16.131 4.56539 17.3657C5.6911 19.2789 8.18428 19.9344 10.1341 18.8298L14.5471 16.3298L14.643 10.7344"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.0959 17.6309C18.4415 17.5734 19.7295 16.8634 20.4529 15.634C21.5786 13.7209 20.9106 11.2745 18.9608 10.1699L14.5478 7.66992L9.48907 10.4255"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.90454 6.36938C5.55865 6.42662 4.27032 7.13672 3.54684 8.3663C2.42113 10.2795 3.08917 12.7258 5.03896 13.8304L9.45196 16.3304L14.5 13.5807"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {/* <Bot className=" w-full h-full aspect-square" /> */}
          </div>
        )}
      </div>
      <div
        className={`${
          user === "user" ? "bg-[#2D2E2F] order-1" : "order-2"
        } px-3 py-2 rounded-lg`}
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
