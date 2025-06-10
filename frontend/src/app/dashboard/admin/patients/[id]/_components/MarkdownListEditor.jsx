"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";



export default function MarkdownListEditor({ label, value, onChange, mode }) {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [markdown, setMarkdown] = useState(value || "");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (mode === "list" && value) {
      const parsed = value
        .split("\n")
        .filter((line) => line.startsWith("-"))
        .map((line) => line.replace(/^- /, "").trim());
      setItems(parsed);
    } else if (mode === "markdown") {
      setMarkdown(value);
    }
  }, [value, mode]);

  const handleAddItem = () => {
    if (!input.trim()) return;
    const updated = [...items, input.trim()];
    setItems(updated);
    onChange(updated.map((i) => `- ${i}`).join("\n"));
    setInput("");
  };

  const handleRemoveItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    onChange(updated.map((i) => `- ${i}`).join("\n"));
  };

  const handleMarkdownChange = (e) => {
    setMarkdown(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>

      <div className="mb-2">
        <button
          type="button"
          className="text-sm text-blue-600 hover:underline"
          onClick={() => setPreview((p) => !p)}
        >
          {preview ? "Редактировать" : "Предпросмотр"}
        </button>
      </div>

      {mode === "list" ? (
        <>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Добавить пункт"
              className="flex-grow border px-3 py-2 rounded"
            />
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Добавить
            </button>
          </div>

          {preview ? (
            <div className="prose prose-sm bg-gray-50 border rounded p-3">
              <ReactMarkdown>
                {items.map((i) => `- ${i}`).join("\n") || "_Нет пунктов_"}
              </ReactMarkdown>
            </div>
          ) : (
            <ul className="list-disc pl-5 space-y-1">
              {items.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item}</span>
                  <button
                    type="button"
                    className="text-red-500 hover:underline text-xs"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <>
          {preview ? (
            <div className="prose prose-sm bg-gray-50 border rounded p-3">
              <ReactMarkdown>{markdown || "_Нет данных_"}</ReactMarkdown>
            </div>
          ) : (
            <textarea
              value={markdown}
              onChange={handleMarkdownChange}
              rows={6}
              className="w-full border p-2 rounded"
              placeholder="Введите результаты анализов в markdown"
            />
          )}
        </>
      )}
    </div>
  );
}
