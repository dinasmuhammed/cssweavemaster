import React from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  // Here you would typically fetch search results based on the query
  // For now, we'll just display the search query

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for: {query}</h1>
      <p>Implement your search functionality here.</p>
    </div>
  );
};

export default Search;