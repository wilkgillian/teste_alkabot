import { randomBytes } from 'crypto';
import { createContext, ReactNode, useState } from 'react';
import { api } from '../services/axios';

interface PostProps {
  author: string;
  userId: string;
  title: string;
  id: number;
  body: string;
  liked: boolean;
  unLiked: boolean;
  saved: boolean;
  date: Date;
  hastags: string[];
  comments: CommentsProps[];
}

interface CommentsProps {
  postId: string;
  id: string;
  name: string;
  email: string;
  body: string;
}

interface PostProviderProps {
  children: ReactNode;
}

interface PostsContextProps {
  posts: PostProps[];
  loadPosts: () => void;
  getUser: (userId: string) => Promise<string>;
  loadComments: (id: string) => Promise<CommentsProps[]>;
}

export const PostsContext = createContext({} as PostsContextProps);

export function PostsProvider({ children }: PostProviderProps) {
  const [posts, setPosts] = useState([]);

  async function getUser(userId: string) {
    const { data } = await api.get(`/users/${userId}`);

    return `@${data.username}`;
  }

  async function loadComments(id: string) {
    const { data } = await api.get(`/posts/${id}/comments`);
    return data;
  }

  async function loadPosts() {
    const { data } = await api.get('posts');
    const nPosts = await Promise.all(
      data.map(
        async (post: {
          userId: string;
          title: string;
          id: number;
          body: string;
          author: string;
          liked: boolean;
          saved: boolean;
          date: Date;
          hastags: string[];
          comments: CommentsProps[];
        }) => {
          const author = await getUser(post.userId);
          const comments = await loadComments(String(post.id));
          const date = new Date(Number(post.id) * 3 * Date.now());
          const data = {
            title: post.title ? post.title : 'Lorem ipsum dolor',
            userId: post.userId ? post.userId : randomBytes(2),
            id: post.id ? post.id : randomBytes(2),
            body: post.body
              ? post.body
              : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ducimus blanditiis laborum at esse molestiae totam quis molestias id, dolorem necessitatibus rem libero quasi cumque quas reiciendis consequatur dolore iste',
            hastags: post.hastags
              ? post.hastags
              : ['lorem', 'ipsum', 'impartial', 'ipsum', 'dolor'],
            author: author ? author : '@JhonDoe',
            comments: comments
              ? comments
              : ['lorem', 'ipsum', 'impartial', 'ipsum', 'dolor'],
            date: date
          };
          return data;
        }
      )
    );

    setPosts(nPosts);
  }
  loadPosts();

  return (
    <PostsContext.Provider
      value={{
        posts,
        loadPosts,
        getUser,
        loadComments
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}
