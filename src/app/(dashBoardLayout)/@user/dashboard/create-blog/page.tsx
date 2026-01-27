import blogServices from "@/services/blog/blog.service";
import { TBlog } from "@/types";
import CreateBlogForm from "./components/create-blog-form";

async function CreateBlog() {
  const { data } = await blogServices.getBlogPosts({}, { tags: ["blogs"] });
  console.log(data);
  return (
    <section>
      <CreateBlogForm />
      {data?.data.map((blog: TBlog) => (
        <p key={blog.id}>{blog?.title}</p>
      ))}
    </section>
  );
}

export default CreateBlog;
