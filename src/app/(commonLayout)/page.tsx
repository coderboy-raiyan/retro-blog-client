import { userService } from "@/services/user/user.service";

async function Home() {
  const { data } = await userService.getSession();
  console.log(data);
  return <div>Home</div>;
}

export default Home;
