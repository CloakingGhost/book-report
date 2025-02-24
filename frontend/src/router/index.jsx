import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import RootLayout from '../layouts/RootLayout';
import BookReviewCreate from '../pages/BookReviewCreate';
import BookReviewDetail from '../pages/BookReivewDetatil';
import UserBookReview from '../pages/UserBookReview';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NotFound from '../pages/NotFound';

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
        element: <BookReviewCreate />,
      },
      {
        path: '/reviews/{reviewId}',
        element: <BookReviewDetail />,
      },
      {
        path: '/{username}/reviews',
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
