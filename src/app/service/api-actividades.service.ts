import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Actividades } from '../api/actividades';
import { Response } from '../api/response';

const httpOption={
    headers: new HttpHeaders({
      'Contend-Type':'application/json'
    })
  };

  @Injectable({
    providedIn: 'root'
  })
  export class ApiActividadesService {
  
    url:string = 'https://localhost:443/api/Actividades';
    public Actividad:Actividades;
  
    constructor(
      private _http : HttpClient
    ) { }
  
    getActividades(): Observable<Response>{
      return this._http.get<Response>(this.url);
    }
  
    addActividades(actividades:Actividades):Observable<Response>{
      return this._http.post<Response>(this.url, actividades, httpOption);
    }
    
    editActividades(actividades:Actividades):Observable<Response>{
      return this._http.put<Response>(this.url,actividades,httpOption);
    }
  
    deleteActividades(id:number):Observable<Response>{
      return this._http.delete<Response>(`${this.url}/${id}`);
    }

    getActividad(actividad:Actividades){
      this.Actividad=actividad;
    }
  }