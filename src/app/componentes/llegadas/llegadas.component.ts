import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Llegada } from 'src/app/interfaces/llegada';
import { LlegadasservicioService} from 'src/app/servicios/llegadasservicio.service'
import { Rango } from 'src/app/interfaces/rango';

@Component({
  selector: 'app-llegadas',
  templateUrl: './llegadas.component.html',
  styleUrls: ['./llegadas.component.scss']
})
export class LlegadasComponent implements OnInit {

  llegadaForm;
  exito;
  fracaso;
  valores_erroneos;
  getLlegadasForm;
  fecha_invalida;
  sin_resultados;
  error_busqueda;
  llegadas:Llegada[];


  constructor(private formBuilder: FormBuilder,
              private llegadasservicioService:LlegadasservicioService,
              private reactiveFormsModule:ReactiveFormsModule) { 

              this.llegadaForm = this.formBuilder.group({
                vuelo: '',
                fecha: '',
                retraso_horas: 0,
                origen_ciudad: '',
                internacional: false,
                aerolinea: '',
                pasajeros: 0,
                avion: '',
                escala: false
              });

              this.getLlegadasForm = this.formBuilder.group({
                fecha_inicio : '',
                fecha_final:''
              });

              this.exito = false;
              this.fracaso = false;
              this.valores_erroneos = false;
              this.fecha_invalida = false;

              this.llegadas = null;

              this.sin_resultados = false;
              this.error_busqueda = false;


              }

  ngOnInit(): void {
  }

  onSubmit(llegada) {

    this.exito = false;
    this.fracaso = false;
    this.valores_erroneos = false;
    
    let current_date = new Date();

    if ( llegada.retraso_horas < 0 || llegada.pasajeros < 0 || (new Date(llegada.fecha) > current_date)) {
      this.valores_erroneos = true;
    }else{

      let cuerpo : Llegada = llegada;
      this.llegadasservicioService.postLlegada(cuerpo).subscribe(
        data =>{
            this.exito = true;
        },
        error=>{
          this.fracaso = true;

        }
      )
    }
  }


  onSubmitFechas(fechas){

    this.fecha_invalida = false;
    this.sin_resultados = false;
    this.error_busqueda = false;

    if (fechas.fecha_inicio == "" || fechas.fecha_final == ""){
      this.fecha_invalida = true;
    }else{

      let fi = new Date(fechas.fecha_inicio);

      let ff = new Date(fechas.fecha_final);
  
      if (fi >= ff){
        this.fecha_invalida = true
      }else{
  
        let param_fecha : Rango = fechas;  
  
        this.llegadasservicioService.getLlegadas(param_fecha).subscribe(
          data => {
            if (data.length == 0){
              this.sin_resultados = true;
            }else{
              this.llegadas= data;
            }
          },
          error => {this.error_busqueda = true}
        );
  
      }

    }

  }

}
