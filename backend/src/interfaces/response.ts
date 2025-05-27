export interface Response<T> {
  statusCode: number;
  message?: string;
  result?: T;
}
