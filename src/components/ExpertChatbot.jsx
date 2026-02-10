import { useState } from "react";

export default function ExpertChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages([...messages, userMsg]);

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    });

    const data = await res.json();

    setMessages(prev => [
      ...prev,
      { role: "assistant", content: data.reply }
    ]);

    setInput("");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-xl shadow">
      <h2 className="font-bold text-lg mb-2">🌾 Expert Chat</h2>

      <div className="h-64 overflow-y-auto mb-3">
        {messages.map((m, i) => (
          <p key={i} className="mb-2">
            <b>{m.role === "user" ? "You" : "Expert"}:</b> {m.content}
          </p>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="border flex-1 p-2 rounded"
          placeholder="Ask about rice disease..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
