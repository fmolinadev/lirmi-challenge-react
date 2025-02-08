export interface IDataSource<T> {
  getAll(): T[];
  add(item: T): void;
  update(id: number, updatedItem: Partial<T>): void;
  delete(id: number): void;
}
