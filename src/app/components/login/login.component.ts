import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';
import { DatePipe } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilisateurServiceService} from "src/app/services/utilisateur-service.service";
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
  selectedDep:any[];
  tokenUser:any;
  constructor(private router:Router,private datePipe: DatePipe,private fb :FormBuilder,private userService:UtilisateurServiceService) {
    this.tokenUser = this.datePipe.transform(this.myDate, 'yyyyMMddhhmmss');
  }

  ngOnInit() {
    this.formular = this.fb.group({
      login: ['', Validators.required],
      pwd : ['', Validators.required]
    })

  }


  authi :any ='/departement';
  authification(){
    this.router.navigate([this.authi]);
    console.log(this.tokenUser);
  }
  login() : boolean{
    this.loginn =this.formular.get('login').value;
    console.log(this.loginn);
    this.pwd=this.formular.get('pwd').value;
    console.log(this.pwd);
    this.userService.logInUser(this.loginn,this.pwd).subscribe((data:any) =>{
      console.log(data);
      this.bool=data;
      if(data){
        this.userService.username=this.loginn;
        this.router.navigate(['/departement']);

      }else{
        this.bool =false;
        this.router.navigate(['/Login']);
      }

    });
    return this.bool;
  }
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
