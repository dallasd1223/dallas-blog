import { getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import MarkdownIt from "markdown-it";
import { Metadata } from "next";

const md = new MarkdownIt();

async function fetchPosts(slug: string) {
    const posts = getAllPosts()
    return posts.find((post) => post.slug === slug);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await fetchPosts(params.slug);
  if (!post) return {};
  return {
    title: post.title,
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
    const post = await fetchPosts(params.slug);

    if (!post) notFound();

    const htmlConverter = md.render(post.content);
    
    return (
        <article>
            {""}
            <h1>{post.title}</h1>
            <p>{post.date}</p>
            <div dangerouslySetInnerHTML={{__html: htmlConverter}} />
        </article>
    );
}