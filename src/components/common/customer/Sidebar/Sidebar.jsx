import React from "react";
import './Sidebar.css';

function Sidebar({ genres }) {
  return (
    <aside className="product-page-sidebar">
      <div className="filter-clear-options">
        <p className="sidebar-filter-option">Filters</p>
        <p className="sidebar-clear-option text-underline">Clear</p>
      </div>

      <div className="price-slider">
        <p>Price</p>
        <div className="price-input">
          <div className="field">
            <span>Min</span>
            <input
              type="number"
              className="input-min"
              max="10000"
            />
          </div>
          <div className="separator">-</div>
          <div className="field">
            <span>Max</span>
            <input
              type="number"
              className="input-max"
              max="10000"
            />
          </div>
        </div>
        <div className="slider">
          <div className="progress"></div>
        </div>
        <div className="range-input">
          <input
            type="range"
            className="range-min"
            min="0"
            max="1200"
            step="50"
          />
          <input
            type="range"
            className="range-max"
            min="0"
            max="1200"
            step="50"
          />
        </div>
      </div>

      <div className="product-category">
        <p>Category</p>
        {genres.map((genre) => (
          <div className="checkbox-item" key={genre.id}>
            <input
              id={`${genre.name}-checkbox`}
              type="checkbox"
            />
            <label htmlFor={`${genre.name}-checkbox`}>{genre.name}</label>
          </div>
        ))}
      </div>

      <div className="product-page-rating-radio">
        <p>Rating</p>
        <div className="rating-items">
          <input
            type="radio"
            id="4-stars-or-above"
            name="rating"
            value="4-stars-or-above"
          />
          <label htmlFor="4-stars-or-above">4 stars or above</label>
        </div>
        <div className="rating-items">
          <input
            type="radio"
            id="3-stars-or-above"
            name="rating"
            value="3-stars-or-above"
          />
          <label htmlFor="3-stars-or-above">3 stars or above</label>
        </div>
        <div className="rating-items">
          <input
            type="radio"
            id="2-stars-or-above"
            name="rating"
            value="2-stars-or-above"
          />
          <label htmlFor="2-stars-or-above">2 stars or above</label>
        </div>
        <div className="rating-items">
          <input
            type="radio"
            id="1-stars-or-above"
            name="rating"
            value="1-stars-or-above"
            defaultChecked
          />
          <label htmlFor="1-stars-or-above">1 star or above</label>
        </div>
      </div>

      <div className="product-page-sortby-radio">
        <p>Sort By</p>
        <div className="sortby-items">
          <input
            type="radio"
            id="price-low-to-high"
            name="sort-by"
            value="price-low-to-high"
          />
          <label htmlFor="price-low-to-high">Price - Low to High</label>
        </div>
        <div className="sortby-items">
          <input
            type="radio"
            id="price-high-to-low"
            name="sort-by"
            value="price-high-to-low"
          />
          <label htmlFor="price-high-to-low">Price - High to Low</label>
        </div>
      </div>

      <div className="additional-filters">
        <p>Additional filters</p>
        <div>
          <input
            id="out-of-stock-checkbox"
            value=""
            type="checkbox"
          />
          <label htmlFor="out-of-stock-checkbox">
            Include out of stock products
          </label>
        </div>
        <div>
          <input
            id="fast-delivery-available-checkbox"
            value=""
            type="checkbox"
          />
          <label htmlFor="fast-delivery-available-checkbox">
            Fast delivery only
          </label>
        </div>
      </div>
    </aside>
  );
}

export { Sidebar };
