export interface CustomError extends Error {
    status?: number;
    address?: FormDataEntryValue | null
  }