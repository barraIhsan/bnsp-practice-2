import express from "express";
import {
  createEmployeeHandler,
  deleteEmployeeByIdHandler,
  getEmployeesHandler,
  updateEmployeeByIdHandler,
} from "../controllers/employeeController.js";

const employeeRouter = express.Router();

employeeRouter.get("/", getEmployeesHandler);
employeeRouter.post("/", createEmployeeHandler);
employeeRouter.put("/:id", updateEmployeeByIdHandler);
employeeRouter.delete("/:id", deleteEmployeeByIdHandler);

export default employeeRouter;
