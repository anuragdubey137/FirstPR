"use client";

import { useState } from "react";

export default function IssueFilters({ onFilterChange }: any) {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const languages = ["JavaScript", "TypeScript", "Python", "Java", "C++"];

  const toggleLanguage = (lang: string) => {
    console.log("Selected:");
    let updated;
    if (selectedLanguages.includes(lang)) {
      updated = selectedLanguages.filter((l) => l !== lang);
    } else {
      updated = [...selectedLanguages, lang];
    }

    setSelectedLanguages(updated);
    onFilterChange(updated);
  };
  const addLanguage = () => {
    if (!input) return;

    const formatted =
      input.charAt(0).toUpperCase() + input.slice(1);

    if (!selectedLanguages.includes(formatted)) {
      const updated = [...selectedLanguages, formatted];
      setSelectedLanguages(updated);
      onFilterChange(updated);
    }

    setInput("");
  };
return (
  <div className="mb-4 space-y-3">
    
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search language (e.g. Go, Rust, Ruby)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addLanguage();
        }
      }}
        className="border px-3 py-2 rounded-md w-full text-black"
      />
        <button
        onClick={addLanguage}
        className="px-3 py-2 bg-green-500 text-white rounded"
        >
          Add
        </button>
    </div>
        
    <div className="flex flex-wrap gap-2">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => toggleLanguage(lang)}
          className={`px-3 py-1 rounded-full border text-sm font-medium ${
            selectedLanguages.includes(lang)
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-gray-100 text-black border-gray-300 hover:bg-gray-200"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
      <div className="flex gap-2 flex-wrap mt-2">
  {selectedLanguages.map((lang) => (
    <span
      key={lang}
      onClick={() => toggleLanguage(lang)} 
      className="px-2 py-1 bg-blue-500 text-white rounded text-xs cursor-pointer flex items-center gap-1"
    >
      {lang} ✕
    </span>
  ))}
</div>
    
  </div>
);
}