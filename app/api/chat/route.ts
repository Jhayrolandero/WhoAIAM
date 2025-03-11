import { NextResponse } from "next/server";
import { Ollama } from "ollama";
import { handleDb } from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { message } = body;

    const db = await handleDb();
    const ollama = new Ollama({ host: "http://127.0.0.1:11434" });

    const chats = await new Promise<any[]>((resolve, reject) => {
      db.all("SELECT role, message FROM chats;", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    const messageIn = chats.map((chat) => ({
      role: chat.role,
      content: chat.message,
    }));
    // Start the Ollama chat stream
    const response = await ollama.chat({
      model: "master",
      messages: [...messageIn, { role: "user", content: message }],
      stream: true,
    });

    await new Promise<any[]>((resolve, reject) => {
      db.all(
        `INSERT INTO chats (role, message) VALUES ('user', '${message}');`,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });

    let aiMessage = "";

    const stream = new ReadableStream({
      async start(controller) {
        for await (const part of response) {
          const chunk = part.message.content;
          aiMessage += chunk;
          controller.enqueue(new TextEncoder().encode(chunk));
        }
        controller.close();

        try {
          await new Promise<void>((resolve, reject) => {
            db.run(
              `INSERT INTO chats (role, message) VALUES (?, ?)`,
              ["ai", aiMessage],
              (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              }
            );
          });
          console.log("AI message saved to database:", aiMessage);
        } catch (err) {
          console.error("Error saving AI message to database:", err);
        }
      },
    });

    console.log("Finished: ", aiMessage);

    await new Promise<any[]>((resolve, reject) => {
      db.all(
        `INSERT INTO chats (role, message) VALUES ('ai', '${aiMessage}');`,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
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

export const GET = async () => {
  try {
    const db = await handleDb();

    // Example query to fetch users
    const chats = await new Promise<any[]>((resolve, reject) => {
      db.all("SELECT * FROM chats;", (err, rows) => {
        // db.all("SELECT * FROM chats;", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    return NextResponse.json({
      message: "hello",
      chats, // Include the fetched users in the response
    });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json(
      {
        message: "An error occurred while fetching data.",
      },
      { status: 500 }
    );
  }
};
