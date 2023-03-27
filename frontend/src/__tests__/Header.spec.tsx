import { render } from '@testing-library/react';
import Header from '../components/Header';

jest.mock('next/router', () => {
  return {
    useRouter() {
      return {
        asPath: '/'
      };
    }
  };
});

describe('Header component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Header />);
    expect(getByText('JohnDoe')).toBeInTheDocument();
    expect(getByText('JohnDoe')).toBeEnabled();
  });
});
