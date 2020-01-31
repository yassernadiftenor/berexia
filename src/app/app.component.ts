import {Component} from '@angular/core';
import {UtilisateurServiceService} from 'src/app/services/utilisateur-service.service';
import {Router} from "@angular/router";
import {selectAllEmployee1} from "./state/reducers";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  text = this.utilisateurServiceService.username;
  title = 'gestionemployee';
  bool: boolean;
  connected: boolean;
  username = this.utilisateurServiceService.username;
  function = this.utilisateurServiceService.function;

  constructor(private store: Store<any>, private  utilisateurServiceService: UtilisateurServiceService, private route: Router) {
  }

  Access(): boolean {
    this.store.select(selectAllEmployee1).subscribe(user => {
      if (user.function.toUpperCase() === 'ADMIN') {
        this.bool = true;
      } else {
        this.bool = false;
      }
    });
    return this.bool;
  }

  login() {
    this.route.navigate(['/Login']);
  }

  home() {
    this.route.navigate(['/home']);
  }

  conect() {
    this.connected = this.utilisateurServiceService.connected;
    return !this.utilisateurServiceService.connected;

  }

  checkLogin() {
    return this.utilisateurServiceService.connected;

  }

  disconnect() {
    localStorage.removeItem('username');
    this.utilisateurServiceService.connected = false;
    this.connected = false;
    this.route.navigate(['/Login']);
  }

}
