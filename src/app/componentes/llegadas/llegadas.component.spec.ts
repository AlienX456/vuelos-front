import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LlegadasservicioService } from 'src/app/servicios/llegadasservicio.service';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { throwError } from 'rxjs';
import { LlegadasComponent } from './llegadas.component';
import { Llegada } from 'src/app/interfaces/llegada';

describe('LlegadasComponent', () => {
  let component: LlegadasComponent;
  let fixture: ComponentFixture<LlegadasComponent>;
  let service : LlegadasservicioService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlegadasComponent ],
      providers:[LlegadasservicioService],
      imports:[HttpClientTestingModule,ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlegadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(LlegadasservicioService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const form_valido = 
  {
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

  it('Verificar que el valor de la variable exito cambie a true cuando se enviaron los datos', async(() => {

    spyOn(service, 'postLlegada').and.returnValue(of(""));
    fixture.componentInstance.onSubmit(form_valido);
    fixture.whenStable().then(()=>{ expect(fixture.componentInstance.exito).toEqual(true)})
    }))

  it('Verificar que el valor de la variable fracaso cambie a true los datos no llegaron', async(() => {

    spyOn(service, 'postLlegada').and.returnValue(throwError({}));
    fixture.componentInstance.onSubmit(form_valido);
    fixture.whenStable().then(()=>{ expect(fixture.componentInstance.fracaso).toEqual(true)})
    }))

  it('Verificar que la fecha inicial debe menor a la final', () => {
    fixture.componentInstance.onSubmitFechas({fecha_inicio : '2020-04-03',fecha_final:'2020-03-02'});
    expect(fixture.componentInstance.fecha_invalida).toEqual(true);
    fixture.componentInstance.onSubmitFechas({fecha_inicio : '2020-04-03',fecha_final:'2020-04-03'});
    expect(fixture.componentInstance.fecha_invalida).toEqual(true);
    fixture.componentInstance.onSubmitFechas({fecha_inicio : '2020-03-03',fecha_final:'2020-04-03'});
    expect(fixture.componentInstance.fecha_invalida).toEqual(false);
    })
  
    it('Verificar que en el submit correcto el arreglo de llegadas sea llenado', async(() =>{
      let mockLlegadas : Llegada[] = [
        {
          vuelo: "AV244",
          fecha: "2020-08-04T20:20:10.000Z",
          retraso_horas: 5,
          origen_ciudad: "Toronto",
          internacional: true,
          aerolinea: "Air Canada",
          pasajeros: 100,
          avion: "787-7",
          escala: true
        },
        {
          vuelo: "AV255",
          fecha: "2020-08-04T20:20:10.000Z",
          retraso_horas: 5,
          origen_ciudad: "Toronto",
          internacional: true,
          aerolinea: "Air Canada",
          pasajeros: 100,
          avion: "787-7",
          escala: true
        },
      ]
      spyOn(service, 'getLlegadas').and.returnValue(of(mockLlegadas));
      fixture.componentInstance.onSubmitFechas({fecha_inicio : '2020-03-03',fecha_final:'2020-04-03'});
      fixture.whenStable().then(()=>{expect(fixture.componentInstance.llegadas).toEqual(mockLlegadas);})
      })
    );
  
  it('Verificar que el valor de error_busqueda sea true cuando hubo error en la busqueda', async(() =>{
    spyOn(service, 'getLlegadas').and.returnValue(throwError({}));
    fixture.componentInstance.onSubmitFechas({fecha_inicio : '2020-03-03',fecha_final:'2020-04-03'});
    fixture.whenStable().then(()=>{expect(fixture.componentInstance.error_busqueda).toEqual(true)})
    })
  );

  it('Verificar que si el arreglo de resultados luego de busqueda esta vacio, sin_resultados cambie a true', async(() =>{
    let mockLlegadas : Llegada[] = []
    spyOn(service, 'getLlegadas').and.returnValue(of(mockLlegadas));
    fixture.componentInstance.onSubmitFechas({fecha_inicio : '2020-03-03',fecha_final:'2020-04-03'});
    fixture.whenStable().then(()=>{expect(fixture.componentInstance.sin_resultados).toEqual(true);})
    })
  );

});
