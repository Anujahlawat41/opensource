// src/components/Filters.js
import React from 'react';
//import Slider from 'react-slider';
//import Select from 'react-select';
//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';

export const PriceFilter = ({ priceRange, setPriceRange, minPrice, maxPrice }) => (
  <div>
    <label>Price Range</label>
    <Slider
      min={minPrice}
      max={maxPrice}
      value={priceRange}
      onChange={setPriceRange}
    />
  </div>
);

export const CategoryFilter = ({ options, setCategoryFilter }) => (
  <div>
    <label>Category</label>
    <Select
      isMulti
      options={options}
      onChange={setCategoryFilter}
    />
  </div>
);

export const DateRangeFilter = ({ dateRange, setDateRange, minDate, maxDate }) => (
  <div>
    <label>Date Range</label>
    <DatePicker
      selectsRange
      startDate={dateRange[0]}
      endDate={dateRange[1]}
      minDate={minDate}
      maxDate={maxDate}
      onChange={(update) => setDateRange(update)}
    />
  </div>
);
