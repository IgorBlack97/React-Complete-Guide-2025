import Link from "next/link";

export default function BlogPage() {
    return <main>
        <h1>Blog Page</h1>
        <p><Link href="/blog/119">Article 119</Link></p>
        <p><Link href="/blog/142">Article 142</Link></p>
    </main>
}