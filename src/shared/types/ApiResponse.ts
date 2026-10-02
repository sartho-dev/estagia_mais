export type ApiResponse<T = any> = {
  status: "success" | "error";
  data?: T;
  message?: string;
};

export type CreateStudentResponse = {
  id: string;
  email: string;
  name: string;
  birthDate: string;
};
