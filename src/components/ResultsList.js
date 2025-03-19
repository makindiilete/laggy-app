import React from "react";
import ResultItem from "./ResultItem";

/**
 * Component that renders the list of filtered results
 * In the unoptimized version, this re-renders completely on every state change
 * and forces all child ResultItems to re-render as well
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.results - Filtered user results to display
 * @returns {JSX.Element} List of result items or no results message
 */
function ResultsList({ results }) {
  // This log demonstrates how the entire list re-renders on any state change
  console.log(`ResultsList rendering with ${results.length} items`);

  if (results.length === 0) {
    return <div className="no-results">No results found</div>;
  }

  return (
    <div className="results-list">
      {/* Each ResultItem will re-render every time the parent re-renders */}
      {results.map((user) => (
        <ResultItem key={user.id} user={user} />
      ))}
    </div>
  );
}

export default ResultsList;
