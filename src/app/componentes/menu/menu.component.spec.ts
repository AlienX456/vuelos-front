import { async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Location} from '@angular/common'

import { LogInComponent } from 'src/app/componentes/log-in/log-in.component';
import { LlegadasComponent } from 'src/app/componentes/llegadas/llegadas.component';
import { SalidasComponent } from 'src/app/componentes/salidas/salidas.component';
import { EstadisticasComponent } from 'src/app/componentes/estadisticas/estadisticas.component';

import { MenuComponent } from './menu.component';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';

import {By} from '@angular/platform-browser'


describe('MenuComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent, LogInComponent, LlegadasComponent, SalidasComponent, EstadisticasComponent ],
      imports:[
        RouterTestingModule.withRoutes([
          {
            path:'salidas',
            component: SalidasComponent
          },
          {
            path:'llegadas',
            component: LlegadasComponent
          },
          {
            path:'stats',
            component: EstadisticasComponent
          }
        ])
      ]
    })
    .compileComponents();
  }));

  let component: MenuComponent;

  let fixture: ComponentFixture<MenuComponent>;

  let location : Location;

  let router : Router;

  let debugElement : DebugElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    router = TestBed.get(Router)

    fixture.detectChanges();


  });

  it('Redirigir a /salidas cuando se realiza click en el boton Salidas', fakeAsync(() => {
    debugElement.query(By.css('.salidas-btn')).nativeElement.click();
    tick();
    expect(location.path).toBe('/salidas');
  }));

  it('Redirigir a /llegadas cuando se realiza click en el boton Llegadas', fakeAsync(() => {
    debugElement.query(By.css('.llegadas-btn')).nativeElement.click();
    tick();
    expect(location.path).toBe('/llegadas');
  }));

  it('Redirigir a /stats cuando se realiza click en el boton Estadisticas', fakeAsync(() => {
    debugElement.query(By.css('.estadisticas-btn')).nativeElement.click();
    tick();
    expect(location.path).toBe('/stats');
  }))



});
