import useAsync from "../useAsync";

import * as postsApi from "../../services/postsApi";

export default function useCreateComment() {
  const {
    loading: createCommentLoading,
    error: createCommentError,
    act: createComment,
  } = useAsync(postsApi.createComment, false);

  return {
    createCommentLoading,
    createCommentError,
    createComment,
  };
}
