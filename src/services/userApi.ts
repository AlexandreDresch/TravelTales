import api from "./api";

interface Auth {
  username: string;
  email: string;
  password: string;
}

export async function signUp({ username, email, password }: Auth) {
  const response = await api.post("/users", { username, email, password });
  return response.data;
}
