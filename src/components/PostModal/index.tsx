import Modal from "react-modal";
import { ImageCarousel } from "../ImageCarousel";
import {
  ChatText,
  DotsThree,
  MapPin,
  PaperPlaneRight,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import useGetPostById from "../../hooks/api/useGetPostById";
import useCreateComment from "../../hooks/api/useCreateComment";
import useToken from "../../hooks/useToken";

interface PictureData {
  url: string;
}

interface CommentData {
  comment: string;
  user: string;
}

interface ModalProps {
  modalIsOpen: boolean;
  setIsOpen: (modal: boolean) => void;
  postId: number;
}

Modal.setAppElement("#root");

export function PostModal({ modalIsOpen, setIsOpen, postId }: ModalProps) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState();
  const [comment, setComment] = useState("");

  const token = useToken();

  const { post, getPostById, getPostLoading } = useGetPostById();
  const { createComment, createCommentLoading } = useCreateComment();
  console.log(post);
  useEffect(() => {
    getPostById({ postId: postId });
    //setComments(post.Comments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  async function handleCreateComment(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    if (comment.length > 0) {
      try {
        createComment({ postId, comment, token });
      } catch (error) {
        alert("Unable to comment, please try again");
      }
    }
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Post Modal"
      //ariaHideApp={false}
      className="max-w-xl md:max-w-3xl max-h-[800px] overflow-auto  flex relative top-20 mx-auto bg-white rounded-sm p-2 border"
    >
      {getPostLoading || post === null ? (
        <>Loading</>
      ) : (
        <div className="w-full flex flex-col">
          <div className="flex w-full justify-between items-center border-x-slate-600 border-b-[.5px]">
            <h3>{post.User.username}</h3> <DotsThree />
          </div>
          <div className="flex flex-col justify-between md:flex-row md:justify-normal md:gap-2">
            <div className="relative mt-2 mb-4 flex justify-center">
              <ImageCarousel>
                {post.pictures.map((item: PictureData) => (
                  <img
                    src={item.url}
                    className="rounded-sm w-full "
                    key={item.url}
                  />
                ))}
              </ImageCarousel>
              <div className=" flex gap-1 items-center text-white absolute bottom-1 right-10 hover:text-gray-200 cursor-pointer hover:scale-105">
                <MapPin />
                <span>{post.country}</span>
              </div>
            </div>
            <div className="flex flex-col md:w-1/2 md:mt-2">
              <p className="text-sm mb-4 font-light">{post.description}</p>

              {!showComments && post.Comments.length > 0 ? (
                <div className="w-full flex justify-center mb-4">
                  <button
                    className="flex gap-2 items-center hover:text-gray-700 hover:scale-105"
                    onClick={() => setShowComments(!showComments)}
                  >
                    <ChatText />
                    <p>see comments</p>
                  </button>
                </div>
              ) : !showComments && post.Comments.length > 0 ? (
                <ul className="h-32 md:h-full overflow-auto mb-4">
                  {post.Comments.map((comment: CommentData) => {
                    return (
                      <li className="flex text-base" key={comment.user}>
                        <p>
                          <span className="font-medium mr-1">
                            {comment.user}:
                          </span>
                          {comment.comment}
                        </p>
                      </li>
                    );
                  })}
                  <button
                    className="w-full flex gap-2 justify-center items-center hover:text-gray-700 cursor-pointer"
                    onClick={() => setShowComments(!showComments)}
                  >
                    <ChatText />
                    <p>hide comments</p>
                  </button>
                </ul>
              ) : (
                <div className="w-full flex justify-center">
                  <p>No comments yet</p>
                </div>
              )}
            </div>
          </div>
          <form
            className="flex items-center relative"
            onSubmit={handleCreateComment}
          >
            <input
              type="text"
              placeholder="Write a comment"
              className="w-full rounded-sm h-10 p-1 bg-slate-50"
              disabled={createCommentLoading}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type="submit" disabled={createCommentLoading} className="absolute right-1">
              <PaperPlaneRight className="hover:text-cyan-500 transition-colors hover:scale-105 cursor-pointer" />
            </button>
          </form>
        </div>
      )}
    </Modal>
  );
}
