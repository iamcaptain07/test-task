'use client';

import { useState, useEffect } from 'react';

export default function ProfileForm({ initialData, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    favoriteGenres: []
  });
  const [genreInput, setGenreInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        favoriteGenres: initialData.favoriteGenres || []
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Name is required';
    }

    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const addGenre = () => {
    if (genreInput.trim() && !formData.favoriteGenres.includes(genreInput.trim())) {
      setFormData(prev => ({
        ...prev,
        favoriteGenres: [...prev.favoriteGenres, genreInput.trim()]
      }));
      setGenreInput('');
    }
  };

  const removeGenre = (genreToRemove) => {
    setFormData(prev => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.filter(genre => genre !== genreToRemove)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.name ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="favoriteGenres" className="block text-sm font-medium text-gray-700 mb-1">
          Favorite Genres
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            id="favoriteGenres"
            value={genreInput}
            onChange={(e) => setGenreInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addGenre();
              }
            }}
            placeholder="Add a genre"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addGenre}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Add
          </button>
        </div>
        {formData.favoriteGenres.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.favoriteGenres.map((genre, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {genre}
                <button
                  type="button"
                  onClick={() => removeGenre(genre)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  );
}

