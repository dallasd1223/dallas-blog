import { getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import MarkdownIt from "markdown-it";
import { Metadata } from "next";

const md = new MarkdownIt();

async function fetchPosts(slug: string) {
    const posts = getAllPosts()
    return posts.find((post) => post.slug === slug);
}

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await fetchPosts(resolvedParams.slug);
  if (!post) return {};
  return {
    title: post.title,
  };
}

export default async function Post({ params }: PageProps) {
    const resolvedParams = await params;
    const post = await fetchPosts(resolvedParams.slug);

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