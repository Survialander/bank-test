export interface FormValues {
  description?: string,
  amount: number,
  account_number?: string,
  code?: string,
}

export interface IFormProps {
  handleFormSubmit: (args:FormValues) => void;
}