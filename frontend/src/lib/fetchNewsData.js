// lib/fetchNewsData.js
import client from '../client';

export async function getNewsData() {
  const posts = await client.fetch(`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
  `);

  return {
    posts,
  };
}
