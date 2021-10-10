import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Script from "next/script";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>hello world</h1>
      <div>
        {posts.map(({ slug, data: { image, title, excerpt, date } }) => (
          <div key={slug}>
            <Link href={`/posts/${slug}`}>
              <a>
                <h2>{title}</h2>
                <p>{date}</p>
                <p>{excerpt}</p>
                <img src={image} />
              </a>
            </Link>
          </div>
        ))}
      </div>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <Script src="/netlifyAdmin.js" />
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    const slug = path.parse(filename).name;
    const file = fs.readFileSync(path.join("posts", filename), "utf-8");
    const { data } = matter(file);

    return {
      slug,
      data: {
        ...data,
        date: data.date.toString(),
      },
    };
  });

  posts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));

  return {
    props: {
      posts,
    },
  };
}
