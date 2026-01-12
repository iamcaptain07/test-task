'use client';

import { useState, useEffect } from 'react';
import ProfileForm from '@/components/ProfileForm';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          setMessage({ type: 'error', text: 'Failed to load profile' });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setMessage({ type: 'error', text: 'Failed to load profile' });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (formData) => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.error || 'Failed to update profile' });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile' });
    }
  };

  if (loading) {
    return (
      <div className="px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Profile</h1>
      
      {message.text && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-400'
              : 'bg-red-100 text-red-800 border border-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl">
        {profile && (
          <>
            {profile.updatedAt && (
              <p className="text-sm text-gray-500 mb-6">
                Last updated: {new Date(profile.updatedAt).toLocaleString()}
              </p>
            )}
            <ProfileForm initialData={profile} onSave={handleSave} />
          </>
        )}
      </div>
    </div>
  );
}

