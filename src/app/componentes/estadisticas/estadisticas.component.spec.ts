import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import {By} from '@angular/platform-browser'
import { EstadisticasComponent } from './estadisticas.component';
import { ObtenerEstadisticasService } from 'src/app/servicios/obtener-estadisticas.service'
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Tipostat } from 'src/app/interfaces/tipostat';
import { DebugElement } from '@angular/core';

describe('EstadisticasComponent', () => {
  let component: EstadisticasComponent;
  let fixture: ComponentFixture<EstadisticasComponent>;
  let service : ObtenerEstadisticasService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasComponent],
      providers:[ObtenerEstadisticasService],
      imports:[HttpClientTestingModule]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(ObtenerEstadisticasService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Verificar que la variable estadisticas obtenga valor luego del llamado de la función de busqueda', fakeAsync(() => {

  const mockStat =
    {
      num_vuelos: 3,
      num_retrasos: 3,
      sum_retrasos: 12,
      prom_pasajero: 106.66666666666667,
      sum_pasajeros: 320,
      num_vuelos_internacionales: 3
  };

  spyOn(service, 'obtenerEstadisticas').and.returnValue(of(mockStat));
  fixture.componentInstance.selectedValue = "salidas";
  fixture.componentInstance.statsHandler();
  fixture.whenStable().then(()=>{ expect(fixture.componentInstance.estadistica.num_vuelos).toEqual(mockStat.num_vuelos)
                                  expect(fixture.componentInstance.estadistica.num_retrasos).toEqual(mockStat.num_retrasos)
                                  expect(fixture.componentInstance.estadistica.sum_retrasos).toEqual(mockStat.sum_retrasos)
                                  expect(fixture.componentInstance.estadistica.prom_pasajero).toEqual(mockStat.prom_pasajero)
                                  expect(fixture.componentInstance.estadistica.sum_pasajeros).toEqual(mockStat.sum_pasajeros)
                                  expect(fixture.componentInstance.estadistica.num_vuelos_internacionales).toEqual(mockStat.num_vuelos_internacionales)});

  }))

});
