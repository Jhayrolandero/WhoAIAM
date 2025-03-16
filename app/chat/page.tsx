"use client";
import { Input } from "@/component/ui/input";
import { useChat } from "@/hooks/useChat";
import { Ban, SendHorizontal } from "lucide-react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import Markdown from "markdown-to-jsx";
import MessageBox from "@/components/common/MeesageBox";

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (fetchingChat) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="font-bold text-xl">Recalling Memory</p>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[1fr_auto_auto] no-bar  w-full ">
      <div className="p-4 overflow-y-auto no-bar space-y-5">
        {convo &&
          convo.map((con) => (
            <MessageBox message={con.message} user={con.role} />
          ))}
        {isThinking && "Thinking..."}
        {chatPending && <MessageBox message={streamedData} user={"ai"} />}
      </div>
      <div ref={bottomRef}></div>

      <form
        onSubmit={handleSubmit}
        className="flex h-full items-center justify-between sticky bottom-0 px-3 pb-1"
      >
        <Input
          id="message"
          type="message"
          name="message"
          required
          value={formData.message}
          onChange={handleInputChange}
          className="h-14 bg-[#070606] rounded-full border border-white text-white text-base placeholder:text-white px-2"
          placeholder="Ask Shad anything"
        />
        <button
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
        </button>
      </form>
    </div>
  );
};

export default Chat;
