import React from "react";

/**
 * Individual result item component that displays user information
 * In this unoptimized version, it re-renders unnecessarily when parent components update
 * even when its own props haven't changed
 *
 * @param {Object} props - Component props
 * @param {Object} props.user - User data object to display
 * @returns {JSX.Element} Card displaying user details
 */
function ResultItem({ user }) {
  // This log helps demonstrate how frequently each item re-renders
  // In a list of 10,000 potential items, this creates significant performance issues
  console.log(`ResultItem rendering: ${user.id}`);

  return (
    <div className="result-item">
      <div className="result-main">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
      <div className="result-details">
        <span className="department">{user.department}</span>
        <span className="salary">₦{user.salary.toLocaleString()}</span>
        <span className="join-date">Joined: {user.joinDate}</span>
      </div>
    </div>
  );
}

export default ResultItem;
