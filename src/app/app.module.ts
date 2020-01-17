import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {GestionEmplyeeComponent} from './components/gestion-emplyee/gestion-emplyee.component';
import {AccordionModule} from 'primeng/accordion';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule, NZ_I18N, en_US} from 'ng-zorro-antd';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GestiondepartementComponent} from './components/gestiondepartement/gestiondepartement.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {EffectsModule} from "@ngrx/effects"
import {departementReducer} from "src/app/state/reducers/departement.reducer"
import {DepartementEffect} from "src/app/state/effects/departement.effects"
import {reducers} from "./state/reducers";
import {effects} from "./state/effects";
@NgModule({
  declarations: [
    AppComponent,
    GestionEmplyeeComponent,
    GestiondepartementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AccordionModule,
    PanelModule,
    ButtonModule,
    RadioButtonModule,
    HttpClientModule,
    NgZorroAntdModule,
    TableModule,

    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'employees', component: GestionEmplyeeComponent},
      {path: 'departements', component: GestiondepartementComponent}

    ]),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({ maxAge: 25 })
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
