import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';

import {Rango} from 'src/app/interfaces/rango'

import { LlegadasservicioService } from './llegadasservicio.service';
import { Llegada } from '../interfaces/llegada';

describe('LlegadasservicioService', () => {

  let httpTestingController: HttpTestingController;
  let service: LlegadasservicioService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [LlegadasservicioService]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(LlegadasservicioService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  it('El objeto observable en GET debe retornar los valores correctos',()=>{
    const mockLlegada = [{
      vuelo: "AV244",
      fecha: "2020-08-04T20:20:10.000Z",
      retraso_horas: 5,
      origen_ciudad: "Toronto",
      internacional: true,
      aerolinea: "Air Canada",
      pasajeros: 100,
      avion: "787-7",
      escala: false
  },
  {
      vuelo: "AV270",
      fecha: "2020-08-04T20:20:10.000Z",
      retraso_horas: 5,
      origen_ciudad: "Toronto",
      internacional: true,
      aerolinea: "Air Canada",
      pasajeros: 100,
      avion: "787-7",
      escala: false
  }]

    const fecha : Rango = {fecha_inicio: new Date("2020-08-04"), fecha_final: new Date("2020-08-05")}

    service.getLlegadas(fecha).subscribe(
      data => {
        expect(data.length).toEqual(mockLlegada.length);
        expect(data[0].vuelo).toEqual(mockLlegada[0].vuelo);
        expect(data[0].fecha).toEqual(mockLlegada[0].fecha);
      }
    );

    const req = httpTestingController.expectOne('https://1teamqncdh.execute-api.us-east-1.amazonaws.com/test/gate/gate-llegada/entrada/2020-08-04/2020-08-05');

    expect(req.request.method).toEqual('GET');

    req.flush(mockLlegada);

  });

  it('El objeto observable en POST debe responder con estado creado',()=>{
    const mockLlegada : Llegada = {
      vuelo: "AV244",
      fecha: "2020-08-04T20:20:10.000Z",
      retraso_horas: 5,
      origen_ciudad: "Toronto",
      internacional: true,
      aerolinea: "Air Canada",
      pasajeros: 100,
      avion: "787-7",
      escala: false
    }

    service.postLlegada(mockLlegada).subscribe(
      data => {
        expect(data).toEqual("");
      }
    );

    const req = httpTestingController.expectOne('https://1teamqncdh.execute-api.us-east-1.amazonaws.com/test/gate/gate-llegada/entrada');

    expect(req.request.body).toEqual(mockLlegada);

    expect(req.request.method).toEqual('POST');

    req.flush("",{ status: 201, statusText:"created"});

  });


});
