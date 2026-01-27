import { redirect } from "next/navigation";

function page() {
  return redirect("/dashboard/create-blog");
}

export default page;
