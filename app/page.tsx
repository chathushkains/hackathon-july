import Image from "next/image";
import LandingPage from "./components/LandingPage";
import Starfield from "./components/charts/Animation";

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-gray-300 to-indigo-600">
    <Starfield
      starCount={1000}
      starColor={[255, 255, 255]}
      speedFactor={0.05}
      backgroundColor="black"
    />
    <LandingPage />
    <div className="h-60 bg-gradient-to-tr p-10 from-purple-950 to-purple-800">
      <p className="text-center text-white">Hackathon | Insighture x Hutly</p>
    </div>
  </main>
  );
}
