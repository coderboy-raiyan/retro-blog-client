import { cookies } from "next/headers";

async function Home() {
  const cookieStore = await cookies();
  const res = await fetch("http://localhost:5000/api/auth/get-session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });
  const session = await res.json();
  console.log(session);
  return <div>Home</div>;
}

export default Home;
