import { v4 as uuidv4 } from "uuid";
import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import { employeeSchema } from "../validation/employeeValidation.js";
import validate from "../validation/validate.js";

export const getEmployees = async (req) => {
  const { search } = req.query;

  let where = "";
  let params = [];

  if (search) {
    where = `
      WHERE name LIKE ?
      OR job_title LIKE ?
      OR CAST(salary AS CHAR) LIKE ?
    `;
    const keyword = `%${search}%`;
    params = [keyword, keyword, keyword];
  }

  const [rows] = await pool.query(`SELECT * FROM employee ${where}`, params);

  return rows;
};

export const createEmployee = async (req) => {
  const validated = validate(employeeSchema, req.body);
  const { name, job_title, salary } = validated;

  const uuid = uuidv4();
  await pool.query(
    "INSERT INTO employee (id, name, job_title, salary) VALUES (?, ?, ?, ?)",
    [uuid, name, job_title, salary],
  );

  return {
    id: uuid,
    name,
    job_title,
    salary,
  };
};

export const updateEmployeeById = async (req) => {
  const validated = validate(employeeSchema, req.body);
  const { name, job_title, salary } = validated;

  const [rows] = await pool.query(
    "UPDATE employee SET name = ?, job_title = ?, salary = ? WHERE id = ?",
    [name, job_title, salary, req.params.id],
  );

  if (rows.affectedRows === 0) {
    throw new ResponseError(404, "Employee not found");
  }
};

export const deleteEmployeeById = async (req) => {
  const [rows] = await pool.query("DELETE FROM employee WHERE id = ?", [
    req.params.id,
  ]);

  if (rows.affectedRows === 0) {
    throw new ResponseError(404, "Employee not found");
  }
};
