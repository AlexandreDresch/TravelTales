import { useContext, useEffect } from "react";
import { Feed } from "../Feed";
import useGetPostsByUserId from "../../hooks/api/useGetPostsByUserId";
import UserContext from "../../contexts/UserContext";
import useToken from "../../hooks/useToken";

export function UserProfile() {
    const token = useToken();
    const {userData} = useContext(UserContext);
    const userId = userData.user.id;

    const { posts, getPostsByUserId, getPostsLoading } = useGetPostsByUserId();

  useEffect(() => {
    getPostsByUserId({userId, token});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    return (
        <div>
            <Feed posts={posts}/>
        </div>
    )
}