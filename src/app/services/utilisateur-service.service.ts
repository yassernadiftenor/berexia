import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class UtilisateurServiceService {
  login =true
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
  connected:boolean=true
  disconnected:boolean=false
  login1() {
    this.connected = true;
    this.route.navigate(['/Login'])
  }
  disconnect(){
    this.connected = false;
  }
}
