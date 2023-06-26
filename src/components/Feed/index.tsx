import { useEffect, useState } from "react";
import { PostModal } from "../PostModal";
import { Stack } from "@phosphor-icons/react";
import useToken from "../../hooks/useToken";
import useGetPosts from "../../hooks/api/useGetPosts";
import { PulseLoader } from "react-spinners";
import useDeletePost from "../../hooks/api/useDeletePost";

interface PostData {
  User: {
    username: string;
  };
  country: string;
  description: string | null;
  id: number;
  pictures: [
    {
      url: string;
    }
  ];
}

interface Feed {
  posts: PostData[];
  setIsOpen: (modal: boolean) => void;
  modalIsOpen: boolean;
}

export function Feed() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postId, setPostId] = useState(0);

  const token = useToken();

  const { posts, getPosts, getPostsLoading } = useGetPosts();

  useEffect(() => {
    getPosts({ token });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalIsOpen]);

  function expandModal(project: number) {
    setPostId(project);
    console.log(project);
    setIsOpen(true);
  }
  return (
    <>
      {getPostsLoading ? (
        <div className="w-full flex justify-center my-10">
          <PulseLoader color="cyan" size={10} />
        </div>
      ) : (
        <ul className="px-2 py-4 grid mt-6 rounded-sm grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4 mb-4 bg-white  grid-flow-row-dense">
          {posts && posts.length > 0 ? (
            <>
              {posts.map((post: PostData) => (
                <div key={post.id}>
                  <li
                    className="cursor-pointer relative"
                    onClick={() => expandModal(post.id)}
                  >
                    <img
                      src={post.pictures[0].url}
                      alt=""
                      className="w-full h-auto rounded-sm max-w-fit"
                    />
                    {post.pictures.length > 1 && (
                      <Stack
                        size={20}
                        className="absolute bottom-1 left-1 text-white"
                      />
                    )}
                  </li>
                </div>
              ))}

              {modalIsOpen && (
                <PostModal
                  postId={postId}
                  modalIsOpen={modalIsOpen}
                  setIsOpen={setIsOpen}
                />
              )}
            </>
          ) : (
            <div className="w-full flex justify-center">No posts found</div>
          )}
        </ul>
      )}
    </>
  );
}
