import { getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import MarkdownIt from "markdown-it";
import { Metadata } from "next";
import hljs from "highlight.js";

const md = new MarkdownIt({
  html: true, // Enable HTML tags in source
  xhtmlOut: false, // Use '/' to close single tags (<br />)
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
  typographer: true, // Enable some language-neutral replacement + quotes beautification
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(str, { language: lang }).value +
               '</code></pre>';
      } catch {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

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