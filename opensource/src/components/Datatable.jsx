import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { fuzzySearch } from '../Utils/Fuzzysearch';
import { Sidebar } from './Sidebar';
import { data as mockData } from '../Data';

const DataTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [columnVisibility, setColumnVisibility] = useState({});

  // Define the table columns
  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'category',
      header: 'Category',
      enableGrouping: true, // If you're enabling grouping
    },
    {
      accessorKey: 'subcategory',
      header: 'Subcategory',
      enableGrouping: true,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      filterFn: 'between', // Optional: Use for range filter
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      accessorFn: row => new Date(row.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }),
      filterFn: 'dateBetween', // Optional: Date range filter
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated At',
      accessorFn: row => new Date(row.updatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }),
    },
  ], []);

  // Apply fuzzy search filter on the data
  const filteredData = useMemo(() => fuzzySearch(mockData, searchTerm, ['name']), [searchTerm, mockData]);

  return (
    <div className="table-container">
      <input
        type="text"
        placeholder="Search by name"
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      
      <Sidebar
        toggleHideColumn={(colId) => setColumnVisibility((prev) => ({ ...prev, [colId]: !prev[colId] }))}
        visibleColumns={columns}
        groupOptions={[
          { value: 'category', label: 'Category' },
          { value: 'subcategory', label: 'Subcategory' },
        ]}
      />
      
      <MaterialReactTable
        columns={columns}
        data={filteredData}
        enableSorting
        enableColumnFilters
        enableColumnVisibility
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
        state={{ columnVisibility }}
        initialState={{
          pagination: { pageSize: 10 },
        }}
      />
    </div>
  );
};

export default DataTable;
