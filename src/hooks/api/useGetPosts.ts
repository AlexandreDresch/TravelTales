import useAsync from "../useAsync";

import * as postsApi from "../../services/postsApi";

export default function useGetPosts() {
  const {
    data: posts,
    loading: getPostsLoading,
    error: getPostsError,
    act: getPosts,
  } = useAsync(postsApi.getPosts, false);

  return {
    posts,
    getPostsLoading,
    getPostsError,
    getPosts,
  };
}
