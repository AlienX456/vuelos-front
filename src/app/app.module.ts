import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { LogInComponent } from './componentes/log-in/log-in.component';
import { LlegadasComponent } from './componentes/llegadas/llegadas.component';
import { SalidasComponent } from './componentes/salidas/salidas.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogInComponent,
    LlegadasComponent,
    SalidasComponent,
    EstadisticasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
