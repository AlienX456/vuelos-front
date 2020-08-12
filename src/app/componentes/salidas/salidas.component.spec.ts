import { async, ComponentFixture, TestBed} from '@angular/core/testing';
import { SalidasservicioService } from 'src/app/servicios/salidasservicio.service'
import { SalidasComponent } from './salidas.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { throwError } from 'rxjs';

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

    spyOn(service, 'postSalida').and.returnValue(of({status: 201}));
    fixture.componentInstance.onSubmit(form_valido);
    fixture.whenStable().then(()=>{ expect(fixture.componentInstance.exito).toEqual(true)})
    }))

  it('Verificar que el valor de la variable fracaso cambie a true los datos no llegaron', async(() => {

    spyOn(service, 'postSalida').and.returnValue(throwError({}));
    fixture.componentInstance.onSubmit(form_valido);
    fixture.whenStable().then(()=>{ expect(fixture.componentInstance.fracaso).toEqual(true)})
    }))
  
});
