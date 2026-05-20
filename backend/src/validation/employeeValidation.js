import z from "zod";

export const employeeSchema = z.object({
  name: z
    .string("Employee name must be a string")
    .min(1, "Employee name must not be empty")
    .max(100, "Employee name must not contain more than 100 characters"),
  job_title: z
    .string("Job Title must be a string")
    .min(1, "Job Title must not be empty")
    .max(100, "Job Title must not contain more than 100 characters"),
  salary: z
    .number("Salary must be a number")
    .int("Salary must be an integer")
    .min(0, "Salary must be at least 0"),
});
