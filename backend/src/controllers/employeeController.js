import * as EmployeeService from "../services/employeeService.js";

export const getEmployeesHandler = async (req, res, next) => {
  try {
    const response = await EmployeeService.getEmployees(req);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const createEmployeeHandler = async (req, res, next) => {
  try {
    const response = await EmployeeService.createEmployee(req);

    res.status(201).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const updateEmployeeByIdHandler = async (req, res, next) => {
  try {
    await EmployeeService.updateEmployeeById(req);

    res.status(200).json({
      status: "success",
      message: "Employee successfully updated",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteEmployeeByIdHandler = async (req, res, next) => {
  try {
    await EmployeeService.deleteEmployeeById(req);

    res.status(200).json({
      status: "success",
      message: "Employee successfully deleted",
    });
  } catch (err) {
    next(err);
  }
};
