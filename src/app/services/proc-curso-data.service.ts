import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcCursoDataService {

 
  private apiUrl = 'http://localhost:3000/api/datos_proc_curso'; // URL del backend

  constructor(private http: HttpClient) {}

   //metodo para traer todos los datos
   getDatos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


  getProcedimientoRelacionado(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
