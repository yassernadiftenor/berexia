import {Injectable, Optional} from "@angular/core";
import {Actions,Effect,ofType} from "@ngrx/effects";
import {map, mergeMap, catchError, switchMap, tap} from "rxjs/operators";
import * as UtilisateurActions from "../actions/utilisateur.actions";
import {UtilisateurServiceService} from 'src/app/services/utilisateur-service.service';


import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {ifTrue} from "codelyzer/util/function";

@Injectable()
export class UtilisateurEffect {
  constructor(
    private router:Router,
    private actions$: Actions,
    private utilisateurService: UtilisateurServiceService
  ) {}
  // @Effect()
  // LogIn: Observable<any> = this.actions.pipe(
  //   ofType(UtilisateurActions.UtilisateurActionType.LOGIN_UTILISATEUR)
  // ).map((action: LoginUtilisateur) => action.payload)
  //   .switchMap(payload => {
  //     return this.utilisateurService.checkusernameandpassword(payload.email, payload.password)
  //       .map((user) => {
  //         console.log(user);
  //         return new LoginUtilisateurSuccess({token: user.token, email: payload.email});
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         return Observable.of(new LoginUtilisateurFail({ error: error }));
  //       });
  //   });
  var1:any;
  @Effect()
  LogIn$=this.actions$.pipe(ofType(
    UtilisateurActions.UtilisateurActionType.LOGIN_UTILISATEUR
  )).pipe(
    switchMap(({payload}:any)=>
      this.utilisateurService.logInUser(payload.login,payload.password)
        .pipe(
          mergeMap((content)=>of (new UtilisateurActions.LoginUtilisateurSuccess(content))),
          catchError(error =>of(new UtilisateurActions.LoginUtilisateurFail(error)))
      )));
  // )).subscribe((res :any )=>{
  //   if(res){
  //     this.utilisateurService.connected=true;
  //   } else {
  //     this.utilisateurService.connected=false;
  //   }
  // });
  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions$.pipe(
    ofType( UtilisateurActions.UtilisateurActionType.LOGIN_UTILISATEUR_SUCESS),
    tap((user) => {
      this.utilisateurService.connected=true;
      console.log("the username"+user.payload.login);
      localStorage.setItem('username', user.payload.login);
      this.router.navigate(['/departement']);
    })
  );
  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions$.pipe(
    ofType( UtilisateurActions.UtilisateurActionType.LOGIN_UTILISATEUR_FAIL));
}
