import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DatePipe]
})
export class LoginComponent implements OnInit {
  myDate = new Date();
  tokenUser:any;
  constructor(private router:Router,private datePipe: DatePipe) {
    this.tokenUser = this.datePipe.transform(this.myDate, 'yyyyMMddhhmmss');
  }

  ngOnInit() {
  }
   authi :any ='/departement';
 createtoken(){
   this.tokenUser = this.datePipe.transform(this.myDate, 'yyyyMMddhhmmss');
 }
  authification(){
    this.router.navigate([this.authi]);
    console.log(this.tokenUser);
  }

}
