"use client";

import { getBlogs } from "@/app/actions/blog.action";
import { useEffect, useState } from "react";

function AboutPage() {
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const data = await getBlogs();
      setData(data);
    })();
  }, []);

  console.log(data);

  return <div>page</div>;
}

export default AboutPage;
