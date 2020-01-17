import{Action} from "@ngrx/store";
import {Employee}from "../../employee.module";
import {Update} from "@ngrx/entity";

export enum EmployeeActionType
{
  LOAD_EMPLOYEE = '[employee] get items',
  LOAD_EMPLOYEE_FAIL = '[employee] get items fail',
  LOAD_EMPLOYEE_SUCESS = '[employee] get items success',

  CREATE_EMPLOYEE= '[employee] create items',
  CREATE_EMPLOYEE_FAIL= '[employee] create items fail',
  CREATE_EMPLOYEE_SUCESS= '[employee] create items sucess',

  UPDATE_EMPLOYEE= '[employee] update items',
  UPDATE_EMPLOYEE_FAIL= '[employee] update items fail',
  UPDATE_EMPLOYEE_SUCESS= '[employee] update items sucess',

  DELETE_EMPLOYEE= '[employee] delete items',
  DELETE_EMPLOYEE_FAIL= '[employee] delete items fail',
  DELETE_EMPLOYEE_SUCESS= '[employee] delete items sucess'
}

export class LoadEmployee implements Action {
  readonly type = EmployeeActionType.LOAD_EMPLOYEE;

  constructor() {
  }
}
export class LoadEmployeeFail implements Action {
  readonly type = EmployeeActionType.LOAD_EMPLOYEE_FAIL;

  constructor(public payload: any) {
  }
}
export class LoadEmployeeSucess implements Action {
  readonly type = EmployeeActionType.LOAD_EMPLOYEE_SUCESS;

  constructor(public payload: any) {
  }
}

export class CreateEmployee implements Action {
  readonly type = EmployeeActionType.CREATE_EMPLOYEE;

  constructor(public payload: Employee) {
  }
}
export class CreateEmployeeFail implements Action {
  readonly type = EmployeeActionType.CREATE_EMPLOYEE_FAIL;

  constructor(public payload: any) {
  }
}
export class CreateEmployeeSucess implements Action {
  readonly type = EmployeeActionType.CREATE_EMPLOYEE_SUCESS;

  constructor(public payload: Employee) {
  }

}
export class UpdateEmployee implements Action {
  readonly type = EmployeeActionType.UPDATE_EMPLOYEE;

  constructor(public payload: Employee) {
  }
}
export class UpdateEmployeeFail implements Action {
  readonly type = EmployeeActionType.UPDATE_EMPLOYEE_FAIL;

  constructor(public payload: any) {
  }
}
export class UpdateEmployeeSucess implements Action {
  readonly type = EmployeeActionType.UPDATE_EMPLOYEE_SUCESS;

  constructor(public payload: Update<Employee>) {
  }
}
export class DeleteEmployee implements Action {
  readonly type = EmployeeActionType.DELETE_EMPLOYEE;

  constructor(public payload: number) {
  }
}
export class DeleteEmployeeFail implements Action {
  readonly type = EmployeeActionType.DELETE_EMPLOYEE_FAIL;

  constructor(public payload: string) {
  }
}
export class DeleteEmployeeSucess implements Action {
  readonly type = EmployeeActionType.DELETE_EMPLOYEE_SUCESS;

  constructor(public payload: number) {
  }
}
export type Action =
  LoadEmployee |
  LoadEmployeeFail|
  LoadEmployeeSucess|
  CreateEmployee|
  CreateEmployeeFail|
  CreateEmployeeSucess|
  UpdateEmployee|
  UpdateEmployeeSucess|
  UpdateEmployeeFail|
  DeleteEmployee|
  DeleteEmployeeFail|
  DeleteEmployeeSucess;
