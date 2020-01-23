import * as DepartementActions from "../actions/departement.actions"
import {DepartementActionType} from "../actions/departement.actions"
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {Employee} from "../../employee.module";
import * as _ from "lodash";

export interface DepartementState extends EntityState<Employee>{
  selectedDepartementId: number | null;
  AllDepartement:any;
  loaded:boolean;
  loading:boolean;
  error:string;

}


export const departementAdapter: EntityAdapter<Employee> = createEntityAdapter<Employee>();
export const defaultDepartement: DepartementState = {
  ids: [],
  entities: {},
  selectedDepartementId: null,
  AllDepartement:null,
  loaded:false,
  loading:false,
  error:""
};



export const initialState = departementAdapter.getInitialState(defaultDepartement);
export function departementReducer(
  state=initialState,
  action:DepartementActions.Action
):DepartementState {
  switch (action.type) {
    case DepartementActions.DepartementActionType.LOAD_DEPARTEMENTS:{
      return {
        ...state,
        loading:true
      };
    }
    case DepartementActionType.LOAD_DEPARTEMENTS_SUCESS:{
      return {
        ...state,
        loading:false,
        loaded:true,
        ids:_.map(action.payload,e=>e.idDepart),
        entities:action.payload,

      };
    }
    case DepartementActionType.LOAD_DEPARTEMENTS_FAIL:{
      return {
        ...state,
        loaded:false,
        loading:false
      };
    }
    // case DepartementActionType.CREATE_DEPARTEMENT: {
    //   return _.merge(({},))
    // }
    case DepartementActionType.CREATE_DEPARTEMENT_FAIL:{
      return {
        ...state,
        entities:{},
        loading:false,
        loaded:false,
        error:action.payload
      }
    }
    //UPDATE DEPARTEMENT
    case DepartementActionType.UPDATE_DEPARTEMENT_SUCESS: {
      // @ts-ignore
      return departementAdapter.updateOne(action.payload,state)
    }
    case DepartementActionType.UPDATE_DEPARTEMENT_FAIL:{
      return {
        ...state,
        entities:{},
        loading:false,
        loaded:false,
        error:action.payload
      };
    }
    //DELETE DEPARTEMENT
    case DepartementActionType.DELETE_DEPARTEMENT_SUCESS:{
      return departementAdapter.removeOne(action.payload,state);
    }
    case DepartementActionType.DELETE_DEPARTEMENT_FAIL:{
      return {
        ...state,
        entities:{},
        loading:false,
        loaded:false,
        error:action.payload
      };
    }
    case DepartementActionType.SEARCH_DEPARTEMENT_SUCESS:{
      return _.merge({}, state, { SearchDepartementSucess: true });
    }
    case DepartementActionType.SEARCH_DEPARTEMENT:{
      return {
        ...state,
        entities:{},
        loading:true,
        loaded:false
      }
    }
    case DepartementActionType.SEARCH_DEPARTEMENT_FAIL:{
      return _.merge({}, state, { SearchDepartementSucess: false });
    }
    default:{return state;}
  }
}



export const getAllDepartement=(state :DepartementState)=>state.entities;
export const getLoadingSate=(state :DepartementState)=>state.loading;
