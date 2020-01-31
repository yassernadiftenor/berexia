import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';
import { DatePipe } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilisateurServiceService} from "src/app/services/utilisateur-service.service";
import {select, Store} from "@ngrx/store";
import * as fromState from "src/app/state";
import { NzMessageService } from 'ng-zorro-antd/message';
import {Actions, ofType} from "@ngrx/effects";
import {selectAllEmployee1} from "src/app/state";
import {User} from "../../models/user";



@Component({

  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DatePipe]
})
export class LoginComponent implements OnInit {
  formular :FormGroup;
  myDate = new Date();
  loginn:any;
  pwd:any;
  bool :boolean=false;
  user:User;
  selectedDep:any[];
  tokenUser:any;
  constructor(private action$ :Actions,private message: NzMessageService,private store: Store<any> ,private router:Router,private datePipe: DatePipe,private fb :FormBuilder,private userService:UtilisateurServiceService,private route:Router) {
    this.tokenUser = this.datePipe.transform(this.myDate, 'yyyyMMddhhmmss');
  }

  ngOnInit() {
    this.store.select(selectAllEmployee1).subscribe(data => this.user=data);
    this.formular = this.fb.group({
      login: ['', Validators.required],
      pwd : ['', Validators.required]
    })
    this.action$.pipe(ofType(fromState.UtilisateurActionType.LOGIN_UTILISATEUR_FAIL)).subscribe(() => {
      this.message.create(fromState.UtilisateurActionType.LOGIN_UTILISATEUR_FAIL, `This is a message of error`);
    })
  }


  authi :any ='/departement';
  authification(){
    this.router.navigate([this.authi]);
    console.log(this.tokenUser);
  }
  // login() : boolean{
  //   this.loginn =this.formular.get('login').value;
  //   console.log(this.loginn);
  //   this.pwd=this.formular.get('pwd').value;
  //   console.log(this.pwd);
  //   this.userService.logInUser(this.loginn,this.pwd).subscribe((data:any) =>{
  //     console.log(data);
  //     this.bool=data;
  //     if(data){
  //       localStorage.setItem('username',this.loginn);
  //       this.userService.connected=false;
  //       this.userService.username=this.loginn;
  //       this.router.navigate(['/departement']);
  //
  //     }else{
  //       this.userService.connected=true;
  //       this.bool =false;
  //       this.router.navigate(['/Login']);
  //     }
  //
  //   });
  //   return this.bool;
  // }
  // checkusernameandpassword(uname: string, pwd : string)
  // {
  //   if(this.login()){
  //     localStorage.setItem('username',uname);
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }
  //

  loginStoreTest(){
    const payload = {
      login:this.formular.get('login').value,
      password: this.formular.get('pwd').value
    };
    this.store.dispatch(new fromState.LoginUtilisateur(payload));
    this.store.select(selectAllEmployee1).subscribe(data => {
      this.userService.userIn=data;
      this.userService.username=this.userService.userIn.nom;
      this.userService.function=this.userService.userIn.function;
    });

    //console.log("the user object"+this.userService.userIn);
    console.log("loginstoreTest login : "+this.userService.username);
  }
  data :any;
  login(){

    const payload = {
      login:this.formular.get('login').value,
      password: this.formular.get('pwd').value
    };
    this.store.dispatch(new fromState.LoginUtilisateur(payload));
    this.store.select(selectAllEmployee1).subscribe(data=>
      this.data=data);
    console.log("this is the return of "+this.data);
    if(this.data){
      console.log(this.data);
      localStorage.setItem('username',payload.login);
      console.log("this is the return", this.data);
      this.userService.connected=true;
      this.userService.username=this.loginn;
      this.router.navigate(['/departement']);
    }else {
      this.userService.connected=false;
      this.bool =false;
      this.router.navigate(['/Login']);
    }
  }

    // )
    // this.userService.checkusernameandpassword(this.loginn,this.pwd).subscribe(output=>{
    //   console.log(output)
    //   if(output){
    //     localStorage.setItem('username',this.loginn);
    //     console.log("this is the return", output);
    //     this.userService.connected=true;
    //     this.userService.username=this.loginn;
    //     this.router.navigate(['/departement']);
    //   }else {
    //     this.userService.connected=false;
    //   this.bool =false;
    //   this.router.navigate(['/Login']);
    // }
    // });






  // public isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token');
  //   // Check whether the token is expired and return
  //   // true or false
  //   return !this.jwtHelper.isTokenExpired(token);
  // }







  // createtoken(){
  //   this.tokenUser = this.datePipe.transform(this.myDate, 'yyyyMMddhhmmss');
  // }
}
