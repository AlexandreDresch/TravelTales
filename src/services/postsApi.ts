import api from "./api";

interface Post {
  files: string[] | string;
  description: string;
  country: string;
  token: string;
}

interface Comment {
  comment: string;
  postId: number;
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

export async function getPostById({ postId }: { postId: number }) {
  const response = await api.get(`/posts/${postId}`);

  return response.data;
}

export async function getPostsByUserId({ userId, token }: { userId: number, token: string }) {
  const response = await api.get(`/posts/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }});

  return response.data;
}

export async function createComment({postId, comment, token}: Comment) {
  const data = {
    postId,
    comment
  };

  const response = await api.post("/posts/comment", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;
}