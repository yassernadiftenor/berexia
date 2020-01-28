import * as UtilisateurActions from "../actions/utilisateur.actions"
import {UtilisateurActionType} from "../actions/utilisateur.actions"
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {User} from "src/app/models/user"
 import * as _ from "lodash";
import {Departement} from "../../models/departement.module";
import {DepartementState} from "./departement.reducer";

export interface utilisateurState extends EntityState<any>{
  user:User
  username:string;
  connected:boolean;
  error:string;
}
export const utilisateurAdapter: EntityAdapter<any> = createEntityAdapter<any>();

export const defaultUtilisateur: utilisateurState = {
  ids: [],
  user:{},
  entities: {},
  username:"",
  connected:false,
  error:""
};
export const initialState =utilisateurAdapter.getInitialState(defaultUtilisateur);
export function utilisateurReducer(
  state=initialState,
  action :UtilisateurActions.UserAction
) :utilisateurState{
  switch (action.type) {
    case UtilisateurActionType.CREATE_UTILISATEUR_SUCESS:{
      return utilisateurAdapter.addOne(action.payload,state);
    }
    case UtilisateurActionType.CREATE_UTILISATEUR_FAIL:{
      return {
        ...state,
        entities:{},
        error:action.payload,
      };
    }
    case UtilisateurActionType.LOGIN_UTILISATEUR_SUCESS:{
      return {
        ...state,
        entities:{},
        user:{
          login:action.payload.login,
        },
        connected:true
      };
    }case UtilisateurActionType.LOGIN_UTILISATEUR:{
      return {
        ...state,
        entities:{},
        user:{
          login:action.payload.login,
        },
        connected:true
      };
    }
    case UtilisateurActionType.LOGIN_UTILISATEUR_FAIL:{
      return {
        ...state,
        entities:{},
        error:"mots de pass est incorrect",
        connected:false,
      };
    }
    default :{
      return state;
    }
  }
}
