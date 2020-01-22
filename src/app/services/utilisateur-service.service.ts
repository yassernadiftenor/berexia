import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurServiceService {

  username=''
  constructor(private http: HttpClient) { }
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

}
