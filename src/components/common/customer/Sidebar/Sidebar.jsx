import React, { useState } from "react";
import "./Sidebar.css";

function Sidebar({ genres, onGenreChange, onPriceChange, onSortChange }) {
    const [minPriceRange, setMinPriceRange] = useState(0);
    const [maxPriceRange, setMaxPriceRange] = useState(5000000);

    const handleMinPriceChange = (value) => {
        setMinPriceRange(value);
        onPriceChange(value, maxPriceRange);
    };

    const handleMaxPriceChange = (value) => {
        setMaxPriceRange(value);
        onPriceChange(minPriceRange, value);
    };

    const handleSortOptionChange = (event) => {
        onSortChange(event.target.value); 
    };

    return (
        <aside className="product-page-sidebar">
            <div className="filter-clear-options">
                <p className="sidebar-filter-option">Filters</p>
            </div>

            <div className="price-slider">
                <p>Price</p>
                <div className="price-input">
                    <div className="field">
                        <span>Min</span>
                        <input
                            onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                            type="number"
                            className="input-min"
                            value={minPriceRange}
                            max="100000"
                        />
                    </div>
                    <div className="separator">-</div>
                    <div className="field">
                        <span>Max</span>
                        <input
                            onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                            type="number"
                            className="input-max"
                            value={maxPriceRange}
                            max="5000000"
                        />
                    </div>
                </div>
                <div className="slider">
                    <div
                        className="progress"
                        style={{
                            left: (minPriceRange / 500000) * 100 + "%",
                            right: 100 - (maxPriceRange / 5000000) * 100 + "%",
                        }}
                    ></div>
                </div>
                <div className="range-input">
                    <input
                        onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                        type="range"
                        className="range-min"
                        min="0"
                        max="250000"
                        value={minPriceRange}
                        step="500"
                    />
                    <input
                        onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                        type="range"
                        className="range-max"
                        min="0"
                        max="5000000"
                        value={maxPriceRange}
                        step="500"
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
                            onChange={() => onGenreChange(genre._id)}
                        />
                        <label htmlFor={`${genre.name}-checkbox`}>{genre.name}</label>
                    </div>
                ))}
            </div>

            <div className="product-page-sortby-radio">
                <p>Sort By</p>
                <div className="sortby-items">
                    <input
                        type="radio"
                        id="price-low-to-high"
                        name="sort-by"
                        value="price-low-to-high"
                        onChange={handleSortOptionChange}
                    />
                    <label htmlFor="price-low-to-high">Price - Low to High</label>
                </div>
                <div className="sortby-items">
                    <input
                        type="radio"
                        id="price-high-to-low"
                        name="sort-by"
                        value="price-high-to-low"
                        onChange={handleSortOptionChange}
                    />
                    <label htmlFor="price-high-to-low">Price - High to Low</label>
                </div>
                <div className="sortby-items">
                    <input
                        type="radio"
                        id="top-sellers"
                        name="sort-by"
                        value="top-sellers"
                        onChange={handleSortOptionChange}
                    />
                    <label htmlFor="top-sellers">Top-Sellers</label>
                </div>
            </div>
        </aside>
    );
}

export { Sidebar };
