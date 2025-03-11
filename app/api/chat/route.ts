import { NextResponse } from "next/server";
import { Ollama } from "ollama";

export const POST = async (req: Request) => {
  try {
    // Parse the request body
    const body = await req.json();
    const { message } = body; // Ensure the body contains a `message` field

    const ollama = new Ollama({ host: "http://127.0.0.1:11434" });

    // Start the Ollama chat stream
    const response = await ollama.chat({
      model: "master",
      messages: [{ role: "user", content: message }],
      stream: true,
    });

    // Create a ReadableStream to stream the response
    const stream = new ReadableStream({
      async start(controller) {
        for await (const part of response) {
          const chunk = part.message.content;
          controller.enqueue(new TextEncoder().encode(chunk)); // Send each chunk
        }
        controller.close(); // Close the stream when done
      },
    });

    // Return the streamed response
    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        message: "An error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
};
