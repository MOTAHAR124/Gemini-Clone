"use client";
import runChat from "../lib/gemini";
import React, { createContext, useState, ReactNode } from "react";

interface ContextType {
  theme: string;
  toggle: () => void;
  submit: (prompt: string) => Promise<void>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  input: string;
  result: string;
  loading: boolean;
  displayResult: boolean;
  recentPrompts: string;
  setRecentPrompts: React.Dispatch<React.SetStateAction<string>>;
  setPrevPrompts: React.Dispatch<React.SetStateAction<string[]>>;
  prevPrompts: string[];
  setDisplayResult: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<ContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

const ContextProvider = ({ children }: ContextProviderProps) => {
  const [theme, setTheme] = useState<string>("dark");
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");
  const [recentPrompts, setRecentPrompts] = useState<string>("");
  const [displayResult, setDisplayResult] = useState<boolean>(false);
  const [prevPrompts, setPrevPrompts] = useState<string[]>([]);

  // Process text with formatting
  const processText = (text: string): string => {
    return text
      .split("**")
      .map((part, i) => (i % 2 === 1 ? `<b>${part}</b>` : part))
      .join("")
      .split("*")
      .join("</br>");
  };

  // Animated text display (always enabled, 10ms delay)
  const animateText = (text: string) => {
    const words = text.split(" ");
    words.forEach((word, index) => {
      setTimeout(() => {
        setResult(prev => prev + word + " ");
      }, 10 * index); // 10ms delay
    });
  };

  // on submit
  const submit = async (prompt: string) => {
    try {
      setLoading(true);
      setResult("");
      setDisplayResult(true);
      setRecentPrompts(prompt);

      if (input && prompt) {
        setPrevPrompts(prev => [...prev, input]);
      }

      const response = input ? await runChat(input) : await runChat(prompt);
      const processedText = processText(response);
      animateText(processedText); // Always animate
      setInput("");
    } catch (error) {
      console.error("Error generating response:", error);
      setResult("Sorry, there was an error generating the response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // light and dark mode
  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const contextValue: ContextType = {
    theme,
    toggle,
    submit,
    setInput,
    input,
    result,
    loading,
    displayResult,
    recentPrompts,
    setRecentPrompts,
    setPrevPrompts,
    prevPrompts,
    setDisplayResult,
  };

  return (
    <Context.Provider value={contextValue}>
      <div className={theme}>{children}</div>
    </Context.Provider>
  );
};

export default ContextProvider;

export type { ContextType };