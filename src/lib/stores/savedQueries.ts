// Re-export Convex saved queries as the main store
export { 
  unifiedSavedQueriesStore as savedQueriesStore,
  saveQuery,
  deleteQuery,
  updateQuery 
} from './unifiedSavedQueries';