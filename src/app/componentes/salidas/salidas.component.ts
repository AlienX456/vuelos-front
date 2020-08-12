import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SalidasservicioService } from 'src/app/servicios/salidasservicio.service'
import { Salida } from 'src/app/interfaces/salida';
import { error } from '@angular/compiler/src/util';
import { Rango } from 'src/app/interfaces/rango';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.scss']
})
export class SalidasComponent implements OnInit {

  salidaForm;
  exito;
  fracaso;
  valores_erroneos;
  getSalidasForm;
  fecha_invalida;
  sin_resultados;
  error_busqueda;
  salidas:Salida[];

  constructor(private formBuilder: FormBuilder,
              private salidasservicioService :SalidasservicioService,
              private reactiveFormsModule:ReactiveFormsModule ) { 

              this.salidaForm = this.formBuilder.group({
                vuelo: '',
                fecha: '',
                retraso_horas: 0,
                destino_ciudad: '',
                internacional: false,
                aerolinea: '',
                pasajeros: 0,
                avion: ''
              });

              this.getSalidasForm = this.formBuilder.group({
                fecha_inicio : '',
                fecha_final:''
              });

              this.exito = false;
              this.fracaso = false;
              this.valores_erroneos = false;
              this.fecha_invalida = false;

              this.salidas = null;

              this.sin_resultados = false;
              this.error_busqueda = false;

              
              }

  ngOnInit(): void {

  }

  onSubmit(salida) {
    
    console.log(salida);

    this.exito = false;
    this.fracaso = false;
    this.valores_erroneos = false;
    
    let current_date = new Date();

    if ( salida.retraso_horas < 0 || salida.pasajeros < 0 || (new Date(salida.fecha) > current_date)) {
      this.valores_erroneos = true;
    }else{

      let cuerpo : Salida = salida;
      this.salidasservicioService.postSalida(cuerpo).subscribe(
        data =>{
            console.log(data);
            this.exito = true;
        }
        ,
        error=>{
          console.log(error);
          this.fracaso = true;

        }
      )
    }
  }


  onSubmitFechas(fechas){

    this.fecha_invalida = false;

    let fi = new Date(fechas.fecha_inicio);

    let ff = new Date(fechas.fecha_final);

    if (fi >= ff){
      this.fecha_invalida = true
    }else{

      let param_fecha : Rango = fechas;  

      this.salidasservicioService.getSalidas(param_fecha).subscribe(
        data => { 
          if (data.length == 0){
            this.sin_resultados = true;
          }else{
            this.salidas = data;
          }
        },
        error => {this.error_busqueda = true}
      );

    }

  }


}
