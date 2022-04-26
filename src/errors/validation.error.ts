export type validationErrorValueType = {
  [type: string]: string;
};

export type validationErrorType = {
  [key: string]: validationErrorValueType;
};

export class ValidationError extends Error {
  errors: validationErrorType;

  constructor(errors: validationErrorType) {
    super('Invalid data!');
    this.errors = errors;
  }
}
