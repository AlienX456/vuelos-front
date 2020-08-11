import { Component, OnInit } from '@angular/core';
import { Estadistica } from 'src/app/interfaces/estadistica'
import { Tipostat } from 'src/app/interfaces/tipostat'
import { ObtenerEstadisticasService } from 'src/app/servicios/obtener-estadisticas.service'

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss']
})
export class EstadisticasComponent implements OnInit {

  public estadistica: Estadistica = null;
  public options;
  public selectedValue;

  constructor(public obtenerEstadisticasService:ObtenerEstadisticasService) {
    this.options = [{value:"salidas",display:"Salidas"},{value:"llegadas",display:"LLegadas"}];
   }

  ngOnInit(): void {
    (<HTMLInputElement> document.getElementById("btn-gen")).disabled = true;
  }

  obtenerEstadisticas(opcion){
    let cuerpo : Tipostat = {tipo: opcion};
    this.obtenerEstadisticasService.obtenerEstadisticas(cuerpo).subscribe(
      data => {
        this.estadistica = data;
        this.estadistica.prom_pasajero = Math.round(this.estadistica.prom_pasajero.valueOf());
      },
      error => {
        console.log(error)
      }
    )
  }

  statsHandler(){
    this.obtenerEstadisticas(this.selectedValue);
  }

  selectChangeHandler(event: any) {
    (<HTMLInputElement> document.getElementById("btn-gen")).disabled = false;
    this.selectedValue = event.target.value;
    console.log(this.selectedValue) 
  }

}
