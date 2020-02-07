import * as EmployeeActions from "../actions/employee.actions"
import {EmployeeActionType} from "../actions/employee.actions"
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Employee} from "../../models/employee.module";
import * as _ from "lodash";

export interface EmployeeState extends EntityState<Employee>{


  AllEmployee:any;
  loaded:boolean;
  loading:boolean;
  error:string;

}


export const employeeAdapter: EntityAdapter<Employee> = createEntityAdapter<Employee>();
export const defaultEmployee: EmployeeState = {
  ids: [],
  entities: {},

  AllEmployee:null,
  loaded:false,
  loading:false,
  error:""
};



export const initialState = employeeAdapter.getInitialState(defaultEmployee);
export function EmployeeReducer(
  state=initialState,
  action:EmployeeActions.EmpAction
):EmployeeState {
  switch (action.type) {
    case EmployeeActions.EmployeeActionType.LOAD_EMPLOYEE:{
      return {
        ...state,
        loading:true
      };
    }
    case EmployeeActionType.LOAD_EMPLOYEE_SUCESS:{
      return{
        ...state,
        loading:false,
        loaded:true,
        ids:_.map(action.payload,e=>e.idEmploye),
        entities:action.payload
      };
    }
    case EmployeeActionType.LOAD_EMPLOYEE_FAIL:{
      return {
        ...state,
        loaded:false,
        loading:false
      };
    }
    case EmployeeActionType.CREATE_EMPLOYEE_SUCESS: {
     return employeeAdapter.addOne(action.payload,state);
    }
    case EmployeeActionType.CREATE_EMPLOYEE_FAIL:{
      return {
        ...state,
        entities:{},
        loading:false,
        loaded:false,
        error:action.payload
      }
    }
    //UPDATE DEPARTEMENT
    case EmployeeActionType.UPDATE_EMPLOYEE_SUCESS: {
      return employeeAdapter.updateOne(action.payload,state)
    }
    case EmployeeActionType.UPDATE_EMPLOYEE_FAIL:{
      return {
        ...state,
        entities:{},
        loading:false,
        loaded:false,
        error:action.payload
      };
    }
    //DELETE DEPARTEMENT
    case EmployeeActionType.DELETE_EMPLOYEE_SUCESS:{
      return employeeAdapter.removeOne(action.payload,state);
    }
    case EmployeeActionType.DELETE_EMPLOYEE_FAIL:{
      return {
        ...state,
        entities:{},
        loading:false,
        loaded:false,
        error:action.payload
      };
    }
    default:{return state;}
  }
}



export const getAllEmployee=(state :EmployeeState)=>state.AllEmployee;
export const getLoadingSate=(state :EmployeeState)=>state.loading;
