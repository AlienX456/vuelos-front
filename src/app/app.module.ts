import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './componentes/log-in/log-in.component';
import { LlegadasComponent } from './componentes/llegadas/llegadas.component';
import { SalidasComponent } from './componentes/salidas/salidas.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'  

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    LlegadasComponent,
    SalidasComponent,
    EstadisticasComponent,
    MenuComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
