import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TBlog } from "@/types";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  Eye,
  MessageCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function calculateReadTime(content: string) {
  const wordsPerMinute = 200;
  const words = content?.split(/\s+/)?.length || 0;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

export default function Blog({ blog }: { blog: TBlog }) {
  return (
    <Link href={`/blogs/${blog?.id}`} className="group block">
      <article className="relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-500 hover:border-primary/30 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
        {/* Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={
              blog.thumbnail ||
              "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
            }
            alt={blog.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

          {/* Floating Tags */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {blog.isFeature && (
              <Badge className="border-none bg-linear-to-r from-amber-500 to-orange-500 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur-sm">
                ✦ Featured
              </Badge>
            )}
            {blog.tags?.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="border-none bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-zinc-800 shadow-lg backdrop-blur-sm dark:bg-black/60 dark:text-white"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Stats Overlay */}
          <div className="absolute bottom-4 right-4 flex items-center gap-3">
            <div className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              <Eye className="h-3.5 w-3.5" />
              <span>{blog.views?.toLocaleString() || 0}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              <MessageCircle className="h-3.5 w-3.5" />
              <span>{blog._count?.comments || 0}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex flex-col gap-4 p-6">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{calculateReadTime(blog.content)}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-xl font-bold leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
            {blog.title}
          </h3>

          {/* Excerpt - strip HTML and show plain text */}
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {blog.content?.replace(/<[^>]*>/g, "").slice(0, 150)}...
          </p>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
            {/* Author */}
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 ring-2 ring-background transition-all duration-300 group-hover:ring-primary/30">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${blog.authorId}`}
                />
                <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                  AU
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">
                  Author
                </span>
                <span className="text-[11px] text-muted-foreground">
                  Writer
                </span>
              </div>
            </div>

            {/* Read More Arrow */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg">
              <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
            </div>
          </div>
        </div>

        {/* Hover Border Glow Effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(to right, transparent, hsl(var(--primary) / 0.1), transparent)",
          }}
        />
      </article>
    </Link>
  );
}
