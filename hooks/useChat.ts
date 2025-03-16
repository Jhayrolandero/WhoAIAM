import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Convo {
  id?: number;
  role: string;
  message: string;
  created_at?: Date;
}

export const useChat = () => {
  const [streamedData, setStreamedData] = useState("");
  const [convo, setConvo] = useState<Convo[]>([]);

  const [isThinking, setIsThinking] = useState(false);

  const {
    data,
    isLoading: fetchingChat,
    error,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const response = await fetch("/api/chat");

      if (!response.ok) {
        throw new Error("Failed to fetch streamed data");
      }

      const body = await response.json();

      setConvo(body.chats);
      return body.message;
    },
  });
  const { mutateAsync: startChat, isPending: chatPending } = useMutation({
    mutationFn: async (message: string) => {
      // Clear the previous streamed data
      const userIn = {
        role: "user",
        message,
      };
      setStreamedData("");
      setIsThinking(true);

      setConvo((prev) => [...prev, userIn]);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }), // Send the message as a JSON object
      });

      setIsThinking(false);

      if (!response.ok) {
        throw new Error("Failed to fetch streamed data");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No reader available");
      }

      let messageIn = "";
      // Process the streamed data
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setStreamedData((prev) => prev + chunk); // Update state with each chunk
        messageIn += chunk;
      }

      const aiRes: Convo = {
        role: "ai",
        message: messageIn,
      };

      setConvo((prev) => [...prev, aiRes]);

      return true;
    },
  });

  return {
    streamedData,
    startChat,
    chatPending,
    isThinking,
    convo,
    fetchingChat,
  };
};
