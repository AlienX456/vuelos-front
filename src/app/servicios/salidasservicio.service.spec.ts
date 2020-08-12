import { TestBed } from '@angular/core/testing';

import { SalidasservicioService } from './salidasservicio.service';

import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';

import {Rango} from 'src/app/interfaces/rango'

describe('SalidasservicioService', () => {
  let httpTestingController: HttpTestingController;
  let service: SalidasservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [SalidasservicioService],
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(SalidasservicioService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('El objeto observable en GET debe retornar los valores correctos',()=>{
    const mockSalida =
    [
      {
        vuelo: "AV244",
        fecha: "2020-08-04T20:20:10.000Z",
        retraso_horas: 5,
        destino_ciudad: "Toronto",
        internacional: true,
        aerolinea: "Air Canada",
        pasajeros: 100,
        avion: "787-7"
      },
      {
        vuelo: "AV255",
        fecha: "2020-08-04T20:20:10.000Z",
        retraso_horas: 5,
        destino_ciudad: "Toronto",
        internacional: true,
        aerolinea: "Air Canada",
        pasajeros: 100,
        avion: "787-7"
      },
    ];

    const fecha : Rango = {fecha_inicio: new Date("2020-08-04"), fecha_final: new Date("2020-08-05")}

    service.getSalidas(fecha).subscribe(
      data => {
        expect(data.length).toEqual(mockSalida.length);
        expect(data[0].vuelo).toEqual(mockSalida[0].vuelo);
      }
    );

    const req = httpTestingController.expectOne('https://1teamqncdh.execute-api.us-east-1.amazonaws.com/test/gate/gate-salida/salida/2020-08-04/2020-08-05');

    expect(req.request.method).toEqual('GET');

    req.flush(mockSalida);

  })



});
