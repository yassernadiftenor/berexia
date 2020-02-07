import {Injectable, Optional} from "@angular/core";
import {Actions,Effect,ofType} from "@ngrx/effects";
import {map, mergeMap, catchError, switchMap, tap} from "rxjs/operators";
import * as UtilisateurActions from "../actions/utilisateur.actions";
import {UtilisateurServiceService} from 'src/app/services/utilisateur-service.service';


import {Observable, of} from "rxjs";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd/message";
import * as fromState from "../index";

@Injectable()
export class UtilisateurEffect {
  constructor(
    private message: NzMessageService,
    private router:Router,
    private actions$: Actions,
    private utilisateurService: UtilisateurServiceService
  ) {}
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
  //   );
  var1:any;
  @Effect()
  LogIn$=this.actions$.pipe(ofType(
    UtilisateurActions.UtilisateurActionType.LOGIN_UTILISATEUR
  )).pipe(
    switchMap(({payload}:any)=>
      this.utilisateurService.logInUser1(payload.login,payload.password)
        .pipe(map(res=>{
          if(res!=null){
            this.utilisateurService.userIn=res;
            this.var1=res;
            this.utilisateurService.connected=true;
            console.log("this is var"+this.var1);
            this.utilisateurService.username=payload.login;
            localStorage.setItem('username',payload.login);
            this.router.navigate(['/departement']);
          }else{
            this.message.create(fromState.UtilisateurActionType.LOGIN_UTILISATEUR_FAIL, `the username or password is incorrect check again`);
          }
          this.var1=res;
          console.log("this is var"+this.var1);
        }),catchError(error =>of(new UtilisateurActions.LoginUtilisateurFail(error))) )
        .pipe(
          mergeMap((content)=>of (new UtilisateurActions.LoginUtilisateurSuccess(this.var1))),
          catchError(error =>of(new UtilisateurActions.LoginUtilisateurFail(error)))
      )));
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
  // );
  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions$.pipe(
    ofType( UtilisateurActions.UtilisateurActionType.LOGIN_UTILISATEUR_FAIL));

  // @Effect({ dispatch: false })
  // Logout: Observable<any> = this.actions$.pipe(
  //   ofType( UtilisateurActions.UtilisateurActionType.LOGOUT_UTILISATEUR));


}
