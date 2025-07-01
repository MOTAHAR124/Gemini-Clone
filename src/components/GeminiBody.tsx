"use client";
import React, { useContext } from "react";
import {
  CircleUserRound,
  Compass,
  Lightbulb,
  Youtube,
  Code,
  SendHorizontal,
  Zap,
} from "lucide-react";
import { Context } from "../context/ContextProvider";
import type { ContextType } from "../context/ContextProvider";

const GeminiBody = () => {
  const {
    submit,
    recentPrompts,
    displayResult,
    loading,
    result,
    input,
    setInput,
  } = useContext(Context) as ContextType;
  console.log(loading, "loading");
  return (
    <div className="flex-1 min-h-screen relative ml-0 ">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 flex items-center justify-end p-3 md:p-5 text-lg md:text-xl text-gray-400 bg-bgPrimaryColor z-10">
        <CircleUserRound size={32} className="text-softTextColor md:w-10 md:h-10" />
      </div>

      {/* Main Content with Padding for Header and Footer */}
      <div className="max-w-full md:max-w-[900px] mx-auto mt-[70px] md:mt-[80px] mb-[100px] md:mb-[150px] px-2 md:px-5">
        {!displayResult ? (
          <>
            <div className="text-2xl md:text-3xl font-bold text-gray-400 mb-2">Gemini</div>
            <div className="my-8 md:my-12 text-3xl md:text-5xl font-medium">
              <p>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  Hello, Motahar
                </span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
              <div className="h-32 md:h-48 p-3 md:p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <Compass
                  size={28}
                  className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full md:size-9"
                />
              </div>
              <div className="h-32 md:h-48 p-3 md:p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer">
                <p>What's the reaction to and impact of autonomous vehicles</p>
                <Lightbulb
                  size={28}
                  className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full md:size-9"
                />
              </div>
              <div className="h-32 md:h-48 p-3 md:p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer">
                <p>Come up with a recipe for an upcoming event</p>
                <Youtube
                  size={28}
                  className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full md:size-9"
                />
              </div>
              <div className="h-32 md:h-48 p-3 md:p-4 bg-bgSecondaryColor rounded-xl relative cursor-pointer">
                <p>Evaluate and rank common camera categories</p>
                <Code
                  size={28}
                  className="p-1 absolute bottom-2 right-2 bg-bgPrimaryColor text-softTextColor rounded-full md:size-9"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="my-6 md:my-10 flex items-center justify-end gap-3 md:gap-5 pr-4 md:pr-40">
              <p className="text-white mr-[-100px] text-right px-3 md:px-4 py-2 rounded-xl" style={{ backgroundColor: '#333537' }}>{recentPrompts}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start gap-3 ml-[-70px] md:gap-5">
              <img src="/gemini.png" alt="" className=" md:w-14 md:h-14" />
              <p
                className="text-md font-sans font-normal leading-7 text-gray-200 rounded-2xl p-5 shadow-md transition-all duration-200"
                style={{ fontFamily: 'Inter, Roboto, Arial, sans-serif', boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)' }}
                dangerouslySetInnerHTML={{ __html: result }}
              ></p>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-bgPrimaryColor z-10">
        <div className="max-w-full md:max-w-[900px] mx-auto px-2 md:px-5 py-3 md:py-4">
          <form onSubmit={e => { e.preventDefault(); submit(input); }}>
            <div className="flex items-center justify-between gap-3 md:gap-5 bg-bgSecondaryColor py-2 px-3 md:py-2.5 md:px-5 rounded-full">
              <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                value={input}
                type="text"
                className="flex-1 bg-transparent border-none outline-none p-2 text-md text-gray-400"
                placeholder="Enter a prompt here"
              />
              <div className="flex cursor-pointer">
                <SendHorizontal type="submit" size={20} />
              </div>
            </div>
          </form>
          <p className="text-gray-400 text-xs md:text-sm text-center p-2 md:p-3">
            Gemini may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeminiBody;