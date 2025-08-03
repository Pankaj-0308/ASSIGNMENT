import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { handleGenericError } from '../utils/errorHandler';
import ErrorNotification from './ErrorNotification';

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          setError('Please select a valid image file (JPEG, PNG, GIF, etc.).');
          return;
        }
        
        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          setError('Image size should be less than 5MB. Please select a smaller image.');
          return;
        }

        setSelectedImage(file);
        setError('');
        
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
        };
        reader.onerror = () => {
          setError('Failed to read image file. Please try another image.');
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Image processing error:', error);
        setError('Failed to process image. Please try another file.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setError('');

    // Validate form
    if (!title.trim()) {
      setError('Please enter a title for your post.');
      return;
    }

    if (!content.trim()) {
      setError('Please enter content for your post.');
      return;
    }

    if (!selectedImage) {
      setError('Please select an image for your post.');
      return;
    }

    setPosting(true);

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('content', content.trim());
      formData.append('image', selectedImage);

      const response = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        // Reset form
        setTitle('');
        setContent('');
        setSelectedImage(null);
        setImagePreview('');
        setError('');

        // Close modal and notify parent
        onClose();
        onPostCreated(response.data.post);
      } else {
        setError(response.data.message || 'Failed to create post.');
      }
    } catch (error) {
      console.error('Create post error:', error);
      
      // Handle file upload errors specifically
      if (error.response?.status === 413 || error.code === 'LIMIT_FILE_SIZE') {
        setError('Image file is too large. Please select a smaller image (max 5MB).');
      } else {
        const errorResult = handleGenericError(error);
        const errorMessage = typeof errorResult === 'string' ? errorResult : errorResult.message;
        setError(errorMessage);
      }
    } finally {
      setPosting(false);
    }
  };

  const handleClose = () => {
    if (!posting) {
      setTitle('');
      setContent('');
      setSelectedImage(null);
      setImagePreview('');
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <ErrorNotification 
        error={error} 
        onClose={() => setError('')}
        position="top-center"
        autoClose={false}
      />
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Post</h2>
          <button
            className="modal-close"
            onClick={handleClose}
            disabled={posting}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="form-input"
              maxLength="100"
              required
              disabled={posting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Description *</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="form-textarea"
              rows="4"
              maxLength="1000"
              required
              disabled={posting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image *</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="form-input"
              required
              disabled={posting}
            />
            {imagePreview && (
              <div className="image-preview">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="preview-image"
                />
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={posting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={posting || !title.trim() || !content.trim() || !selectedImage}
            >
              {posting ? <span className="spinner"></span> : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal; 