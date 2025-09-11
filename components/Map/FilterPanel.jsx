import React from 'react';
import '../../styles/components/filter-panel.css';

const FILTER_TYPES = ['species', 'gear', 'environment', 'catch', 'location'];

const FilterPanel = ({ activeFilters, toggleFilter }) => {
  return (
    <div className="filter-panel">
      {FILTER_TYPES.map((type) => (
        <button
          key={type}
          className={`filter-button ${activeFilters.includes(type) ? 'active' : ''}`}
          onClick={() => toggleFilter(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default FilterPanel;
