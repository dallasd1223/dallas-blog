import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDir = path.join(process.cwd(), "posts");

export type Post = {
    slug: string;
    content: string;
    title?: string;
    date?: string;
    author?: string;
};

export const getAllPosts = (): Post[] => {
    const fileNames = fs.readdirSync(postsDir);
    return fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const filePath = path.join(postsDir, fileName);
        const fileContents = fs.readFileSync(filePath, "utf-8");

        const {content, data} = matter(fileContents)

        return {
            slug,
            content,
            ...data,
        } as Post
    })
};