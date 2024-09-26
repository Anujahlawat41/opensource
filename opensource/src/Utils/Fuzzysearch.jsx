// src/utils/fuzzySearch.js
import Fuse from 'fuse.js';

export const fuzzySearch = (data, searchTerm, keys) => {
  const fuse = new Fuse(data, { keys, threshold: 0.3 });
  return searchTerm ? fuse.search(searchTerm).map(result => result.item) : data;
};
