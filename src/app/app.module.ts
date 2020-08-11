import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './componentes/log-in/log-in.component';
import { LlegadasComponent } from './componentes/llegadas/llegadas.component';
import { SalidasComponent } from './componentes/salidas/salidas.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { MenuComponent } from './componentes/menu/menu.component';

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
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
