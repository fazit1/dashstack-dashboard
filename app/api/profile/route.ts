import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // Mock user data - in real app, get from database
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
  };
  
  return NextResponse.json(user);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    // Validate input
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // In real app, update database here
    console.log('Updating profile:', { name, email });

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { currentPassword, newPassword } = body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    // In real app, verify current password and update
    console.log('Changing password:', { currentPassword, newPassword });

    return NextResponse.json({ message: 'Password changed successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    );
  }
}
