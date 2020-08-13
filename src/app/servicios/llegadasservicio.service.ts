import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Rango } from 'src/app/interfaces/rango';
import { Llegada } from 'src/app/interfaces/llegada';

@Injectable({
  providedIn: 'root'
})
export class LlegadasservicioService {

  private url = "https://1teamqncdh.execute-api.us-east-1.amazonaws.com/test/gate/gate-llegada/entrada"

  constructor(private http: HttpClient) { 

  }

  getLlegadas(fecha: Rango){
    
    let fecha_iso_i = (new Date(fecha.fecha_inicio).toISOString()).split('T')[0]

    let fecha_iso_f = (new Date(fecha.fecha_final).toISOString()).split('T')[0]

    return this.http.get<Llegada[]>(this.url+"/"+fecha_iso_i+"/"+fecha_iso_f);
  }

  postLlegada(llegada: Llegada){
    return this.http.post(this.url,llegada,{headers:{'Content-Type':'application/json'},'responseType': "text" });
  }
}
