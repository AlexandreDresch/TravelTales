import useAsync from "../useAsync";

import * as postsApi from "../../services/postsApi";

export default function useGetPostById() {
  const {
    data: post,
    loading: getPostLoading,
    error: getPostError,
    act: getPostById,
  } = useAsync(postsApi.getPostById, false);

  return {
    post,
    getPostLoading,
    getPostError,
    getPostById,
  };
}
