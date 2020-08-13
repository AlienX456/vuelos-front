import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { SalidasservicioService } from 'src/app/servicios/salidasservicio.service'
import { SalidasComponent } from './salidas.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { throwError } from 'rxjs';
import { Salida } from 'src/app/interfaces/salida'

describe('SalidasComponent', () => {
  let component: SalidasComponent;
  let fixture: ComponentFixture<SalidasComponent>;
  let service : SalidasservicioService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalidasComponent ],
      providers:[SalidasservicioService],
      imports:[HttpClientTestingModule,ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(SalidasservicioService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const form_valido = 
  {
    vuelo: "AV244",
    fecha: "2020-08-04T20:20:10.000Z",
    retraso_horas: 5,
    destino_ciudad: "Toronto",
    internacional: true,
    aerolinea: "Air Canada",
    pasajeros: 100,
    avion: "787-7"
  }

  it('Verificar que el valor de la variable exito cambie a true cuando se enviaron los datos', async(() => {

    spyOn(service, 'postSalida').and.returnValue(of(""));
    fixture.componentInstance.onSubmit(form_valido);
    fixture.whenStable().then(()=>{ expect(fixture.componentInstance.exito).toEqual(true)})
    }))

  it('Verificar que el valor de la variable fracaso cambie a true los datos no llegaron', async(() => {

    spyOn(service, 'postSalida').and.returnValue(throwError({}));
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

  it('Verificar que en el submit correcto el arreglo de salidas sea llenado', async(() =>{
    let mockSalidas : Salida[] = [
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
    ]
    spyOn(service, 'getSalidas').and.returnValue(of(mockSalidas));
    fixture.componentInstance.onSubmitFechas({fecha_inicio : '2020-03-03',fecha_final:'2020-04-03'});
    fixture.whenStable().then(()=>{expect(fixture.componentInstance.salidas).toEqual(mockSalidas);})
    })
  );

  it('Verificar que el valor de error_busqueda sea true cuando hubo error en la busqueda', async(() =>{
    spyOn(service, 'getSalidas').and.returnValue(throwError({}));
    fixture.componentInstance.onSubmitFechas({fecha_inicio : '2020-03-03',fecha_final:'2020-04-03'});
    fixture.whenStable().then(()=>{expect(fixture.componentInstance.error_busqueda).toEqual(true)})
    })
  );


  it('Verificar que si el arreglo de resultados luego de busqueda esta vacio, sin_resultados cambie a true', async(() =>{
    let mockSalidas : Salida[] = []
    spyOn(service, 'getSalidas').and.returnValue(of(mockSalidas));
    fixture.componentInstance.onSubmitFechas({fecha_inicio : '2020-03-03',fecha_final:'2020-04-03'});
    fixture.whenStable().then(()=>{expect(fixture.componentInstance.sin_resultados).toEqual(true);})
    })
  );

  it('Verificar que si el valor de retraso es negativo la variable valores_erroneos cambie a true',()=>{
    expect(fixture.componentInstance.valores_erroneos).toEqual(false);
    fixture.componentInstance.onSubmit({retraso_horas:-1,pasajeros:2,fecha:"04-08-2020"});
    expect(fixture.componentInstance.valores_erroneos).toEqual(true);
  })

  it('Verificar que si el valor de pasajeros es negativo la variable valores_erroneos cambie a true',()=>{
    expect(fixture.componentInstance.valores_erroneos).toEqual(false);
    fixture.componentInstance.onSubmit({retraso_horas:2,pasajeros:-2,fecha:"04-08-2020"});
    expect(fixture.componentInstance.valores_erroneos).toEqual(true);
  })

  it('Verificar que si la fecha es mayor a la actual, la variable valores_erroneos cambie a true',()=>{
    expect(fixture.componentInstance.valores_erroneos).toEqual(false);
    fixture.componentInstance.onSubmit({retraso_horas:1,pasajeros:2,fecha:"04-10-2024"});
    expect(fixture.componentInstance.valores_erroneos).toEqual(true);
  })

  it('No permitir el ingreso de fechas vacias',()=>{
    expect(fixture.componentInstance.fecha_invalida).toEqual(false);
    fixture.componentInstance.onSubmitFechas({fecha_inicial:"",fecha_final:""});
    expect(fixture.componentInstance.fecha_invalida).toEqual(true);
  })


  
});
