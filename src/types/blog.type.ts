export type TBlog = {
  id: string;
  authorId: string;
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED";
  isFeature: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  _count: {
    comments: number;
  };
};
