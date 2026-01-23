import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { TBlog } from "@/types";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export default function Blog({ blog }: { blog: TBlog }) {
  return (
    <Card className="group overflow-hidden border-zinc-200 dark:border-zinc-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-white dark:bg-zinc-950 max-w-md">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b"
          alt="Cybersecurity concept"
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-4 left-4 bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 backdrop-blur-md border-none hover:bg-white">
          Technology
        </Badge>
      </div>

      <CardHeader className="space-y-2 p-6">
        <div className="flex items-center gap-3 text-sm text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>Jan 23, 2026</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>5 min read</span>
          </div>
        </div>
        <h3 className="text-2xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 group-hover:text-primary transition-colors">
          The Future of AI in Software Engineering
        </h3>
      </CardHeader>

      <CardContent className="px-6 pb-6 text-zinc-600 dark:text-zinc-400">
        <p className="line-clamp-3 text-sm leading-relaxed">
          Exploring how Large Language Models are reshaping the way we write,
          debug, and deploy production-grade code in 2026 and beyond.
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 p-6 bg-zinc-50/50 dark:bg-zinc-900/20">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-zinc-200 dark:border-zinc-800">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
              John Doe
            </span>
            <span className="text-[10px] text-zinc-500">Senior Engineer</span>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="group/btn gap-2 text-primary hover:bg-primary/10"
        >
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
