import { useContext, useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { UserNav } from "../../components/UserNav";
import UserContext from "../../contexts/UserContext";
import { useLocation } from "react-router-dom";
import { Feed } from "../../components/Feed";
import useToken from "../../hooks/useToken";
import useGetPosts from "../../hooks/api/useGetPosts";
import { PulseLoader } from "react-spinners";

export default function Home() {
  const token = useToken();

  const { posts, getPosts, getPostsLoading } = useGetPosts();

  useEffect(() => {
    getPosts({ token });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="container mx-auto w-screen h-full">
      <Header />
      <div className="flex justify-center h-full px-6 my-12">
        <div className="w-full h-full lg:w-11/12 flex flex-col justify-center">
          {token && <UserNav />}

          {getPostsLoading ? <div className="w-full flex justify-center my-10">
            <PulseLoader color="cyan" size={10} />
          </div> : <Feed posts={posts} />}
        </div>
      </div>
    </div>
  );
}
