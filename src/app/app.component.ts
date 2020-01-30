import {Component} from '@angular/core';
import {UtilisateurServiceService} from 'src/app/services/utilisateur-service.service';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private  utilisateurServiceService: UtilisateurServiceService,private route:Router ) {
  }
  text= this.utilisateurServiceService.username;
  title = 'gestionemployee';
  connected:boolean;
  username=this.utilisateurServiceService.username;

   login() {
    this.route.navigate(['/Login']);
  }
  conect() {
     this.connected = this.utilisateurServiceService.connected;
    return !this.utilisateurServiceService.connected;

  }
  checkLogin(){
    return this.utilisateurServiceService.connected ;

  }
  disconnect(){
    localStorage.removeItem('username');
    this.utilisateurServiceService.connected=false;
    this.connected = false;
     this.route.navigate(['/home']);
  }
}
