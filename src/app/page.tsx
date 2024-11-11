import Game from "@/components/Game";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex justify-center items-center h-screen no-scrollbar overflow-hidden">
      <Game />
    </main>
  );
}
