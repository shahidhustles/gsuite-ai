import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  console.log('Session:', session);

  if (session) {
    return redirect('/dashboard');
  }

  return <>{children}</>;
}