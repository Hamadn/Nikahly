import { clerkMiddleware, createClerkClient } from '@clerk/astro/server';
import type { MiddlewareHandler } from 'astro';
import { sequence } from 'astro/middleware';

// Create a Clerk client for server-side operations
const clerk = createClerkClient({ secretKey: import.meta.env.CLERK_SECRET_KEY });

// Custom middleware to check if onboarding is complete
const onboardingMiddleware: MiddlewareHandler = async (context, next) => {
  const { locals, request, redirect } = context;
  // Skip middleware for public routes, API routes, and the onboarding pages themselves
  const url = new URL(request.url);
  const publicPaths = [
    '/sign-in',
    '/sign-up',
    '/profile',
    '/onboardoath',
    '/onboardpersonal',
    '/onboardreligion',
    '/onboardtraits',
    '/api',
    '/_astro',
    '/assets',
  ];
  // Check if the current path is public
  const isPublicPath = publicPaths.some(path => url.pathname.startsWith(path));
  if (isPublicPath) {
    return next();
  }
  // Get the authenticated user
  const auth = locals.auth();
  const userId = auth.userId;

  // If no user is logged in, proceed with normal flow (Clerk will handle redirects)
  if (!userId) {
    return next();
  }

  try {
    // Get the user from Clerk
    const user = await clerk.users.getUser(userId);
    // Check if onboarding is complete using public metadata
    const onboardingComplete = user.publicMetadata?.onboardingComplete === true;
    // If onboarding is not complete, redirect to onboarding
    if (!onboardingComplete) {
      return redirect('/onboardoath');
    }
    // If onboarding is complete, proceed
    return next();
  } catch (error) {
    console.error('Error in onboarding middleware:', error);
    return next();
  }
};

// Combine Clerk middleware with our custom middleware
export const onRequest = sequence(clerkMiddleware(), onboardingMiddleware);