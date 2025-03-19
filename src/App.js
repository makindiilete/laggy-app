import React, { useState, useEffect, useRef } from "react";
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";
import { generateLargeDataset } from "./utils/generateData";
import "./App.css";

/**
 * Main application component - UNOPTIMIZED VERSION
 *
 * This version demonstrates common performance issues in React applications:
 * 1. Expensive filtering operations on every render
 * 2. No memoization of components or calculations
 * 3. Multiple useState hooks that could be consolidated
 * 4. No prevention of unnecessary re-renders
 *
 * @returns {JSX.Element} Complete application UI
 */
function App() {
  // Using multiple useState hooks instead of useReducer for related state
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filterTime, setFilterTime] = useState(0);

  // Use useRef instead of state for render counting to avoid infinite loops
  const renderCount = useRef(0);
  const startTimeRef = useRef(0);

  // Load data
  useEffect(() => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      const data = generateLargeDataset();
      setUsers(data);
      setIsLoading(false);
    }, 500);
  }, []);

  // Safely increment render count without causing re-renders
  useEffect(() => {
    renderCount.current += 1;
  });

  /**
   * PERFORMANCE ISSUE #1: Expensive filtering calculation on every render
   * This filtering operation runs on EVERY render, even when searchQuery hasn't changed
   * With 10,000 items, this creates noticeable lag in the UI
   */
  startTimeRef.current = performance.now();
  const filteredResults = users.filter((user) => {
    if (!searchQuery.trim()) return true;

    // Simulate expensive operation
    let isPassing = false;
    const query = searchQuery.toLowerCase();

    // Intentionally inefficient code to highlight performance issues
    // Add artificial delay to make performance difference more obvious
    isPassing =
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.department.toLowerCase().includes(query) ||
      user.joinDate.includes(query) ||
      user.salary.toString().includes(query);

    return isPassing;
  });

  // Update filter time after render
  useEffect(() => {
    const endTime = performance.now();
    const duration = endTime - startTimeRef.current;
    setFilterTime(duration);
    console.log(`Filter operation took: ${duration.toFixed(2)}ms`);
  }, [users, searchQuery]); // Only run when users or searchQuery changes

  // Time the filtering operation to demonstrate performance impact
  const results = filteredResults;

  return (
    <div className="app">
      <header>
        <h1>User Search - Laggy Version</h1>
        <div className="metrics">
          <span>Render count: {renderCount.current}</span>
          <span>Results: {results.length}</span>
          <span>Filter time: {filterTime.toFixed(2)}ms</span>
        </div>
      </header>

      {/* PERFORMANCE ISSUE #2: New function created on every render */}
      <SearchBar query={searchQuery} onQueryChange={setSearchQuery} />

      {isLoading ? (
        <div className="loading">Loading users...</div>
      ) : (
        // PERFORMANCE ISSUE #3: No memoization causes all items to re-render
        <ResultsList results={results} />
      )}
    </div>
  );
}

export default App;
