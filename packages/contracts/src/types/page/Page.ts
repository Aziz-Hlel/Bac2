import type { Pageable } from './Pageable';

export type Page<T> = {
  content: T[];
  pagination: Pageable;
};

export type Page2<T> = {
  data: T[];
  pagination: Pageable;
};
