import api from "./api";

interface Auth {
  email: string;
  password: string;
}

export async function signIn({ email, password }: Auth) {
  const response = await api.post("/auth/sign-in", { email, password });
  return response.data;
}
