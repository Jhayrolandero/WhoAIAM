"use client";
import { Input } from "@/component/ui/input";
import { useChat } from "@/hooks/useChat";
import { Ban, SendHorizontal } from "lucide-react";
import React, { FormEvent, useState } from "react";
import Markdown from "markdown-to-jsx";

const Chat = () => {
  const { startChat, streamedData, chatPending, isThinking } = useChat();
  const [formData, setFormData] = useState({
    message: "",
  });

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

  return (
    <div className="grid grid-rows-[1fr_auto] h-screen w-full ">
      {isThinking && "Thinking..."}
      <div className="p-4 overflow-y-auto">
        <Markdown className="prose text-white text-[1rem] leading-7">
          {streamedData}
        </Markdown>

        {/* <pre>{streamedData}</pre> */}
      </div>
      <form onSubmit={handleSubmit} className="sticky bottom-0 px-3">
        <Input
          id="message"
          type="message"
          name="message"
          required
          value={formData.message}
          onChange={handleInputChange}
          className="h-14 rounded-full border border-white text-white text-base placeholder:text-white"
          placeholder="Input something to chat"
        />
        <button
          className="absolute right-7 top-1/2 -translate-y-1/2"
          disabled={chatPending}
        >
          {chatPending ? (
            <Ban className="stroke-white" />
          ) : (
            <SendHorizontal className="stroke-white" />
          )}
        </button>
      </form>
    </div>
  );
};

export default Chat;
