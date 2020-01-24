import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router'
import {of} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class UtilisateurServiceService {
  login =true
  result :boolean;
  username=''
  constructor(private http: HttpClient,private route:Router) { }
  getUtilisateur() {
    return this.http.get('http://localhost:4200/utilisateurs');
  }
  addUtilisateur(user: any) {
    return this.http.post('http://localhost:4200/utilisateurs/create', user);
  }
  updateUtilisateur(user: any) {
    return this.http.put('http://localhost:4200/utilisateurs/update', user);
  }
  deleteUtilisateur(id: any) {
    return this.http.delete('http://localhost:4200/utilisateurs/'+id);
  }
   logInUser(login:any ,pwd :any){
    return this.http.get('http://localhost:4200/utilisateurs/login/'+login+'/'+pwd);
  }
  connected:boolean=false;
  disconnected:boolean=false
  login1() {
    this.connected = true;
    this.route.navigate(['/Login'])
  }
  disconnect(){
    this.connected = false;
  }
  checkusernameandpassword (uname: string, pwd : string)
  {
    return this.logInUser(uname,pwd)
    //   .subscribe((data:any) => {
    //   console.log("this is data",data)
    //   if(data){
    //     this.connected = true;
    //     localStorage.setItem('username',uname);
    //     this.result = true;
    //
    //   }
    //   else{
    //     this.connected = false;
    //     this.result = false;
    //
    //   }
    // });
    // return of(this.result)
  }

}
