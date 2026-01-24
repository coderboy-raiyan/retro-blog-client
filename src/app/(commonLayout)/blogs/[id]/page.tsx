import { ArrowLeft, Calendar, Clock, Eye, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import blogServices from "@/services/blog/blog.service";
import { TBlog } from "@/types/blog.type";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function calculateReadTime(content: string) {
  const wordsPerMinute = 200;
  const words = content?.split(/\s+/)?.length || 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

async function BlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await blogServices.getBlogById(id);
  const blog: TBlog = response?.data;
  console.log(blog);
  if (!blog) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="container mx-auto max-w-4xl px-4 py-6">
        <Button variant="ghost" asChild className="group -ml-2">
          <Link
            href="/blogs"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Blogs</span>
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <header className="container mx-auto max-w-4xl px-4 pb-8">
        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {blog.tags?.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs font-medium uppercase tracking-wide"
            >
              {tag}
            </Badge>
          ))}
          {blog.isFeature && (
            <Badge className="bg-linear-to-r from-amber-500 to-orange-500 text-xs font-medium uppercase tracking-wide text-white">
              Featured
            </Badge>
          )}
        </div>

        {/* Title */}
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
          {blog.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          {/* Author */}
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-background">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.authorId}`}
              />
              <AvatarFallback className="bg-primary/10 text-primary">
                AU
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Author</span>
              <span className="text-xs">Writer</span>
            </div>
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Read Time */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{calculateReadTime(blog.content)}</span>
          </div>

          <Separator orientation="vertical" className="h-8" />

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              <span>{blog.views?.toLocaleString() || 0}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4" />
              <span>{blog._count?.comments || 0}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {blog.thumbnail && (
        <div className="container mx-auto max-w-5xl px-4 pb-12">
          <div className="relative aspect-21/9 overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              priority
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 pb-16">
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:mt-12 prose-h2:text-3xl
            prose-h3:mt-8 prose-h3:text-2xl
            prose-p:leading-relaxed prose-p:text-muted-foreground
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground
            prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:pl-6 prose-blockquote:not-italic
            prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-zinc-950 prose-pre:shadow-lg
            prose-img:rounded-xl prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto max-w-4xl px-4 py-12">
          {/* Tags */}
          <div className="mb-8">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Share & Actions */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Published on {formatDate(blog.createdAt)}
              {blog.updatedAt !== blog.createdAt && (
                <span> · Updated on {formatDate(blog.updatedAt)}</span>
              )}
            </p>
            <Button variant="outline" asChild>
              <Link href="/blogs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                More Articles
              </Link>
            </Button>
          </div>
        </div>
      </footer>
    </article>
  );
}

export default BlogPage;
