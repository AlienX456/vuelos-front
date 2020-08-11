import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser'
import { EstadisticasComponent } from './estadisticas.component';
import { ObtenerEstadisticasService } from 'src/app/servicios/obtener-estadisticas.service'
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Tipostat } from 'src/app/interfaces/tipostat';

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

  it('Verificar que la variable estadisticas obtenga valor luego del proceso asincrono', async(() => {

  const mockStat =
    {
      num_vuelos: 3,
      num_retrasos: 3,
      sum_retrasos: 12,
      prom_pasajero: 106.66666666666667,
      sum_pasajeros: 320,
      num_vuelos_internacionales: 3
  };

const cuerpo : Tipostat = {
  tipo: "salida"
} 

  spyOn(service, 'obtenerEstadisticas').and.returnValue(of(mockStat))
  //fixture.debugElement.query(By.css('salidas-btn')).nativeElement.click();
  fixture.componentInstance.obtenerEstadisticas(cuerpo);
  fixture.whenStable().then(()=>{expect(fixture.componentInstance.estadistica.num_retrasos).toEqual(mockStat.num_retrasos)})
  }))

});
