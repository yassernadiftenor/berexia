import * as UtilisateurActions from "../actions/utilisateur.actions"
import {UtilisateurActionType} from "../actions/utilisateur.actions"
import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";
import {User} from "src/app/models/user"
import * as _ from "lodash";

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
    case UtilisateurActionType.LOGIN_UTILISATEUR:{
      return {
        ...state,
        connected:true,
        entities:action.payload,
        user:action.payload,
        error:"",
      };
    }
    case UtilisateurActionType.LOGIN_UTILISATEUR_SUCESS:{
      return {
        ...state,
        connected:true,
        user:action.payload
      }
        // return _.merge({}, state, { entities:action.payload,user:action.payload});
    }
    case UtilisateurActionType.LOGIN_UTILISATEUR_FAIL:{
      return _.merge({}, state, { connected:false});

    }
    case UtilisateurActionType.LOGOUT_UTILISATEUR:{
      console.log(_.merge(state,{connected:false}))
      return _.merge(state,{connected:false})
    }
    default :{
      return state;
    }
  }
}
