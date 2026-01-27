"use server";

import blogServices from "@/services/blog/blog.service";
import { TBlog } from "@/types";
import { updateTag } from "next/cache";

export const getBlogs = async () => {
  return await blogServices.getBlogPosts();
};
export const postBlog = async (blog: Partial<TBlog>) => {
  const res = await blogServices.postBlog(blog);
  if (res.statusText === "Created") {
    updateTag("blogs");
  }
  return res;
};
