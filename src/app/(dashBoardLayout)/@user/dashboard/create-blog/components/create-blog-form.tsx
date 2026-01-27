"use client";

import { postBlog } from "@/app/actions/blog.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TBlog } from "@/types";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.string().min(1, "Tags are required"),
});

export function CreateBlogForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toaster = toast.loading("Posting your blog...");
      try {
        const tags = value.tags.split(",");

        const blogData: Partial<TBlog> = {
          title: value.title,
          content: value.content,
          tags,
        };

        const res = await postBlog(blogData);

        if (res!.statusText === "Created") {
          toast.success("Your blog has been posted successfully!", {
            id: toaster,
          });
        } else {
          toast.error("Failed to post the blog. Please try again.", {
            id: toaster,
          });
        }
        form.reset();
      } catch (error: any) {
        toast.error(
          error?.message || "Something went wrong. Please try again later.",
          { id: toaster },
        );
      }
    },
  });

  return (
    <div className="flex justify-center items-center sm:min-h-screen">
      <Card className="w-2/3" {...props}>
        <CardHeader>
          <CardTitle>Create Blog</CardTitle>
          <CardDescription>You can write your blog here...</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="blog-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="title"
                children={(field) => {
                  const isInValid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        placeholder="Enter blog title"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="content"
                children={(field) => {
                  const isInValid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                      <Textarea
                        id={field.name}
                        placeholder="Write your blog..."
                        className="min-h-[120px]"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="tags"
                children={(field) => {
                  const isInValid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Tags</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        placeholder="nextjs, web, react"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <form.Subscribe
            selector={(state) => state.isSubmitting}
            children={(isSubmitting) => (
              <Button
                form="blog-form"
                type="submit"
                className="w-full cursor-pointer"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Posting..." : "Post"}
              </Button>
            )}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default CreateBlogForm;
