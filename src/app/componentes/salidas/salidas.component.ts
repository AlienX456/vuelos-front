import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SalidasservicioService } from 'src/app/servicios/salidasservicio.service'
import { Salida } from 'src/app/interfaces/salida';
import { error } from '@angular/compiler/src/util';

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

              this.exito = false;
              this.fracaso = false;
              this.valores_erroneos = false;
              
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


}
