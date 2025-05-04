import { getAllPosts} from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <h2>Dallas's Blog</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>{post.title || post.slug}</Link>
            {post.date && <p>{post.date}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
