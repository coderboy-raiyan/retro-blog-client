import Blog from "@/components/common/Blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import blogServices from "@/services/blog/blog.service";
import { TBlog } from "@/types";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";

async function Home() {
  const { data } = await blogServices.getBlogPosts({}, { revalidate: 10 });
  const { data: featuredData } = await blogServices.getBlogPosts(
    { isFeature: true },
    { revalidate: 10 },
  );

  const blogs: TBlog[] = data?.data || [];
  const featuredBlogs: TBlog[] = featuredData?.data?.slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/50 bg-linear-to-b from-primary/5 via-background to-background">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM5Qzk0QjQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <div className="container relative mx-auto px-4 py-20 md:py-28 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6 gap-2 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4" />
              Discover Amazing Stories
            </Badge>

            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl xl:text-7xl">
              Ideas that{" "}
              <span className="bg-linear-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Inspire
              </span>{" "}
              and{" "}
              <span className="bg-linear-to-r from-pink-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
                Transform
              </span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Explore curated articles, insights, and stories from thought
              leaders and creators around the world. Your journey to discovery
              starts here.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="group gap-2 px-8" asChild>
                <Link href="/blogs">
                  Browse All Articles
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8" asChild>
                <Link href="/signup">Join Community</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -left-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-32 top-1/3 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />
      </section>

      {/* Featured Section */}
      {featuredBlogs.length > 0 && (
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Trending Now
                </span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Featured Articles
              </h2>
            </div>
            <Button variant="ghost" className="group gap-2" asChild>
              <Link href="/blogs?featured=true">
                View All Featured
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBlogs.map((blog: TBlog) => (
              <Blog blog={blog} key={blog.id} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Articles Section */}
      <section className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="mb-2 block text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Fresh Content
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Latest Articles
              </h2>
            </div>
            <Button variant="outline" className="group gap-2" asChild>
              <Link href="/blogs">
                Explore All
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {blogs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {blogs.map((blog: TBlog) => (
                <Blog blog={blog} key={blog.id} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
              <div className="mb-4 rounded-full bg-muted p-4">
                <Sparkles className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                No articles yet
              </h3>
              <p className="mb-6 max-w-md text-muted-foreground">
                We&apos;re working on bringing you amazing content. Check back
                soon!
              </p>
              <Button variant="outline" asChild>
                <Link href="/signup">Get Notified</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/50">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-purple-600 to-pink-600 p-8 text-center md:p-16">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-white blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-white blur-3xl" />
            </div>

            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Ready to Share Your Story?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80">
                Join our community of writers and readers. Share your insights,
                connect with like-minded individuals, and grow your audience.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="px-8 font-semibold"
                  asChild
                >
                  <Link href="/signup">Start Writing Today</Link>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="px-8 text-white hover:bg-white/10 hover:text-white"
                  asChild
                >
                  <Link href="/blogs">Read Articles</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
