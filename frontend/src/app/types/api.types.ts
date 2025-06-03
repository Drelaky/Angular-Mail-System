export type ApiResponse<T, A> = {
  readonly statusCode: T;
  readonly result: A;
};
