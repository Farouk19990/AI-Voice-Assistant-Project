import type { RouteObject } from 'react-router';

import { lazy } from 'react';

import { AuthLayout } from 'src/layouts/auth';


// ----------------------------------------------------------------------


export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));



export const routesSection: RouteObject[] = [
  {

    children: [
      { index: true, element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ), },
      { path: 'patients', element: <UserPage /> },
    ],
  },
];
