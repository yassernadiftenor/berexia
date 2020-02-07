import {Component} from '@angular/core';
import {UtilisateurServiceService} from 'src/app/services/utilisateur-service.service';
import {Router} from "@angular/router";
import {selectAllEmployee1} from "./state/reducers";
import {connectedStatus} from "./state/reducers";

import {Store} from "@ngrx/store";
import * as fromState from "src/app/state";

import {TranslateService} from"@ngx-translate/core"
import {ExelService} from "./services/exel.service";
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
  isCollapsed = true;
  constructor(private translate :TranslateService,private store: Store<any>, private  utilisateurServiceService: UtilisateurServiceService, private route: Router) {
    translate.addLangs(['en', 'fr']);
  }
  ngOnInit(): void {
    if (localStorage.getItem('language')) {
      this.translate.use(localStorage.getItem('language'));
    } else {
      localStorage.setItem('language', 'en');
      this.translate.use('en');

    }
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
    return !this.connected;

  }

  checkLogin() {
    return this.utilisateurServiceService.connected;

  }
var:boolean;
  disconnect() {
    console.log("here")
    this.store.dispatch(new fromState.LogoutUtilisateur());
    this.store.select(connectedStatus).subscribe(user=>{
      this.var=user;
    })
    if(!this.var){
      localStorage.removeItem('username');
      this.utilisateurServiceService.connected = false;
      this.route.navigate(['/Login']);
    }
  }
  changeLanguage(lang) {
    if (lang === 'fr') {
      this.translate.use('fr'); localStorage.setItem('language', 'fr');
    } else {
      this.translate.use('en'); localStorage.setItem('language', 'en');

    }
  }
  MenuOpen1:boolean=false;
  MenuOpen2:boolean=false;
  MenuOpen3:boolean=false;
  nzMenuOpen1(){
    this.MenuOpen1=true;
    this.MenuOpen2=false;
    this.MenuOpen3=false;
  }
  nzMenuOpen2(){
    this.MenuOpen1=false;
    this.MenuOpen2=true;
    this.MenuOpen3=false;
  }
  nzMenuOpen3(){
    this.MenuOpen1=false;
    this.MenuOpen2=false;
    this.MenuOpen3=true;
  }
}
