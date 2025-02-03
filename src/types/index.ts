export type Patient = {
  id?: number;
  name: string;
  email_address: string;
  phone_number: string;
  document_image: string;
};

export type ApiErrorElement = {
  message: string;
  source: string;
};

export class ApiError extends Error {
  status: number;
  errors?: ApiErrorElement[];
  constructor(message: string, status: number, errors?: ApiErrorElement[]) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}
