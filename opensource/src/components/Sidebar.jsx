// src/components/Sidebar.js
import React from 'react';
//import Select from 'react-select';

export const Sidebar = ({ toggleGroupBy, toggleHideColumn, visibleColumns, groupOptions }) => {
  return (
    <div className="sidebar">
      <h3>Group By</h3>
      <Select
        options={groupOptions}
        onChange={selected => toggleGroupBy(selected.value)}
      />

      <h3>Toggle Columns</h3>
      {visibleColumns.map(col => (
        <label key={col.accessor}>
          <input
            type="checkbox"
            checked={!col.isHidden}
            onChange={() => toggleHideColumn(col.accessor)}
          />
          {col.Header}
        </label>
      ))}
    </div>
  );
};
