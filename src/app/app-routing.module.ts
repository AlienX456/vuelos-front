import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './componentes/log-in/log-in.component';
import { LlegadasComponent } from './componentes/llegadas/llegadas.component';
import { SalidasComponent } from './componentes/salidas/salidas.component';
import { EstadisticasComponent } from './componentes/estadisticas/estadisticas.component';
import { MenuComponent } from './componentes/menu/menu.component';

const routes: Routes = [
  {
    path:'',
    component: MenuComponent
  },
  {
    path:'salidas',
    component: SalidasComponent
  },
  {
    path:'llegadas',
    component: LlegadasComponent
  },
  {
    path:'stats',
    component: EstadisticasComponent
  },
  {
    path:'log-in',
    component: LogInComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
