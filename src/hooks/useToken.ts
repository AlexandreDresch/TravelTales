import { useContext } from "react";

import UserContext from "../contexts/UserContext";

export default function useToken() {
  const userContext = useContext(UserContext);
  const token = userContext ? userContext.userData?.token : null;

  return token;
}
