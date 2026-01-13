import connectDB from '@/lib/db';
import Profile from '@/models/Profile';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    
    let profile = await Profile.findOne({ id: 1 }).lean();

    // Seed default profile if it doesn't exist (first run)
    if (!profile) {
      const defaultProfile = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        favoriteGenres: ['fiction', 'classic'],
        updatedAt: new Date().toISOString()
      };
      await Profile.create(defaultProfile);
      profile = defaultProfile;
    }

    const { _id, __v, ...profileData } = profile;
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
    await connectDB();
    
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

    const updatedProfile = await Profile.findOneAndUpdate(
      { id: 1 },
      {
        name: name.trim(),
        email: email.trim(),
        favoriteGenres: Array.isArray(favoriteGenres) ? favoriteGenres : [],
        updatedAt: new Date().toISOString()
      },
      { upsert: true, new: true, lean: true }
    );

    const { _id, __v, ...profileData } = updatedProfile;
    return NextResponse.json(profileData);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
