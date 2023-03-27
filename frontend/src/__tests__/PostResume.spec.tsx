import { render, fireEvent } from '@testing-library/react';
import PostResume from '../components/PostResume';
import { usePosts } from '../hooks/usePosts';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      };
    }
  };
});

describe('PostResume component', () => {
  const comments = [
    {
      postId: '2',
      id: '6',
      name: 'et fugit eligendi deleniti quidem qui sint nihil autem',
      email: 'Presley.Mueller@myrl.com',
      body: 'doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in'
    },
    {
      postId: '2',
      id: '7',
      name: 'repellat consequatur praesentium vel minus molestias voluptatum',
      email: 'Dallas@ole.me',
      body: 'maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor'
    },
    {
      postId: '2',
      id: '8',
      name: 'et omnis dolorem',
      email: 'Mallory_Kunze@marie.org',
      body: 'ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque'
    },
    {
      postId: '2',
      id: '9',
      name: 'provident id voluptas',
      email: 'Meghan_Littel@rene.us',
      body: 'sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus'
    },
    {
      postId: '2',
      id: '10',
      name: 'eaque et deleniti atque tenetur ut quo ut',
      email: 'Carmen_Keeling@caroline.name',
      body: 'voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facilis'
    }
  ];
  it('author renders correctly', () => {
    const { getByText } = render(
      <PostResume
        author={'author'}
        comments={comments}
        content={'lorem ipsum dolor has met'}
        date={new Date()}
        hastags={['lorem', 'lorem', 'lorem']}
        id={'1'}
        liked={true}
        saved={true}
        unLiked={true}
        title={'title'}
        userId={'1'}
      />
    );
    expect(getByText('author')).toBeInTheDocument();
  });
  it('title renders correctly', () => {
    const { getByText } = render(
      <PostResume
        author={'author'}
        comments={comments}
        content={'lorem ipsum dolor has met'}
        date={new Date()}
        hastags={['lorem', 'lorem', 'lorem']}
        id={'1'}
        liked={true}
        saved={true}
        unLiked={true}
        title={'title'}
        userId={'1'}
      />
    );
    expect(getByText('title')).toBeInTheDocument();
  });
  it('id is not visible', () => {
    const { queryByText } = render(
      <PostResume
        author={'author'}
        comments={comments}
        content={'lorem ipsum dolor has met'}
        date={new Date()}
        hastags={['lorem', 'lorem', 'lorem']}
        id={'1'}
        liked={true}
        saved={true}
        unLiked={true}
        title={'title'}
        userId={'1'}
      />
    );
    expect(queryByText('1')).toBeNull();
  });
  it('have a button', () => {
    const onClickMock = jest.fn();

    const { getByRole } = render(
      <PostResume
        author={'author'}
        comments={comments}
        content={'lorem ipsum dolor has met'}
        date={new Date()}
        hastags={['lorem', 'lorem', 'lorem']}
        id={'1'}
        liked={true}
        saved={true}
        title={'title'}
        unLiked={true}
        userId={'1'}
      />
    );
    const button = getByRole('button');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalled;
  });
});
