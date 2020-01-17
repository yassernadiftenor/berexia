import{Action} from "@ngrx/store";
import {Departement}from "../../departement.module";
import {Update} from "@ngrx/entity";

export enum DepartementActionType
{
  LOAD_DEPARTEMENTS = '[departement] get items',
  LOAD_DEPARTEMENTS_FAIL = '[departement] get items fail',
  LOAD_DEPARTEMENTS_SUCESS = '[departement] get items success',

  CREATE_DEPARTEMENT= '[departement] create items',
  CREATE_DEPARTEMENT_FAIL= '[departement] create items fail',
  CREATE_DEPARTEMENT_SUCESS= '[departement] create items sucess',

  UPDATE_DEPARTEMENT= '[departement] update items',
  UPDATE_DEPARTEMENT_FAIL= '[departement] update items fail',
  UPDATE_DEPARTEMENT_SUCESS= '[departement] update items sucess',

  DELETE_DEPARTEMENT= '[departement] delete items',
  DELETE_DEPARTEMENT_FAIL= '[departement] delete items fail',
  DELETE_DEPARTEMENT_SUCESS= '[departement] delete items sucess'
}

export class LoadDepartement implements Action {
  readonly type = DepartementActionType.LOAD_DEPARTEMENTS;

  constructor() {
  }
}
export class LoadDepartementFail implements Action {
  readonly type = DepartementActionType.LOAD_DEPARTEMENTS_FAIL;

  constructor(public payload: any) {
  }
}
export class LoadDepartementSucess implements Action {
  readonly type = DepartementActionType.LOAD_DEPARTEMENTS_SUCESS;

  constructor(public payload: any) {
  }
}

export class CreateDepartement implements Action {
  readonly type = DepartementActionType.CREATE_DEPARTEMENT;

  constructor(public payload: Departement) {
  }
}
export class CreateDepartementFail implements Action {
  readonly type = DepartementActionType.CREATE_DEPARTEMENT_FAIL;

  constructor(public payload: any) {
  }
}
export class CreateDepartementSucess implements Action {
  readonly type = DepartementActionType.CREATE_DEPARTEMENT_SUCESS;

  constructor(public payload: Departement) {
  }

}
export class UpdateDepartement implements Action {
  readonly type = DepartementActionType.UPDATE_DEPARTEMENT;

  constructor(public payload: Departement) {
  }
}
export class UpdateDepartementFail implements Action {
  readonly type = DepartementActionType.UPDATE_DEPARTEMENT_FAIL;

  constructor(public payload: any) {
  }
}
export class UpdateDepartementSucess implements Action {
  readonly type = DepartementActionType.UPDATE_DEPARTEMENT_SUCESS;

  constructor(public payload: Update<Departement>) {
  }
}
export class DeleteDepartement implements Action {
  readonly type = DepartementActionType.DELETE_DEPARTEMENT;

  constructor(public payload: number) {
  }
}
export class DeleteDepartementFail implements Action {
  readonly type = DepartementActionType.DELETE_DEPARTEMENT_FAIL;

  constructor(public payload: string) {
  }
}
export class DeleteDepartementSucess implements Action {
  readonly type = DepartementActionType.DELETE_DEPARTEMENT_SUCESS;

  constructor(public payload: number) {
  }
}
export type Action =
  LoadDepartement |
  LoadDepartementFail|
  LoadDepartementSucess|
  CreateDepartement|
  CreateDepartementFail|
  CreateDepartementSucess|
  UpdateDepartement|
  UpdateDepartementSucess|
  UpdateDepartementFail|
  DeleteDepartement|
  DeleteDepartementFail|
  DeleteDepartementSucess;
