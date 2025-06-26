'use client';

import { GoogleAuthButton } from '@/components/google-auth-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError(null);

    const result = await signIn('google');

    if(result?.error) {
      console.log("Failed to Sign In : ", result?.error)
      setError(result?.error)
    }
    setIsLoading(false);
  };

  return (
    <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-background to-background/80'>
      <div className='w-full max-w-md px-4'>
        <div className='flex justify-center mb-8'>
          <div className='flex items-center gap-2'>
            <span className='text-2xl font-bold'>App Name</span>
          </div>
        </div>

        <Card className='border-border/40 shadow-lg'>
          <CardHeader className='space-y-1 text-center'>
            <CardTitle className='text-2xl'>Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent className='grid gap-4'>
            <GoogleAuthButton
              onClick={handleGoogleAuth}
              isLoading={isLoading}
            />

            {error && <p className='text-red-500'>{error}</p>}
          </CardContent>

          <CardFooter className='flex flex-col gap-2'>
            <p className='text-center text-sm text-muted-foreground'>
              By continuing, you agree to our{' '}
              <Link
                href='#'
                className='underline underline-offset-4 hover:text-primary'
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href='#'
                className='underline underline-offset-4 hover:text-primary'
              >
                Privacy Policy
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;