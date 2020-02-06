import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store'
import * as FromReducers from "src/app/state/reducers/departement.reducer"
import {DepartementState} from "src/app/state/reducers/departement.reducer";
import * as FromReducerEmp from "src/app/state/reducers/employee.reducer";
import {EmployeeState} from "src/app/state/reducers/employee.reducer";
import {utilisateurReducer} from "src/app/state/reducers/utilisateur.reducer";
import {utilisateurState} from "src/app/state/reducers/utilisateur.reducer"
// import {} from "";

export interface departementModuleState {

  departementManag: FromReducers.DepartementState,
  employeeManag:FromReducerEmp.EmployeeState,
  utilisateurManag:utilisateurState
}

// @ts-ignore
export const reducers: ActionReducerMap<departementModuleState> = {
  departementManag: FromReducers.departementReducer,
  employeeManag:FromReducerEmp.EmployeeReducer,
  utilisateurManag:utilisateurReducer
}

export const getDepartementsStateModule = createFeatureSelector<departementModuleState>('AppModule')

export const SearchAllDepartements = (state: DepartementState) => Object.assign(state).departementManag.entities;
export const selectAllDepartments = (state: DepartementState) => Object.assign(state).departementManag.entities;
export const selectOneDepartments = (state: DepartementState) => Object.assign(state).departementManag.selectedDepartementId;
export const getCurrentDepartments = createSelector(
  getDepartementsStateModule,
  selectOneDepartments,
  state => Object.assign(state).departementManag.entities[state.departementManag.selectedDepartementId]
);
export const selectAllEmployee = (state: EmployeeState) => Object.assign(state).employeeManag.AllEmployee;
export const selectAllEmployee1 = (state: utilisateurState) => Object.assign(state).utilisateurManag.user;
export const connectedStatus = (state: utilisateurState) => Object.assign(state).utilisateurManag.connected;
