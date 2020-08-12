import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SalidasservicioService } from 'src/app/servicios/salidasservicio.service'

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.scss']
})
export class SalidasComponent implements OnInit {

  salidaForm;

  constructor(private formBuilder: FormBuilder,
              private salidasservicioService :SalidasservicioService,
              private reactiveFormsModule:ReactiveFormsModule ) { 

              this.salidaForm = this.formBuilder.group({
                vuelo: '',
                fecha: '',
                retraso_horas: 0,
                destino_ciudad: '',
                internacional: '',
                aerolinea: '',
                pasajeros: 0,
                avion: ''
              });

              
              }

  ngOnInit(): void {

  }

  onSubmit(salida) {
    console.log('something')
  }

}
