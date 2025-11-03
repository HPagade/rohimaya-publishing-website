/**
 * Pricing Page
 * Displays subscription tiers and handles checkout
 */

import React, { useState, useEffect } from 'react';
import { useUser, useClerk } from '@clerk/clerk-react';
import axios from 'axios';
import './PricingPage.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const PricingPage = () => {
  const { isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();

  const [tiers, setTiers] = useState([]);
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTiers();
    if (isSignedIn) {
      fetchCurrentSubscription();
    }
  }, [isSignedIn]);

  const fetchTiers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/subscription/tiers`);
      setTiers(response.data.data.tiers);
    } catch (err) {
      console.error('Error fetching tiers:', err);
    }
  };

  const fetchCurrentSubscription = async () => {
    try {
      const token = await user.getToken();
      const response = await axios.get(`${API_BASE_URL}/api/subscription/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCurrentSubscription(response.data.data.subscription);
    } catch (err) {
      console.error('Error fetching subscription:', err);
    }
  };

  const handleSubscribe = async (tierId) => {
    if (!isSignedIn) {
      openSignIn();
      return;
    }

    if (tierId === 'free') {
      return; // Already on free tier
    }

    setLoading(true);
    setError('');

    try {
      const token = await user.getToken();
      const response = await axios.post(
        `${API_BASE_URL}/api/subscription/checkout`,
        { tier: tierId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirect to Stripe checkout
      window.location.href = response.data.data.url;
    } catch (err) {
      setError('Failed to create checkout session. Please try again.');
      console.error('Checkout error:', err);
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setLoading(true);
    try {
      const token = await user.getToken();
      const response = await axios.post(
        `${API_BASE_URL}/api/subscription/portal`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirect to Stripe customer portal
      window.location.href = response.data.data.url;
    } catch (err) {
      setError('Failed to open customer portal. Please try again.');
      console.error('Portal error:', err);
      setLoading(false);
    }
  };

  const getTierButtonText = (tierId) => {
    if (!isSignedIn) {
      return tierId === 'free' ? 'Get Started Free' : 'Start Free Trial';
    }

    if (currentSubscription?.tier === tierId) {
      return 'Current Plan';
    }

    if (tierId === 'free') {
      return 'Downgrade';
    }

    const tierOrder = ['free', 'author', 'publisher', 'enterprise'];
    const currentIndex = tierOrder.indexOf(currentSubscription?.tier);
    const targetIndex = tierOrder.indexOf(tierId);

    if (targetIndex > currentIndex) {
      return 'Upgrade';
    } else {
      return 'Downgrade';
    }
  };

  return (
    <div className="pricing-page">
      <div className="pricing-container">
        {/* Header */}
        <div className="pricing-header">
          <h1>Choose Your Plan</h1>
          <p className="subtitle">
            Start for free, upgrade as you grow. Cancel anytime.
          </p>
        </div>

        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        {/* Pricing Tiers */}
        <div className="pricing-grid">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`pricing-card ${tier.id === 'author' ? 'popular' : ''} ${
                currentSubscription?.tier === tier.id ? 'current' : ''
              }`}
            >
              {tier.id === 'author' && (
                <div className="popular-badge">Most Popular</div>
              )}

              {currentSubscription?.tier === tier.id && (
                <div className="current-badge">Current Plan</div>
              )}

              <div className="tier-header">
                <h2>{tier.name}</h2>
                <div className="tier-price">
                  {tier.price === 0 ? (
                    <span className="price">Free</span>
                  ) : (
                    <>
                      <span className="currency">$</span>
                      <span className="price">{tier.price}</span>
                      <span className="period">/month</span>
                    </>
                  )}
                </div>
              </div>

              <ul className="features-list">
                {tier.features.map((feature, index) => (
                  <li key={index}>
                    <span className="check-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`subscribe-btn ${
                  currentSubscription?.tier === tier.id ? 'current-btn' : ''
                } ${tier.id === 'author' ? 'popular-btn' : ''}`}
                onClick={() => handleSubscribe(tier.id)}
                disabled={loading || currentSubscription?.tier === tier.id}
              >
                {loading ? 'Processing...' : getTierButtonText(tier.id)}
              </button>
            </div>
          ))}
        </div>

        {/* Manage Subscription */}
        {isSignedIn && currentSubscription && currentSubscription.tier !== 'free' && (
          <div className="manage-subscription">
            <button
              className="manage-btn"
              onClick={handleManageSubscription}
              disabled={loading}
            >
              Manage Subscription
            </button>
            <p className="help-text">
              Update payment method, view invoices, or cancel subscription
            </p>
          </div>
        )}

        {/* FAQ */}
        <div className="pricing-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Can I change plans later?</h3>
              <p>
                Yes! You can upgrade or downgrade at any time. Changes take effect
                immediately and we'll prorate any differences.
              </p>
            </div>
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>
                We accept all major credit cards (Visa, Mastercard, American Express)
                through our secure payment processor, Stripe.
              </p>
            </div>
            <div className="faq-item">
              <h3>Is there a free trial?</h3>
              <p>
                Yes! The Free tier is always available with no credit card required.
                Try our platform risk-free before upgrading.
              </p>
            </div>
            <div className="faq-item">
              <h3>Can I cancel anytime?</h3>
              <p>
                Absolutely. You can cancel your subscription at any time. You'll
                continue to have access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="trust-section">
          <div className="trust-item">
            <span className="trust-icon">🔒</span>
            <span>Secure Payments</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">✓</span>
            <span>Cancel Anytime</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">💳</span>
            <span>No Hidden Fees</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">📧</span>
            <span>Email Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
