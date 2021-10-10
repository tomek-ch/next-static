import fs from "fs";
import path from "path";
import matter from "gray-matter";
import marked from "marked";

function Post({ data: { title, date, image }, content }) {
  return (
    <div>
      <h1>{title}</h1>
      <p>{date}</p>
      <img src={image} />
      <div dangerouslySetInnerHTML={{ __html: marked(content, {}) }}></div>
    </div>
  );
}

export default Post;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));
  const paths = files.map((filename) => ({
    params: { slug: path.parse(filename).name },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const file = fs.readFileSync(path.join("posts", `${slug}.md`));
  const { data, content } = matter(file);

  return {
    props: {
      data: {
        ...data,
        date: data.date.toString(),
      },
      content,
    },
  };
}
