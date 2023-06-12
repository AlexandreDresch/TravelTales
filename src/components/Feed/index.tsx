import { PostCard } from "../PostCard";

type Post = {
  id: number;
  pictures: string;
};

interface Feed {
  posts: Post[];
}

export function Feed({ posts }: Feed) {
  return (
    <ul className="px-2 py-4 grid mt-6 rounded-sm grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-4 mb-4 bg-white md:[&>*:nth-child(2)]:col-span-2 md:[&>*:nth-child(2)]:row-span-2 grid-flow-row-dense">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post.id}
            icon={post.pictures.length > 1}
            picture={post.pictures[0].url}
          />
        ))
      ) : (
        <div className="flex justify-center">No posts found</div>
      )}
    </ul>
  );
}
