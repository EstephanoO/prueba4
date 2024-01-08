
import Nav from './_components/nav';
import { Suspense } from 'react';
import { Provider } from './tabla/Provider';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <Provider>
          <Nav />
          {children}
        </Provider>
      </Suspense>
    </>
  );
}
