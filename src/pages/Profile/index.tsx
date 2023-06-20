import { useLocation } from "react-router-dom";
import { Header } from "../../components/Header";
import { UserNav } from "../../components/UserNav";
import { NewPostForm } from "../../components/Forms/NewPostForm";
import { UserProfile } from "../../components/UserProfile";

export default function Profile() {
  const { pathname } = useLocation();

  return (
    <div className="container mx-auto w-screen h-full">
      <Header />
      <div className="flex justify-center h-full px-6 my-12">
        <div className="w-full h-full lg:w-11/12 flex flex-col justify-center">
          <UserNav />

          {pathname === "/profile" ? (
            <UserProfile />
          ) : pathname === "/profile/statistics" ? (
            "Coming Soon"
          ) : (
            <NewPostForm />
          )}
        </div>
      </div>
    </div>
  );
}
