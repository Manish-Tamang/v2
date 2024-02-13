// pages/posts/[slug].jsx

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";

const client = createClient({
  projectId: "uewhm6v9",
  dataset: "production",
  useCdn: false,
  apiVersion: "2021-10-21",
});

const Post = ({ post }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, [post]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="bg-black-100 min-h-screen p-12">
      <div className="container mx-auto">
        <h1
          style={{ marginTop: '30px' }}
          className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl text-center mb-12"
        >
          News & Events
        </h1>
        <h3 className="text-lg text-gray-900 text-center mb-12">
          Welcome to News & Events of Prashanti Academy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 md:gap-8">
          {post && (
            <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mb-8">
              <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
                <img
                  className="w-full h-48 md:h-64 object-cover"
                  src={post.mainImage?.asset?.url || ''}
                  alt={post.title}
                />
              </div>
              <div className="p-6">
                <h2>{format(new Date(post.publishedAt), 'dd MMMM yyyy')}</h2>
                <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  {post.title}
                </h5>
                <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                  {post.body[0].children[0].text}
                </p>
                <div className="p-1 pt-2">
                  <Link href="/">
                    <a>Back to All Posts</a>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const posts = await client.fetch(`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
  `);

  const paths = posts.map((post) => ({
    params: { slug: post.slug.current },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      publishedAt,
      mainImage{
          asset->{
              _id,
              url
          }
      }
  }`,
    { slug }
  );

  return {
    props: { post },
  };
}

export default Post;
