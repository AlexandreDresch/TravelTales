import useAsync from "../useAsync";

import * as postsApi from "../../services/postsApi";

export default function useCreatePost() {
  const {
    loading: createPostLoading,
    error: createPostError,
    act: createPost,
  } = useAsync(postsApi.createPost, false);

  return {
    createPostLoading,
    createPostError,
    createPost,
  };
}
