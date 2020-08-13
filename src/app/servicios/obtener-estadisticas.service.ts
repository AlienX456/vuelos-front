import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estadistica } from 'src/app/interfaces/estadistica'
import { Tipostat } from 'src/app/interfaces/tipostat'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ObtenerEstadisticasService {

  private url = "https://1teamqncdh.execute-api.us-east-1.amazonaws.com/test/gate/gate-lambda"

  constructor(private http: HttpClient) { 
    
  }

  obtenerEstadisticas(cuerpo:Tipostat): Observable<Estadistica>{
    return this.http.post<Estadistica>(this.url,JSON.stringify(cuerpo));
  }
}
