import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Areas } from '../api/areas';
import { Response } from '../api/response';

const httpOption={
    headers: new HttpHeaders({
      'Contend-Type':'application/json'
    })
  };

  @Injectable({
    providedIn: 'root'
  })
  export class ApiAreaService {
  
    url:string = 'http://smantenimientosh-001-site1.htempurl.com/api/Area';
    area:Areas;
  
    constructor(
      private _http : HttpClient
    ) { }
  
    getAreas(): Observable<Response>{
      return this._http.get<Response>(this.url);
    }
    addAreas(area:Areas):Observable<Response>{
      return this._http.post<Response>(this.url, area, httpOption);
    }
    
    editAreas(area:Areas):Observable<Response>{
      return this._http.put<Response>(this.url,area,httpOption);
    }
  
    deleteAreas(id:number):Observable<Response>{
      return this._http.delete<Response>(`${this.url}/${id}`);
    }

    getArea(area:Areas){
      this.area=area;
    }
}
