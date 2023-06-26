import useAsync from "../useAsync";

import * as postsApi from "../../services/postsApi";

export default function useDeletePost() {
  const {
    loading: deletePostLoading,
    error: deletePostError,
    act: deletePost,
  } = useAsync(postsApi.deletePost, false);

  return {
    deletePostLoading,
    deletePostError,
    deletePost,
  };
}
