import { Component } from '@angular/core';
import {UtilisateurServiceService} from 'src/app/services/utilisateur-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private  utilisateurServiceService:UtilisateurServiceService) {}
  title = 'gestionemployee';

}
