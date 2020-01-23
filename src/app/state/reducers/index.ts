import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store'
import * as FromReducers from "src/app/state/reducers/departement.reducer"
import {DepartementState} from "src/app/state/reducers/departement.reducer";
import * as FromReducerEmp from "src/app/state/reducers/employee.reducer";
import {EmployeeState} from "src/app/state/reducers/employee.reducer";
// import {} from "";

export interface departementModuleState {

  departementManag: FromReducers.DepartementState,

}
export interface employeeModuleState {
  employeeManag:FromReducerEmp.EmployeeState,
}

// @ts-ignore
export const reducers: ActionReducerMap<departementModuleState> = {departementManag: FromReducers.departementReducer}

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
