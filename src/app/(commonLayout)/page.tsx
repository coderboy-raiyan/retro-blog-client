import Blog from "@/components/common/Blog";
import blogServices from "@/services/blog/blog.service";
import { TBlog } from "@/types";

async function Home() {
  const { data } = await blogServices.getBlogPosts({}, { revalidate: 10 });
  console.log(data);
  return (
    <section className="grid-cols-3 grid">
      {data?.data?.map((blog: TBlog) => (
        <Blog blog={blog} key={blog.id} />
      ))}
    </section>
  );
}

export default Home;
