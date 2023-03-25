import { useContext } from 'react';
import { PostsContext } from '../context/contextPosts';

export function usePosts() {
  const context = useContext(PostsContext);

  return context;
}
