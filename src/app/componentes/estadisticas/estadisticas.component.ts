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

  public estadistica: Estadistica;

  constructor(public obtenerEstadisticasService:ObtenerEstadisticasService) { }

  ngOnInit(): void {
    
  }

  obtenerEstadisticas(opcion){
    const cuerpo : Tipostat = {tipo:opcion} 
    this.obtenerEstadisticasService.obtenerEstadisticas(opcion).subscribe(
      data => {
        this.estadistica = data;
      },
      error => {
        alert(error)
      }
    )
  }

}
