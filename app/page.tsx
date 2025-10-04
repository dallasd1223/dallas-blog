import { getAllPosts} from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6">Dallas&apos;s Blog</h2>
      <ul className="text-center">
        {posts.map((post) => (
          <li key={post.slug} className="mb-4">
            <Link href={`/posts/${post.slug}`} className="text-blue-600 hover:text-blue-800 underline">
              {post.title || post.slug}
            </Link>
            {post.date && <p className="text-gray-600 text-sm mt-1">{post.date}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
