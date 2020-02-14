import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {catchError, map, switchMap} from "rxjs/operators";
import * as UtilisateurActions from "../actions/utilisateur.actions";
import {UtilisateurServiceService} from 'src/app/services/utilisateur-service.service';


import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import {Store} from "@ngrx/store";

@Injectable()
export class UtilisateurEffect {
  // @Effect()
  // LogIn: Observable<any> = this.actions$.pipe(
  //   ofType(UtilisateurActions.UtilisateurActionType.LOGIN_UTILISATEUR)
  // ,map((action: LoginUtilisateur) => action.payload)).pipe(
  //   switchMap(payload => {
  //     return this.utilisateurService.checkusernameandpassword(payload.email, payload.password)})).subscribe(
  //       map((user) => {
  //         console.log(user);
  //         return new LoginUtilisateurSuccess({token: user.token, email: payload.email});
  //       })
  //     ,catchError((error) => {
  //         console.log(error);
  //         return Observable.of(new LoginUtilisateurFail({ error: error }));
  //       })
  @Effect({dispatch: false})
  LogIn$: Observable<any> = this.actions$.pipe(
    ofType(UtilisateurActions.UtilisateurActionType.LOGIN_UTILISATEUR)).pipe(
    switchMap(({payload}: any) =>
      this.utilisateurService.logInUser1(payload.login, payload.password)
        .pipe(
          map(res => {
              if (res != null) {
                this.utilisateurService.userIn = res;
                this.utilisateurService.connected = true;
                console.log("this is var" + res);
                this.utilisateurService.username = payload.login;
                localStorage.setItem('username', payload.login);
                // return new UtilisateurActions.LoginUtilisateurSuccess(res);
                this.store$.dispatch(new UtilisateurActions.LoginUtilisateurSuccess(res));
                this.router.navigate(['/departement']);
              } else {
                this.utilisateurService.connected = true;
                this.store$.dispatch(new UtilisateurActions.LoginUtilisateurFail());
                this.message.create('error', `the username or password is incorrect check again`);
              }
            }
          ), catchError(error => of(new UtilisateurActions.LoginUtilisateurFail())))
    ));
  // );
  @Effect({dispatch: false})
  LogInFailure: Observable<any> = this.actions$.pipe(
    ofType(UtilisateurActions.UtilisateurActionType.LOGIN_UTILISATEUR_FAIL));
  // )).subscribe((res :any )=>{
  //   if(res){
  //     this.utilisateurService.connected=true;
  //   } else {
  //     this.utilisateurService.connected=false;
  //   }
  // });
  // @Effect({ dispatch: false })
  // LogInSuccess: Observable<any> = this.actions$.pipe(
  //   ofType( UtilisateurActions.UtilisateurActionType.LOGIN_UTILISATEUR_SUCESS),
  //   tap((user) => {
  //     console.log("the username"+user.payload.login);
  //     localStorage.setItem('username', user.payload.login);
  //     this.router.navigate(['/departement']);
  //   })

  constructor(
    private message: NzMessageService,
    private router: Router,
    private actions$: Actions,
    private store$: Store<any>,
    private utilisateurService: UtilisateurServiceService
  ) {
  }

  // @Effect({ dispatch: false })
  // Logout: Observable<any> = this.actions$.pipe(
  //   ofType( UtilisateurActions.UtilisateurActionType.LOGOUT_UTILISATEUR));


}
