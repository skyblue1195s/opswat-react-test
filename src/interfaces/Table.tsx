import { FilterValue, TablePaginationConfig } from "antd/lib/table/interface";

export interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
  search?: string;
  total?: number;
  field?: string;
  order?: "descend" | "ascend";
  viewResult?: boolean;
}
