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

  title = 'gestionemployee';
  connected:boolean;

   login() {
    this.route.navigate(['/Login']);
  }
  conect(){
    if(this.utilisateurServiceService.connected){
      return  true;
    }else{
      return false;
    }
  }
  disconnect(){
    this.utilisateurServiceService.connected=true;
     this.route.navigate(['/home']);
  }
}
