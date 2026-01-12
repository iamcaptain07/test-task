import { getProfileCollection } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const profiles = await getProfileCollection();
    let profile = await profiles.findOne({ id: 1 });

    // Seed default profile if it doesn't exist (first run)
    if (!profile) {
      const defaultProfile = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        favoriteGenres: ['fiction', 'classic'],
        updatedAt: new Date().toISOString()
      };
      await profiles.insertOne(defaultProfile);
      profile = defaultProfile;
    }

    // Remove MongoDB _id from response
    const { _id, ...profileData } = profile;
    return NextResponse.json(profileData);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { name, email, favoriteGenres } = body;

    // Server-side validation
    if (!name || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!email || email.trim() === '') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const profiles = await getProfileCollection();
    
    const updateResult = await profiles.updateOne(
      { id: 1 },
      {
        $set: {
          name: name.trim(),
          email: email.trim(),
          favoriteGenres: Array.isArray(favoriteGenres) ? favoriteGenres : [],
          updatedAt: new Date().toISOString()
        }
      },
      { upsert: true }
    );

    const updatedProfile = await profiles.findOne({ id: 1 });
    const { _id, ...profileData } = updatedProfile;

    return NextResponse.json(profileData);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

