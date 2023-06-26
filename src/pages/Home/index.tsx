import { Header } from "../../components/Header";
import { UserNav } from "../../components/UserNav";
import { Feed } from "../../components/Feed";
import useToken from "../../hooks/useToken";

export default function Home() {
  const token = useToken();

  return (
    <div className="container mx-auto w-screen h-full">
      <Header />
      <div className="flex justify-center h-full px-6 my-12">
        <div className="w-full h-full lg:w-11/12 flex flex-col justify-center">
          {token && <UserNav />}

          <Feed />
        </div>
      </div>
    </div>
  );
}
