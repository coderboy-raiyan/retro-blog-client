"use server";

import blogServices from "@/services/blog/blog.service";

export const getBlogs = async () => {
  return await blogServices.getBlogPosts();
};
