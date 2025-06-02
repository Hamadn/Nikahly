// src/pages/api/users.ts
import type { APIRoute } from 'astro';
import { clerkClient } from '@clerk/astro/server';

const clerk = clerkClient({ secretKey: import.meta.env.CLERK_SECRET_KEY });

export const GET: APIRoute = async ({ request, url, locals }) => {
  try {
    // Get current user from Clerk
    const auth = locals.auth();
    if (!auth?.userId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'User not authenticated',
        users: []
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get current user's data to determine their gender
    const currentUser = await clerk.users.getUser(auth.userId);
    const currentUserGender = currentUser.publicMetadata?.gender || 
                             currentUser.privateMetadata?.gender || 
                             currentUser.unsafeMetadata?.gender;

    // Determine opposite gender for filtering
    let oppositeGender = '';
    if (currentUserGender?.toString().toLowerCase() === 'male') {
      oppositeGender = 'female';
    } else if (currentUserGender?.toString().toLowerCase() === 'female') {
      oppositeGender = 'male';
    }

    // Parse query parameters
    const searchParams = new URL(request.url).searchParams;
    const filters = {
      nationality: searchParams.get('nationality'),
      maritalStatus: searchParams.get('maritalStatus'),
      age: searchParams.get('age'),
      residence: searchParams.get('residence'),
      skinColor: searchParams.get('skinColor'),
      eyeColor: searchParams.get('eyeColor'),
      bodyType: searchParams.get('bodyType'),
      beard: searchParams.get('beard'),
      height: searchParams.get('height'),
      weight: searchParams.get('weight'),
      devotion: searchParams.get('devotion'),
      sect: searchParams.get('sect'),
      revert: searchParams.get('revert'),
      practicingSince: searchParams.get('practicingSince'),
      prayerPattern: searchParams.get('prayerPattern'),
      // Automatically set gender filter to opposite gender
      gender: oppositeGender,
    };

    // Remove null/empty filters
    const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value && value.trim() !== '') {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>);

    // Fetch users from Clerk
    const { data: users } = await clerk.users.getUserList({
      limit: 100, // Adjust as needed
      offset: 0,
    });

    // Filter users based on metadata
    const filteredUsers = users.filter(user => {
      // Always exclude the current user from results
      if (user.id === auth.userId) {
        return false;
      }

      // If no opposite gender determined, return empty results
      if (!oppositeGender) {
        return false;
      }

      // Check each filter against user metadata
      return Object.entries(activeFilters).every(([filterKey, filterValue]) => {
        // Skip empty filters
        if (!filterValue) return true;

        // Check in both publicMetadata and privateMetadata
        const userValue = user.publicMetadata?.[filterKey] || 
                         user.privateMetadata?.[filterKey] ||
                         user.unsafeMetadata?.[filterKey];
        
        if (!userValue) {
          return false; // User doesn't have this field
        }

        // Handle different comparison types
        switch (filterKey) {
          case 'age':
            return userValue.toString() === filterValue;
          case 'height':
          case 'weight':
            return userValue.toString() === filterValue;
          case 'gender':
            // Handle gender comparison (case-insensitive)
            return userValue.toString().toLowerCase() === filterValue.toLowerCase();
          default:
            // String comparison (case-insensitive)
            return userValue.toString().toLowerCase() === filterValue.toLowerCase();
        }
      });
    });

    // Transform user data for frontend
    const transformedUsers = filteredUsers.map(user => ({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || '',
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt,
      metadata: {
        ...user.publicMetadata,
        // Include relevant private metadata if needed (be careful about privacy)
        // You might want to explicitly include gender if it's needed on frontend
        gender: user.publicMetadata?.gender || user.privateMetadata?.gender || user.unsafeMetadata?.gender,
      }
    }));

    return new Response(JSON.stringify({
      success: true,
      users: transformedUsers,
      total: transformedUsers.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch users',
      users: []
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};

// Optional: Add POST method for more complex searches
export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Get current user from Clerk
    const auth = locals.auth();
    if (!auth?.userId) {
      return new Response(JSON.stringify({
        success: false,
        error: 'User not authenticated',
        users: []
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get current user's data to determine their gender
    const currentUser = await clerk.users.getUser(auth.userId);
    const currentUserGender = currentUser.publicMetadata?.gender || 
                             currentUser.privateMetadata?.gender || 
                             currentUser.unsafeMetadata?.gender;

    // Determine opposite gender for filtering
    let oppositeGender = '';
    if (currentUserGender?.toString().toLowerCase() === 'male') {
      oppositeGender = 'female';
    } else if (currentUserGender?.toString().toLowerCase() === 'female') {
      oppositeGender = 'male';
    }

    const body = await request.json();
    const { filters = {}, pagination } = body;

    // Force gender filter to opposite gender
    filters.gender = oppositeGender;

    // Fetch users from Clerk
    const { data: users } = await clerk.users.getUserList({
      limit: pagination?.limit || 20,
      offset: pagination?.offset || 0,
    });

    // Apply filters including gender
    const filteredUsers = users.filter(user => {
      // Always exclude the current user from results
      if (user.id === auth.userId) {
        return false;
      }

      // If no opposite gender determined, return empty results
      if (!oppositeGender) {
        return false;
      }

      // Check each filter against user metadata
      return Object.entries(filters).every(([filterKey, filterValue]) => {
        if (!filterValue) return true; // Skip empty filters

        const userValue = user.publicMetadata?.[filterKey] || 
                         user.privateMetadata?.[filterKey] ||
                         user.unsafeMetadata?.[filterKey];
        
        if (!userValue) {
          return false; // User doesn't have this field
        }

        // Handle different comparison types
        switch (filterKey) {
          case 'age':
            return userValue.toString() === filterValue.toString();
          case 'height':
          case 'weight':
            return userValue.toString() === filterValue.toString();
          case 'gender':
            return userValue.toString().toLowerCase() === filterValue.toString().toLowerCase();
          default:
            return userValue.toString().toLowerCase() === filterValue.toString().toLowerCase();
        }
      });
    });

    // Transform user data
    const transformedUsers = filteredUsers.map(user => ({
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress || '',
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt,
      metadata: {
        ...user.publicMetadata,
        gender: user.publicMetadata?.gender || user.privateMetadata?.gender || user.unsafeMetadata?.gender,
      }
    }));

    return new Response(JSON.stringify({
      success: true,
      users: transformedUsers,
      total: transformedUsers.length,
      pagination: {
        limit: pagination?.limit || 20,
        offset: pagination?.offset || 0,
        hasMore: transformedUsers.length === (pagination?.limit || 20)
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error in POST /api/users:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to process search request'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};