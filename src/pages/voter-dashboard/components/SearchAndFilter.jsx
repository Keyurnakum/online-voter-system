import React, { useState } from 'react';

import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All Elections' },
    { value: 'active', label: 'Active Elections' },
    { value: 'upcoming', label: 'Upcoming Elections' },
    { value: 'completed', label: 'Completed Elections' },
    { value: 'not-voted', label: 'Not Voted' },
    { value: 'voted', label: 'Already Voted' }
  ];

  const sortOptions = [
    { value: 'deadline', label: 'By Deadline' },
    { value: 'title', label: 'By Title' },
    { value: 'date-created', label: 'By Date Created' },
    { value: 'participation', label: 'By Participation' }
  ];

  const ballotTypeOptions = [
    { value: 'all-types', label: 'All Ballot Types' },
    { value: 'federal', label: 'Federal Elections' },
    { value: 'state', label: 'State Elections' },
    { value: 'local', label: 'Local Elections' },
    { value: 'referendum', label: 'Referendums' },
    { value: 'organizational', label: 'Organizational' }
  ];

  const [sortBy, setSortBy] = useState('deadline');
  const [ballotType, setBallotType] = useState('all-types');

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    onFilter({ type: 'status', value });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onFilter({ type: 'sort', value });
  };

  const handleBallotTypeChange = (value) => {
    setBallotType(value);
    onFilter({ type: 'ballotType', value });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedFilter('all');
    setSortBy('deadline');
    setBallotType('all-types');
    onSearch('');
    onFilter({ type: 'clear' });
  };

  return (
    <div className="bg-card border civic-border rounded-lg civic-shadow-sm">
      <div className="p-4">
        {/* Search Bar */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search elections, candidates, or ballot measures..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            iconName="Filter"
            iconPosition="left"
          >
            Filters
          </Button>
        </div>

        {/* Quick Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filterOptions.slice(0, 4).map((option) => (
            <Button
              key={option.value}
              variant={selectedFilter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Expanded Filters */}
        {isFilterExpanded && (
          <div className="border-t civic-border pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Status Filter */}
              <Select
                label="Election Status"
                options={filterOptions}
                value={selectedFilter}
                onChange={handleFilterChange}
              />

              {/* Sort Options */}
              <Select
                label="Sort By"
                options={sortOptions}
                value={sortBy}
                onChange={handleSortChange}
              />

              {/* Ballot Type Filter */}
              <Select
                label="Ballot Type"
                options={ballotTypeOptions}
                value={ballotType}
                onChange={handleBallotTypeChange}
              />
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t civic-border">
              <div className="text-sm text-text-secondary font-caption">
                {searchTerm && (
                  <span>Searching for "{searchTerm}" • </span>
                )}
                Showing {selectedFilter === 'all' ? 'all' : selectedFilter} elections
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                iconName="X"
                iconPosition="left"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;