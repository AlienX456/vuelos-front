import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Salida } from 'src/app/interfaces/salida'
import { Rango } from 'src/app/interfaces/rango'

@Injectable({
  providedIn: 'root'
})
export class SalidasservicioService {

  private url = "https://1teamqncdh.execute-api.us-east-1.amazonaws.com/test/gate/gate-salida/salida"

  constructor(private http: HttpClient) { 

  }

  getSalidas(fecha: Rango){
    
    let fecha_iso_i = (new Date(fecha.fecha_inicio).toISOString()).split('T')[0]

    let fecha_iso_f = (new Date(fecha.fecha_final).toISOString()).split('T')[0]

    return this.http.get<Salida[]>(this.url+"/"+fecha_iso_i+"/"+fecha_iso_f);
  }

  postSalida(salida: Salida){
    return this.http.post(this.url,salida,{headers:{'Content-Type':'application/json'},'responseType': "text" });
  }
}
