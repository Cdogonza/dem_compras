import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000/api/datos'; // URL del backend

  constructor(private http: HttpClient) {}

  //metodo para traer todos los datos
  getDatos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getDatoPorNumero(numero: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detalles/${numero}`);
  }


  getDatoPorNombre(nombreCompra: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${'%'+nombreCompra+'%'}`);
  }

  getDatoPorServicio(servicioCompra: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${'%'+servicioCompra+'%'}`);
  }

// Método para actualizar el estado en la base de datos
actualizarEstado(id: number, nuevoEstado: number): Observable<any> {
  const body = { id, compras_vencimientosProcNuevo: nuevoEstado };
  return this.http.put(`${this.apiUrl}/${id}`, body);
}


addCompra(compra: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, compra);
}



}
