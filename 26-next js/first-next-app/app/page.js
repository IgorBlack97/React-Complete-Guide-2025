import Header from "@/components/header";
import Link from "next/link";

export default function Home() {
  console.log("test");
  return (
    <main>
      <Header/>
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p><a href="/about">About Us</a></p>
      <p><Link href="/about">About Us Link</Link></p>
    </main>
  );
}
