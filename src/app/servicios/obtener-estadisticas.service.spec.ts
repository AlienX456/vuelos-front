import { TestBed } from '@angular/core/testing';

import { ObtenerEstadisticasService } from './obtener-estadisticas.service';

import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { Tipostat } from '../interfaces/tipostat';

describe('ObtenerEstadisticasService', () => {
  let httpTestingController: HttpTestingController;
  let service: ObtenerEstadisticasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObtenerEstadisticasService],
      imports:[HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ObtenerEstadisticasService);

  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('El Objeto observable deberia retornar los datos correctos', () => {
    const mockStat =
    {
      num_vuelos: 3,
      num_retrasos: 3,
      sum_retrasos: 12,
      prom_pasajero: 106.66666666666667,
      sum_pasajeros: 320,
      num_vuelos_internacionales: 3
  };

    const cuerpo : Tipostat = {tipo: "salidas"}

    service.obtenerEstadisticas(cuerpo).subscribe(
      data => {
        expect(data.num_vuelos).toEqual(mockStat.num_vuelos);
        expect(data.num_retrasos).toEqual(mockStat.num_retrasos);
        expect(data.num_vuelos_internacionales).toEqual(mockStat.num_vuelos_internacionales);
        expect(data.prom_pasajero).toEqual(mockStat.prom_pasajero);
        expect(data.sum_pasajeros).toEqual(mockStat.sum_pasajeros);
        expect(data.sum_retrasos).toEqual(mockStat.sum_retrasos);
      }
    );

    const req = httpTestingController.expectOne('https://1teamqncdh.execute-api.us-east-1.amazonaws.com/test/gate/gate-lambda');

    expect(req.request.method).toEqual('POST');

    req.flush(mockStat);
    
    
  });



});
