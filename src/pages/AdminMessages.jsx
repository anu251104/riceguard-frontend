import React, { useEffect, useState } from "react";
import { Navbar } from "../components/layout/Navbar";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BASE_URL}/admin/messages`)
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Admin – Contact Messages
        </h1>

        {loading && <p className="text-gray-500">Loading messages...</p>}

        {!loading && messages.length === 0 && (
          <p className="text-gray-500">No messages found.</p>
        )}

        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {msg.firstName} {msg.lastName}
                </h3>
                <span className="text-sm text-gray-500">{msg.subject}</span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {msg.email}
              </p>

              <p className="text-gray-800 dark:text-gray-200">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
