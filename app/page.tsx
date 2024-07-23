"use client";
import 'regenerator-runtime/runtime';
import Image from "next/image";
import LandingPage from "./components/LandingPage";
import SpeechToText from "./SpeechToText";

export default function Home() {
  return (
    <main className="bg-white">
      <LandingPage></LandingPage>
      <div className="h-60 items-center">
      <SpeechToText />
      </div>
     
    </main>
  );
}
