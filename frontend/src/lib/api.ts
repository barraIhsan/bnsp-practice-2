import axios from "axios";

export interface Employee {
  id: string;
  name: string;
  job_title: string;
  salary: number;
}

export interface EmployeePayload {
  name: string;
  job_title: string;
  salary: number;
}

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getEmployees = async (): Promise<Employee[]> => {
  const res = await api.get("/employees");
  return res.data.data;
};

export const createEmployee = async (
  data: EmployeePayload,
): Promise<Employee> => {
  const res = await api.post("/employees", data);
  return res.data.data;
};

export const updateEmployee = async (
  id: string,
  data: EmployeePayload,
): Promise<Employee> => {
  const res = await api.put(`/employees/${id}`, data);
  return res.data.data;
};

export const deleteEmployee = async (id: string): Promise<Employee> => {
  const res = await api.delete(`/employees/${id}`);
  return res.data.data;
};

export default api;
