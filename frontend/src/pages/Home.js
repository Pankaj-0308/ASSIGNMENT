import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { handleGenericError } from '../utils/errorHandler';
import ErrorNotification from '../components/ErrorNotification';
import CreatePostModal from '../components/CreatePostModal';

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalUsers: 0,
    totalLikes: 0
  });

  useEffect(() => {
    fetchPosts();
    fetchStats();
  }, []);

  const fetchPosts = async () => {
    try {
      setError('');
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Fetch posts error:', error);
      const errorResult = handleGenericError(error);
      const errorMessage = typeof errorResult === 'string' ? errorResult : errorResult.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/posts');
      const allPosts = response.data;
      const totalLikes = allPosts.reduce((sum, post) => sum + post.likes.length, 0);
      
      setStats({
        totalPosts: allPosts.length,
        totalUsers: new Set(allPosts.map(post => post.author._id)).size,
        totalLikes: totalLikes
      });
    } catch (error) {
      console.error('Fetch stats error:', error);
      setStats({
        totalPosts: 0,
        totalUsers: 0,
        totalLikes: 0
      });
    }
  };

  // Simplified like functionality that doesn't require backend
  const handleLike = (postId) => {
    // Update the UI optimistically without making an API call
    setPosts(posts.map(post => {
      if (post._id === postId) {
        // Check if user is logged in
        if (!user) {
          setError('Please sign in to like posts');
          return post;
        }
        
        // Toggle like status
        const userLiked = post.likes.includes(user._id);
        const updatedLikes = userLiked
          ? post.likes.filter(id => id !== user._id)
          : [...post.likes, user._id];
        
        return {
          ...post,
          likes: updatedLikes
        };
      }
      return post;
    }));
    
    // Update stats
    fetchStats();
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      setError('');
      const response = await axios.delete(`/api/posts/${postId}`);
      
      if (response.data.success) {
        setPosts(posts.filter(post => post._id !== postId));
        fetchStats();
      } else {
        setError(response.data.message || 'Failed to delete post.');
      }
    } catch (error) {
      console.error('Delete post error:', error);
      const errorResult = handleGenericError(error);
      const errorMessage = typeof errorResult === 'string' ? errorResult : errorResult.message;
      setError(errorMessage);
    }
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
    fetchStats();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="home-page">
      <ErrorNotification 
        error={error} 
        onClose={() => setError('')}
        position="top-right"
      />
      
      {/* Enhanced Header Section */}
      <div className="welcome-section-linkedin">
        <div className="welcome-content-linkedin">
          <div className="welcome-main-linkedin">
            <h1 className="welcome-title-linkedin">Professional Network</h1>
            <p className="welcome-subtitle-linkedin">Connect, share ideas, and grow your career with professionals from around the world</p>
            {!user && (
              <div className="header-actions">
                <Link to="/register" className="btn-primary">Join Now</Link>
                <Link to="/login" className="btn-secondary">Sign In</Link>
              </div>
            )}
          </div>
          <div className="welcome-image-linkedin">
            <img src="/images/network-illustration.svg" alt="Professional Network" className="network-illustration" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="home-layout">
          {/* Enhanced Left Sidebar */}
          <div className="sidebar-left">
            {user ? (
              <div className="sidebar-card user-profile-card">
                <div className="user-profile-summary">
                  <div className="profile-avatar">
                    {getInitials(user.name)}
                  </div>
                  <h3 className="profile-name">{user.name}</h3>
                  <p className="profile-headline">Professional Network Member</p>
                </div>
                <div className="profile-stats">
                  <div className="profile-stat-item">
                    <span className="stat-value">Profile views</span>
                    <span className="stat-count">24</span>
                  </div>
                  <div className="profile-stat-item">
                    <span className="stat-value">Post impressions</span>
                    <span className="stat-count">142</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="sidebar-card">
                <h3>Join Our Network</h3>
                <p className="join-text">Sign in to connect with professionals and share your insights.</p>
                <div className="join-actions">
                  <Link to="/login" className="action-btn primary">Sign In</Link>
                  <Link to="/register" className="action-btn">Register</Link>
                </div>
              </div>
            )}

            <div className="sidebar-card">
              <h3>Quick Actions</h3>
              <button className="action-btn primary" onClick={() => setShowCreateModal(true)}>
                <span className="action-icon">✏️</span> Create Post
              </button>
              <button className="action-btn">
                <span className="action-icon">👥</span> Find Connections
              </button>
              <button className="action-btn">
                <span className="action-icon">🔍</span> Job Search
              </button>
            </div>

            <div className="sidebar-card">
              <h3>Network Insights</h3>
              <div className="stat-item">
                <span className="stat-number">{stats.totalUsers}</span>
                <span className="stat-label">Active Members</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.totalPosts}</span>
                <span className="stat-label">Shared Posts</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.totalLikes}</span>
                <span className="stat-label">Engagement</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content">
            <div className="content-header">
              <h2>Recent Posts</h2>
              {user && (
                <button className="create-post-btn" onClick={() => setShowCreateModal(true)}>
                  Create Post
                </button>
              )}
            </div>

            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading posts...</p>
              </div>
            ) : error ? (
              <div className="error-container">
                <p>Error loading posts: {error}</p>
                <button className="retry-btn" onClick={fetchPosts}>
                  Try Again
                </button>
              </div>
            ) : posts.length === 0 ? (
              <div className="empty-state">
                <h3>No posts yet</h3>
                <p>Be the first to share something with your network!</p>
                <button className="create-first-post-btn" onClick={() => setShowCreateModal(true)}>
                  Create Your First Post
                </button>
              </div>
            ) : (
              <div className="posts-list">
                {posts.map((post) => (
                  <div key={post._id} className="post-card">
                    <div className="post-header">
                      <div className="post-author">
                        <div className="author-avatar">
                          <div className="avatar-fallback">
                            {getInitials(post.author.name)}
                          </div>
                        </div>
                        <div className="author-info">
                          <div className="author-name">{post.author.name}</div>
                          <div className="post-date">{formatDate(post.createdAt)}</div>
                        </div>
                      </div>
                      {user && post.author._id === user._id && (
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeletePost(post._id)}
                        >
                          Delete
                        </button>
                      )}
                    </div>

                    <div className="post-content">
                      <p className="post-text">{post.content}</p>
                      {post.image && (
                        <div className="post-image">
                          <img src={post.image} alt="Post" />
                        </div>
                      )}
                    </div>

                    <div className="post-actions">
                      <button 
                        className={`like-btn ${user && post.likes?.includes(user?._id) ? 'liked' : ''}`}
                        onClick={() => handleLike(post._id)}
                      >
                        <span className="action-icon">👍</span> Like ({post.likes?.length || 0})
                      </button>
                      <button className="comment-btn">
                        <span className="action-icon">💬</span> Comment ({post.comments?.length || 0})
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar - Enhanced with sticky behavior */}
          <div className="sidebar-right">
            <div className="sidebar-card">
              <h3>Trending Topics</h3>
              <div className="trending-item">
                <span className="trending-tag">#Technology</span>
                <span className="trending-count">1.2K posts</span>
              </div>
              <div className="trending-item">
                <span className="trending-tag">#Innovation</span>
                <span className="trending-count">856 posts</span>
              </div>
              <div className="trending-item">
                <span className="trending-tag">#Leadership</span>
                <span className="trending-count">642 posts</span>
              </div>
              <div className="trending-item">
                <span className="trending-tag">#RemoteWork</span>
                <span className="trending-count">524 posts</span>
              </div>
            </div>

            <div className="sidebar-card">
              <h3>Community Insights</h3>
              <div className="community-stats">
                <div className="stat-item">
                  <span className="stat-number">{stats.totalLikes}</span>
                  <span className="stat-label">Total Likes</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{stats.totalPosts}</span>
                  <span className="stat-label">Posts Shared</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{stats.totalUsers}</span>
                  <span className="stat-label">Active Members</span>
                </div>
              </div>
            </div>
            
            <div className="sidebar-card">
              <h3>Quick Tips</h3>
              <div className="tip-item">
                <div className="tip-icon">💡</div>
                <div className="tip-content">
                  <p>Share your professional achievements to get more visibility.</p>
                </div>
              </div>
              <div className="tip-item">
                <div className="tip-icon">🔍</div>
                <div className="tip-content">
                  <p>Follow trending topics to stay updated with industry news.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};


export default Home;