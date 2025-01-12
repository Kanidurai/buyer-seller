import React, { ReactNode, CSSProperties } from 'react';
import ToolbarProps from './toolbarProps';


export default interface DataGridProps {
  rows: any[]; 
  columns: any[];
  components?: {
    Toolbar?: React.ElementType<ToolbarProps>;
  };
  customProp?: string;
  style?: CSSProperties; 
  paginationModel?: {
      pageSize: number;
      page: number;
  };
  onPaginationModelChange?: (newPaginationModel: { pageSize: number; page: number }) => void;
  pageSizeChange?: (newPageSize: number) => void;
  pageChange?: (newPage: number) => void;
  pageSizeOptions?: number[]; 
  loader?: React.ReactNode;
  rowCount?: number;
  pageSize?: number;
  currentPage?: number; 
  paginationMeta?: any;
  paginationMode?: any;
  onSearchQueryChange?: (newQuery: string) => void;
  searchQuery?: any;
  loading?: boolean;

}