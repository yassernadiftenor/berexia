import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store'
import * as FromReducers from "src/app/state/reducers/departement.reducer"
import {DepartementState} from "src/app/state/reducers/departement.reducer";
import * as FromReducerEmp from "src/app/state/reducers/employee.reducer";
import {EmployeeReducer, EmployeeState} from "src/app/state/reducers/employee.reducer";
import {utilisateurReducer} from "src/app/state/reducers/utilisateur.reducer";
import {utilisateurState} from "src/app/state/reducers/utilisateur.reducer"
// import {} from "";

export interface departementModuleState {

  departementManag: FromReducers.DepartementState,
  employeeManag:EmployeeState,
  utilisateurManag:utilisateurState
}

// @ts-ignore
export const reducers: ActionReducerMap<departementModuleState> = {
  departementManag: FromReducers.departementReducer,
  employeeManag:EmployeeReducer,
  utilisateurManag:utilisateurReducer
}

export const getDepartementsStateModule = createFeatureSelector<departementModuleState>('AppModule')

export const selectAllDepartments = (state: DepartementState) => Object.assign(state).departementManag.entities;


export const selectAllEmployee = (state: EmployeeState) => Object.assign(state).employeeManag.entities;
export const selectAllEmployee1 = (state: utilisateurState) => Object.assign(state).utilisateurManag.user;
export const connectedStatus = (state: utilisateurState) => Object.assign(state).utilisateurManag.connected;
