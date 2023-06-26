import useAsync from "../useAsync";

import * as postsApi from "../../services/postsApi";

export default function useUpdatePostDescription() {
  const {
    loading: updateDescriptionLoading,
    error: updateDescriptionError,
    act: updateDescription,
  } = useAsync(postsApi.updateDescription, false);

  return {
    updateDescriptionLoading,
    updateDescriptionError,
    updateDescription,
  };
}
