"use client";
import { Input } from "@/component/ui/input";
import { useChat } from "@/hooks/useChat";
import { Ban, SendHorizontal } from "lucide-react";
import React, { FormEvent, useState } from "react";
import Markdown from "markdown-to-jsx";
import MessageBox from "@/components/common/MeesageBox";

const Chat = () => {
  const { startChat, streamedData, chatPending, isThinking, convo } = useChat();
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
    <div className="grid grid-rows-[1fr_auto] no-bar  w-full ">
      <div className="p-4 overflow-y-auto no-bar space-y-5 ">
        {convo &&
          convo.map((con) => (
            <MessageBox message={con.message} user={con.role} />
          ))}
        {isThinking && "Thinking..."}
        {chatPending && <MessageBox message={streamedData} user={"ai"} />}
      </div>
      <form onSubmit={handleSubmit} className="sticky bottom-0 px-3">
        <Input
          id="message"
          type="message"
          name="message"
          required
          value={formData.message}
          onChange={handleInputChange}
          className="h-14 bg-[#1e1e1e] rounded-full border border-white text-white text-base placeholder:text-white"
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
