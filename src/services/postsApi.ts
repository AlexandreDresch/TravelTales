import api from "./api";

interface Post {
  files: string[] | string;
  description: string;
  country: string;
  token: string;
}

export async function createPost({ files, description, country, token }: Post) {
  const data = {
    files: Array.isArray(files) ? files : [files],
    description,
    country,
  };

  const response = await api.post("/posts", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
}

export async function getPosts({ token }: { token: string }) {
  const response = await api.get("/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
