import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const loggedIn = localStorage.getItem('adminLoggedIn');
      if (!loggedIn) {
        router.push('/Admin/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;