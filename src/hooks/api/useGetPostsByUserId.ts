import useAsync from "../useAsync";

import * as postsApi from "../../services/postsApi";

export default function useGetPostsByUserId() {
  const {
    data: posts,
    loading: getPostsLoading,
    error: getPostsError,
    act: getPostsByUserId,
  } = useAsync(postsApi.getPostsByUserId, false);

  return {
    posts,
    getPostsLoading,
    getPostsError,
    getPostsByUserId,
  };
}
