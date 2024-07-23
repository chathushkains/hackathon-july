import Image from "next/image";
import LandingPage from "./components/LandingPage";

export default function Home() {
  return (
    <main className="bg-gradient-to-bl from-white to-gray-400">
      <LandingPage></LandingPage>
      <div className="h-60 bg-gradient-to-tr p-10 from-purple-950 to-purple-800">
        <p className="text-center text-white">Hackathon | Insighture x Hutly</p>
      </div>
    </main>
  );
}
