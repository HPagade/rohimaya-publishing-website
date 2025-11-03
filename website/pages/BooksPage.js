/**
 * BOOKS PAGE
 *
 * Displays all your books organized by category
 */

import React from 'react';
import { Link } from 'react-router-dom';
import './BooksPage.css';

function BooksPage() {
  // TODO: Later, this will come from a database or API
  const bookCategories = [
    {
      name: 'Cookbooks',
      series: 'The Spice & Soul Collection',
      description: 'Cultural storytelling meets culinary magic',
      books: [
        { title: 'Masala & Magnolia', status: 'coming-soon' },
        { title: 'Cardamom & Cornbread', status: 'coming-soon' },
        { title: 'Chai & Cobbler', status: 'coming-soon' },
      ]
    },
    {
      name: 'Fantasy Romance',
      series: 'The Phoenix & Peacock Chronicles',
      description: 'Epic fantasy romance where enemies become soulmates',
      books: [
        { title: 'Eclipse of Fire & Wings', status: 'coming-soon' },
        { title: 'Ashes of the Lioness', status: 'coming-soon' },
        { title: 'Crown of Embers', status: 'coming-soon' },
      ]
    },
    {
      name: 'Cozy Mystery',
      series: 'Masala & Murder',
      description: 'Recipes, charm, and clever mysteries',
      books: [
        { title: 'A Deadly Dosa', status: 'coming-soon' },
        { title: 'Murder at the Masala Market', status: 'coming-soon' },
      ]
    }
  ];

  return (
    <div className="books-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container">
          <h1>Our Book Collection</h1>
          <p>Explore worlds of flavor, magic, and mystery</p>
        </div>
      </section>

      {/* Books by Category */}
      <section className="section">
        <div className="container">
          {bookCategories.map((category, index) => (
            <div key={index} className="category-section">
              <div className="category-header">
                <h2>{category.name}</h2>
                <h3 className="series-name">{category.series}</h3>
                <p className="category-description">{category.description}</p>
              </div>

              <div className="books-list">
                {category.books.map((book, bookIndex) => (
                  <div key={bookIndex} className="book-item">
                    <div className="book-placeholder">
                      <span className="book-icon">📚</span>
                    </div>
                    <div className="book-info">
                      <h4>{book.title}</h4>
                      <span className="status-badge">{book.status.replace('-', ' ')}</span>
                      <p>More details coming soon!</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Be the First to Know!</h2>
            <p>Sign up to get notified when books are released</p>
            <Link to="/" className="btn btn-primary btn-large">
              Join Our Mailing List
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BooksPage;
