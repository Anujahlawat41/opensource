// src/components/DataTable.js
import React, { useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import { useTable, useSortBy, useGroupBy, useFilters, usePagination, useColumnVisibility } from '@tanstack/react-table';
import { fuzzySearch } from '../Utils/Fuzzysearch';
import { PriceFilter, CategoryFilter, DateRangeFilter } from './Filters';
import { Sidebar } from './Sidebar';
import { data as mockData } from '../Data';

const DataTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [dateRange, setDateRange] = useState([null, null]);

  const columns = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'category',
      header: 'Category',
      enableGrouping: true,
    },
    {
      accessorKey: 'subcategory',
      header: 'Subcategory',
      enableGrouping: true,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      filterFn: 'between', // Range filter for price
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      accessorFn: row => new Date(row.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }),
      filterFn: 'dateBetween', // Date range filter
    },
    {
      accessorKey: 'updatedAt',
      header: 'Updated At',
      accessorFn: row => new Date(row.updatedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }),
    },
  ], []);

  const data = fuzzySearch(mockData, searchTerm, ['name']);

  const table = useTable({ data, columns }, useSortBy, useFilters, useGroupBy, usePagination, useColumnVisibility);

  return (
    <div className="table-container">
      <input type="text" placeholder="Search by name" onChange={e => setSearchTerm(e.target.value)} />
      <Sidebar
        toggleGroupBy={table.toggleGroupBy}
        toggleHideColumn={table.toggleHideColumn}
        visibleColumns={table.allColumns}
        groupOptions={[{ value: 'category', label: 'Category' }, { value: 'subcategory', label: 'Subcategory' }]}
      />
      <MaterialReactTable
        columns={table.columns}
        data={table.rows}
        enableSorting
        enableColumnFilters
        enableColumnVisibility
        pagination={{
          pageSize: 10,
          onPageChange: table.setPageIndex,
          onPageSizeChange: table.setPageSize,
        }}
      />
    </div>
  );
};

export default Datatable;
