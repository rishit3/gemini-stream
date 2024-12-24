"use client";
import { useChat } from "ai/react";
import { Bot, Loader2, Send, User2 } from "lucide-react";
import Image from "next/image";
import Markdown from "./component/markdown";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat({
    api: 'api/genai'
  });

  return (
    <main className="flex flex-col min-h-screen items-center p-12 bg-gradient-to-b from-gray-100 to-white">
      <h1 className="text-4xl font-bold text-gray-800">Chat with AI</h1>
      <p className="text-gray-600 mt-2">Powered by Gemini Pro API</p>
      
      {RenderForm()}
      {RenderMessages()}
    </main>
  );

  function RenderForm() {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event, {
            data: {
              prompt: input,
            },
          });
        }}
        className="w-full flex flex-row gap-4 items-center mt-6"
      >
        <input
          type="text"
          placeholder={isLoading ? "Generating . . ." : "Ask something . . ."}
          value={input}
          disabled={isLoading}
          onChange={handleInputChange}
          className="flex-grow border rounded-full shadow-sm px-4 py-2 text-right text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
        />
        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white shadow-md flex items-center justify-center w-12 h-12 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
        >
          {isLoading ? (
            <Loader2
              onClick={stop}
              className="animate-spin text-white w-6 h-6"
            />
          ) : (
            <Send className="text-white w-6 h-6" />
          )}
        </button>
      </form>
    );
  }

  function RenderMessages() {
    return (
      <div className="flex flex-col-reverse w-full mt-8 space-y-4 space-y-reverse">
        {messages.map((m, index) => (
          <div
            key={index}
            className={`p-4 pl-12 rounded-lg shadow-md relative ${
              m.role === "user" ? "bg-gray-200" : "bg-blue-100"
            }`}
          >
            <Markdown text={m.content} />
            {m.role === "user" ? (
              <User2 className="absolute top-4 left-4 text-gray-600 w-6 h-6" />
            ) : (
              <Bot
                className={`absolute top-4 left-4 text-blue-600 w-6 h-6 ${
                  isLoading && index === messages.length - 1
                    ? "animate-bounce"
                    : ""
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  }  
}
