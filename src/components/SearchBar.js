import React from "react";

/**
 * Search input component that triggers filtering on change
 * In the unoptimized version, this receives a new function reference on each render
 * causing unnecessary re-renders in child components
 *
 * @param {Object} props - Component props
 * @param {string} props.query - Current search query text
 * @param {Function} props.onQueryChange - Callback function when query changes
 * @returns {JSX.Element} Search input with icon
 */
function SearchBar({ query, onQueryChange }) {
  // This log helps demonstrate how frequently this component re-renders
  console.log("SearchBar rendering");

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search users..."
        value={query}
        // This creates a new function on every render, which is inefficient
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <div className="search-icon">🔍</div>
    </div>
  );
}

export default SearchBar;
