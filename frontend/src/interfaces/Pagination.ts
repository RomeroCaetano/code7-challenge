export default interface Pagination<T> {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: string | null;
  next_page: string | null;
  data: T[];
}
