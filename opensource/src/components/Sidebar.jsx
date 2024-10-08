import React from 'react';
import Select from 'react-select';  // Ensure this is uncommented

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
        <label key={col.accessorKey || col.id}>
          <input
            type="checkbox"
            checked={!col.isHidden}
            onChange={() => toggleHideColumn(col.accessorKey || col.id)}
          />
          {col.header || col.Header}
        </label>
      ))}
    </div>
  );
};
