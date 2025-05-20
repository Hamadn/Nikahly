import type { APIRoute } from 'astro';
import { createClerkClient } from '@clerk/astro/server';

export const POST: APIRoute = async ({ request, locals }) => {
  // Parse the form data from the request body
  let formData = {};
  try {
    formData = await request.json();
  } catch (error) {
    console.error('Error parsing request body:', error);
  }
  try {
    // Get the authenticated user
    const auth = locals.auth();
    const userId = auth.userId;

    if (!userId) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Create Clerk client
    const clerk = createClerkClient({ secretKey: import.meta.env.CLERK_SECRET_KEY });
    
    // Update the user's metadata with all form data and mark onboarding as complete
    await clerk.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        ...formData,
        // Add timestamp for when onboarding was completed
        onboardingCompletedAt: new Date().toISOString()
      }
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error completing onboarding:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
