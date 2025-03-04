import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import RootLayout from '../layouts/RootLayout';
import BookReview from '../pages/BookReview';
import BookReviewDetail from '../pages/BookReviewDetail';
import UserBookReview from '../pages/UserBookReview';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NotFound from '../pages/NotFound';
import ProtectedRouter from '../components/ProtectedRouter';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/reviews/create',
        element: <ProtectedRouter />,
        children: [{ index: true, element: <BookReview /> }],
      },
      {
        path: '/reviews/modify/:reviewId',
        element: <BookReview />,
      },
      {
        path: '/reviews/:reviewId',
        element: <BookReviewDetail />,
      },
      {
        path: '/userpage/:username',
        element: <UserBookReview />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: '/signup',
    element: <Signup />,
    errorElement: <NotFound />,
  },
]);

export default router;
