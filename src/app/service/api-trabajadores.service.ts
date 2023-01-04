import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Actividades } from '../api/actividades';
import { Response } from '../api/response';
import { Trabajadores } from '../api/trabajadores';

const httpOption={
    headers: new HttpHeaders({
      'Contend-Type':'application/json'
    })
  };

  @Injectable({
    providedIn: 'root'
  })
  export class ApiTrabajadorService {
  
    url:string = 'http://localhost:443/api/Trabajadores';
    trabajador:Trabajadores;
  
    constructor(
      private _http : HttpClient
    ) { }
  
    getTrabajadores(): Observable<Response>{
      return this._http.get<Response>(this.url);
    }

    addTrabajadores(trabajador:Trabajadores):Observable<Response>{
      return this._http.post<Response>(this.url, trabajador, httpOption);
    }
    
    editTrabajadores(trabajador:Trabajadores):Observable<Response>{
      return this._http.put<Response>(this.url,trabajador,httpOption);
    }
  
    deleteTrabajadores(id:number):Observable<Response>{
      return this._http.delete<Response>(`${this.url}/${id}`);
    }

    getTrabajador(trabajador:Trabajadores){
      this.trabajador=trabajador;
    }
}