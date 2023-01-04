import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { RegistroActividades } from '../api/registroActividades';
import { RegistroActividades2 } from '../api/registroActividades2';
import { Response } from '../api/response';
import { registroActividades } from '../components/registroActividades/registroActividades.component';

const httpOption={
    headers: new HttpHeaders({
      'Contend-Type':'application/json'
    })
  };

  @Injectable({
    providedIn: 'root'
  })
  export class ApiRegistroActividadesService {
  
    url:string = 'http://localhost:443/api/RegistroActividades';
    url2:string='http://localhost:443/api/RegistroA2';
    public id?:number;
    public idOrden?:string;
    public idActividad?:number;
    public idMaquina?:number;
    public idTrabajador?:number;
    public fechaProgramada?:Date;
    public fechaRealizacion?:Date;
    public notas?:string;
    public idTrabajadorSupervisor?:any;
    public periodo?:number;
  
    constructor(
      private _http : HttpClient
    ) { }
  
    getActividades(): Observable<Response>{
      return this._http.get<Response>(this.url);
    }
  
    addActividades(registroActividades:RegistroActividades):Observable<Response>{
      return this._http.post<Response>(this.url, registroActividades, httpOption);
    }
    
    editActividades(registroActividades:RegistroActividades2):Observable<Response>{
      return this._http.put<Response>(this.url,registroActividades,httpOption);
    }
  
    deleteActividades(id:number):Observable<Response>{
      return this._http.delete<Response>(`${this.url}/${id}`);
    }

    getActividadesO():Observable<Response>{
      return this._http.get<Response>(this.url2);
    }

  }