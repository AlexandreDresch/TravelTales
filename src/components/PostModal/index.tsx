import Modal from "react-modal";
import { ImageCarousel } from "../ImageCarousel";
import {
  ChatText,
  Check,
  DotsThree,
  MapPin,
  PaperPlaneRight,
  PencilSimpleLine,
  Trash,
  X,
} from "@phosphor-icons/react";
import { useContext, useEffect, useState } from "react";
import useGetPostById from "../../hooks/api/useGetPostById";
import useCreateComment from "../../hooks/api/useCreateComment";
import useToken from "../../hooks/useToken";
import { v4 } from "uuid";
import { PulseLoader } from "react-spinners";
import useUpdatePostDescription from "../../hooks/api/useUpdateDescription";
import useDeletePost from "../../hooks/api/useDeletePost";
import useGetPosts from "../../hooks/api/useGetPosts";
import UserContext from "../../contexts/UserContext";

interface PictureData {
  url: string;
}

interface CommentData {
  comment: string;
  user: {
    username: string;
  };
}

interface ModalProps {
  modalIsOpen: boolean;
  setIsOpen: (modal: boolean) => void;
  postId: number;
}

Modal.setAppElement("#root");

export function PostModal({ modalIsOpen, setIsOpen, postId }: ModalProps) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newDescription, setNewDescription] = useState("");

  const token = useToken();

  const { post, getPostById, getPostLoading } = useGetPostById();
  const { createComment, createCommentLoading } = useCreateComment();
  const { updateDescription, updateDescriptionLoading } =
    useUpdatePostDescription();
  const { deletePost, deletePostLoading } = useDeletePost();
  const { getPosts } = useGetPosts();

  const { userData } = useContext(UserContext);

  useEffect(() => {
    getPostById({ postId: postId });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateDescriptionLoading, createCommentLoading]);

  function handleIsEditing() {
    setIsEditing(!isEditing);
  }

  function handleIsDeleting() {
    setIsEditing(false);
    setIsDeleting(!isDeleting);
  }

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
        setComment("");
        getPostById({ postId: postId });
      } catch (error) {
        alert("Unable to comment, please try again");
      }
    } else {
      alert("Unable to create an empty comment, please write something.");
    }
  }

  async function handleUpdateDescription(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();

    if (newDescription.length > 0) {
      try {
        updateDescription({ postId, description: newDescription, token });
        setIsEditing(false);
        setNewDescription("");
        getPostById({ postId: postId });
      } catch (error) {
        alert("Unable to update description, please try again");
      }
    } else {
      alert("Unable to send an empty description, please write something.");
    }
  }

  async function handleDeletePost(): Promise<void> {
    try {
      deletePost({ postId, token });
      setIsDeleting(false);
      closeModal();
      getPosts({ token });
    } catch (error) {
      alert("Unable to delete post, please try again");
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
      {getPostLoading || post === null || updateDescriptionLoading ? (
        <div className="flex justify-center">Loading</div>
      ) : (
        <div className="w-full flex flex-col">
          <div className="flex w-full justify-between items-center border-x-slate-600 border-b-[.5px]">
            <h3>{post.User.username}</h3>{" "}
            {userData.user !== undefined &&
            post.User.id === userData.user.id ? (
              <div className="flex gap-1">
                <PencilSimpleLine
                  className="hover:scale-105 hover:text-cyan-500 transition-transform"
                  onClick={handleIsEditing}
                />
                <Trash
                  className="hover:scale-105 hover:text-cyan-500 transition-transform"
                  onClick={handleIsDeleting}
                />
              </div>
            ) : (
              <DotsThree />
            )}
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
              {isEditing ? (
                <form onSubmit={handleUpdateDescription}>
                  <textarea
                    placeholder={
                      post.description
                        ? `${post.description}`
                        : "Create a new description"
                    }
                    disabled={updateDescriptionLoading}
                    value={newDescription ? newDescription : post.description}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full rounded-sm h-8 p-1 bg-slate-50 text-sm"
                  />

                  <button
                    className="flex w-full justify-center items-center bg-cyan-500 rounded-sm mt-1 p-0.5 hover:bg-cyan-600 transition-colors"
                    type="submit"
                    disabled={updateDescriptionLoading}
                  >
                    {updateDescriptionLoading ? (
                      <PulseLoader
                        size={5}
                        color="#FFFFFF"
                        className="my-1.5"
                      />
                    ) : (
                      <span className="text-white text-sm">Update</span>
                    )}
                  </button>
                </form>
              ) : post.description ? (
                <p className="text-sm mb-4 font-light">{post.description}</p>
              ) : null}

              {isDeleting && (
                <div className="w-full flex flex-col items-center">
                  <p className="text-sm">Delete this post?</p>

                  <div className="flex gap-2">
                    <button
                      className="text-red-500 hover:scale-110"
                      onClick={() => setIsDeleting(false)}
                      disabled={deletePostLoading}
                    >
                      <X />
                    </button>
                    <button
                      className="text-cyan-500 hover:scale-110"
                      onClick={() => handleDeletePost()}
                      disabled={deletePostLoading}
                    >
                      {deletePostLoading ? (
                        <PulseLoader size={3} color="#06B6D4" />
                      ) : (
                        <Check />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {!showComments && post.Comments.length > 0 ? (
                <div className="w-full flex justify-center mb-4">
                  <button
                    className="flex gap-2 items-center hover:text-gray-700"
                    onClick={() => setShowComments(!showComments)}
                  >
                    <ChatText />
                    <p className="text-sm">see comments</p>
                  </button>
                </div>
              ) : showComments && post.Comments.length > 0 ? (
                <ul className="h-32 md:h-full overflow-auto mb-4">
                  {post.Comments.map((comment: CommentData) => {
                    return (
                      <li className="flex text-base" key={v4()}>
                        <p>
                          <span className="font-medium mr-1">
                            {comment.user.username}:
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
                    <p className="text-sm">hide comments</p>
                  </button>
                </ul>
              ) : (
                <div className="w-full flex justify-center my-1">
                  <p className="text-sm">No comments yet</p>
                </div>
              )}
            </div>
          </div>
          {userData.user && (
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
              <button
                type="submit"
                disabled={createCommentLoading}
                className="absolute right-1"
              >
                {createCommentLoading ? (
                  <PulseLoader size={5} color="#06B6D4" />
                ) : (
                  <PaperPlaneRight className="hover:text-cyan-500 transition-colors hover:scale-105 cursor-pointer" />
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </Modal>
  );
}
