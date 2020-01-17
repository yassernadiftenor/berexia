import {createSelector}from "@ngrx/store";
import * as fromReducer from "src/app/state/reducers";
import * as departementReducers from "src/app/state/reducers/departement.reducer";
import {departementAdapter, DepartementState} from "src/app/state/reducers/departement.reducer";



export const getDepartementState=createSelector(
  fromReducer.getDepartementsStateModule,
  (state : fromReducer.departementModuleState)=>state.departementManag);



export const  getAllDepartements=createSelector(
  getDepartementState,
  departementReducers.getAllDepartement
);


// export const getCustomers = createSelector(
//   fromReducer.getDepartementsStateModule,
//   departementAdapter.getSelectors().selectAll
// );
