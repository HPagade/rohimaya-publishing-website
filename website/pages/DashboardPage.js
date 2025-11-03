/**
 * User Dashboard
 * Shows subscription status, usage stats, and quick access to apps
 */

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DashboardPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const DashboardPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const [subscription, setSubscription] = useState(null);
  const [usage, setUsage] = useState(null);
  const [jobHistory, setJobHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = await user.getToken();

      // Fetch subscription info
      const subResponse = await axios.get(`${API_BASE_URL}/api/subscription/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setSubscription(subResponse.data.data.subscription);
      setUsage(subResponse.data.data.usage);

      // Fetch job history
      const historyResponse = await axios.get(
        `${API_BASE_URL}/api/subscription/history?limit=10`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setJobHistory(historyResponse.data.data.jobs);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getUsagePercentage = (current, limit) => {
    if (limit === -1) return 0; // Unlimited
    return Math.min((current / limit) * 100, 100);
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 90) return '#e53e3e';
    if (percentage >= 70) return '#ed8936';
    return '#48bb78';
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Welcome back, {user?.firstName || 'there'}!</h1>
            <p className="subtitle">Manage your AI publishing projects</p>
          </div>
          <button
            className="upgrade-btn"
            onClick={() => navigate('/pricing')}
          >
            {subscription?.tier === 'free' ? 'Upgrade Plan' : 'Change Plan'}
          </button>
        </div>

        {/* Current Plan */}
        <div className="current-plan-card">
          <div className="plan-header">
            <div>
              <h2>Current Plan: <span className="plan-name">{subscription?.tier.charAt(0).toUpperCase() + subscription?.tier.slice(1)}</span></h2>
              <p className="plan-status">
                {subscription?.cancelAtPeriodEnd
                  ? `Cancels on ${new Date(subscription?.currentPeriodEnd).toLocaleDateString()}`
                  : subscription?.currentPeriodEnd
                  ? `Renews on ${new Date(subscription?.currentPeriodEnd).toLocaleDateString()}`
                  : 'Free Plan'}
              </p>
            </div>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="section-header">
          <h2>Usage This Month</h2>
        </div>

        <div className="usage-grid">
          {usage && Object.entries(usage).map(([feature, data]) => {
            const percentage = getUsagePercentage(data.count, data.limit);
            const color = getUsageColor(percentage);

            return (
              <div key={feature} className="usage-card">
                <div className="usage-header">
                  <h3>{feature.charAt(0).toUpperCase() + feature.slice(1)}</h3>
                  <span className="usage-count">
                    {data.count} / {data.limit === -1 ? '∞' : data.limit}
                  </span>
                </div>
                <div className="usage-bar">
                  <div
                    className="usage-fill"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: color
                    }}
                  />
                </div>
                {data.limit !== -1 && percentage >= 80 && (
                  <p className="usage-warning">
                    {percentage >= 100
                      ? 'Limit reached. Upgrade to continue.'
                      : `${data.limit - data.count} remaining`}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="section-header">
          <h2>Quick Actions</h2>
        </div>

        <div className="quick-actions-grid">
          <button
            className="action-card formatter"
            onClick={() => navigate('/formatter')}
          >
            <div className="action-icon">📚</div>
            <h3>AI Formatter</h3>
            <p>Format your manuscript</p>
          </button>

          <button
            className="action-card covers"
            onClick={() => navigate('/covers')}
          >
            <div className="action-icon">🎨</div>
            <h3>AI Covers</h3>
            <p>Generate book covers</p>
          </button>

          <button
            className="action-card images"
            onClick={() => navigate('/images')}
          >
            <div className="action-icon">🖼️</div>
            <h3>AI Images</h3>
            <p>Create book images</p>
          </button>

          <button
            className="action-card videos"
            onClick={() => navigate('/videos')}
          >
            <div className="action-icon">🎬</div>
            <h3>AI Videos</h3>
            <p>Make video trailers</p>
          </button>
        </div>

        {/* Recent Activity */}
        {jobHistory.length > 0 && (
          <>
            <div className="section-header">
              <h2>Recent Activity</h2>
            </div>

            <div className="activity-list">
              {jobHistory.map((job) => (
                <div key={job.id} className="activity-item">
                  <div className="activity-icon">
                    {job.feature === 'formatter' && '📚'}
                    {job.feature === 'covers' && '🎨'}
                    {job.feature === 'images' && '🖼️'}
                    {job.feature === 'videos' && '🎬'}
                  </div>
                  <div className="activity-details">
                    <h4>{job.feature.charAt(0).toUpperCase() + job.feature.slice(1)}</h4>
                    <p className="activity-date">
                      {new Date(job.created_at).toLocaleDateString()} at{' '}
                      {new Date(job.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className={`activity-status ${job.status}`}>
                    {job.status}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
