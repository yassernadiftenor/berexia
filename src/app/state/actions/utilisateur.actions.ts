import{Action} from "@ngrx/store";
import {Update} from "@ngrx/entity";
export enum UtilisateurActionType {

  CREATE_UTILISATEUR= '[utilisateur] create items',
  CREATE_UTILISATEUR_FAIL= '[utilisateur] create items fail',
  CREATE_UTILISATEUR_SUCESS= '[utilisateur] create items sucess',


  LOGIN_UTILISATEUR= '[utilisateur] login items',
  LOGIN_UTILISATEUR_FAIL= '[utilisateur] login items fail',
  LOGIN_UTILISATEUR_SUCESS= '[utilisateur] login items sucess',
}
export class CreateUtilisateur implements Action {
  readonly type = UtilisateurActionType.CREATE_UTILISATEUR;

  constructor(public payload: any) {
  }
}
export class CreateUtilisateurSuccess implements Action {
  readonly type = UtilisateurActionType.CREATE_UTILISATEUR_SUCESS;

  constructor(public payload: any) {
  }
}
export class CreateUtilisateurFail implements Action {
  readonly type = UtilisateurActionType.CREATE_UTILISATEUR_FAIL;

  constructor(public payload: any) {
  }
}
export class LoginUtilisateur implements Action {
  readonly type = UtilisateurActionType.LOGIN_UTILISATEUR;

  constructor(public payload: any) {
  }
}
export class LoginUtilisateurSuccess implements Action {
  readonly type = UtilisateurActionType.LOGIN_UTILISATEUR_SUCESS;

  constructor(public payload: any) {
  }
}
export class LoginUtilisateurFail implements Action {
  readonly type = UtilisateurActionType.LOGIN_UTILISATEUR_FAIL;

  constructor(public payload: any) {
  }
}
export type UserAction =
  CreateUtilisateur|
  CreateUtilisateurSuccess|
  CreateUtilisateurFail|
  LoginUtilisateur|
  LoginUtilisateurSuccess|
  LoginUtilisateurFail;
