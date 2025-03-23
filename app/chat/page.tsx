"use client";
import { Input } from "@/component/ui/input";
import { useChat } from "@/hooks/useChat";
import { Ban, SendHorizontal } from "lucide-react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Markdown from "markdown-to-jsx";
import MessageBox from "@/components/common/MeesageBox";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { FlipWords } from "@/components/ui/flip-words";

const Chat = () => {
  const {
    startChat,
    streamedData,
    chatPending,
    isThinking,
    convo,
    fetchingChat,
  } = useChat();

  const bottomRef = useRef<any>(null);

  const [formData, setFormData] = useState({
    message: "",
  });

  const words = [
    "Ask Shad AI Anything",
    "What's the weather today?",
    "Will i pass the class?",
    "Let Shad AI cook",
  ];
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [convo]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await startChat(formData.message); // Start the chat with the user's message
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        message: "", // Clear the input after submission
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      message: value,
    });
  };

  if (fetchingChat) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="fetchLoader"></div>
      </div>
    );
  }

  return (
    <div
      className={`${
        convo.length < 1
          ? "flex w-full h-full justify-center items-center"
          : `grid grid-rows-[1fr_auto_auto] no-bar w-full h-full`
      }`}
    >
      <div className="p-4 overflow-y-auto no-bar space-y-5">
        {convo &&
          convo.map((con) => (
            <MessageBox message={con.message} user={con.role} />
          ))}
        {isThinking && "Thinking..."}
        {chatPending && <MessageBox message={streamedData} user={"ai"} />}
      </div>
      <div ref={bottomRef}></div>

      <div
        // onSubmit={handleSubmit}
        className={`flex h-full items-center flex-col space-y-4 ${
          convo.length > 0 ? "justify-between" : "justify-center"
        } sticky bottom-0 px-3 pb-1`}
      >
        {convo.length < 1 && (
          <FlipWords className="text-3xl text-[#F0F0F0]" words={words} />
          // <p className="text-2xl font-bold">Ask SHAD AI Anything</p>
        )}
        <PlaceholdersAndVanishInput
          placeholders={["Birthday gifts", "Who am i", "Favorite color"]}
          onChange={handleInputChange}
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        />
        {/* <Input
          id="message"
          type="message"
          name="message"
          required
          value={formData.message}
          onChange={handleInputChange}
          className="h-14 bg-[#070606] rounded-full border border-white text-white text-base placeholder:text-white px-2"
          placeholder="Ask Shad anything"
        /> */}
        {/* <button
          className="absolute right-7 top-1/2 -translate-y-1/2"
          disabled={chatPending}
        >
          {chatPending ? (
            <Ban className="stroke-gray-500" />
          ) : (
            <SendHorizontal
              className={`stroke-white ${chatPending && "stroke-gra"}`}
            />
          )}
        </button> */}
      </div>
    </div>
  );
};

export default Chat;
