import { getCollection } from "astro:content";

export type PublishedPosts = Awaited<ReturnType<typeof getPublishedPosts>>;
export type PublishedPost = PublishedPosts[number];

export async function getPublishedPosts() {
  const posts = await getCollection("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function getAllTags(posts: PublishedPosts) {
  return Array.from(new Set(posts.flatMap((post) => post.data.tags))).sort((a, b) =>
    a.localeCompare(b),
  );
}

export function getCategoryCounts(posts: PublishedPosts) {
  return posts.reduce<Record<string, number>>((counts, post) => {
    counts[post.data.category] = (counts[post.data.category] ?? 0) + 1;
    return counts;
  }, {});
}

export function formatPostDate(date: Date) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
