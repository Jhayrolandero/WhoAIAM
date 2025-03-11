import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface Convo {
  role: string;
  message: string;
}

export const useChat = () => {
  const [streamedData, setStreamedData] = useState("");
  const [convo, setConvo] = useState<Convo[]>([]);

  const [isThinking, setIsThinking] = useState(false);

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
  };
};
