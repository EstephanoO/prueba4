
import Nav from './_components/nav';
import { Suspense } from 'react';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense>
        <Nav />
      {children}
      </Suspense>
    </>
  );
}
