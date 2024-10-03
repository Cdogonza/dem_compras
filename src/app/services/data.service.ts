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
  getDatos(actionType:string): Observable<any> {
    const url = `${this.apiUrl}/${actionType}`;
    return this.http.get<any>(url);
  }

  // getDatoPorId(id: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/detalles/${id}`);
  // }
  getDatoPorId(itemId: string,actionType:string): Observable<any> {

    const url = `${this.apiUrl}/detalles/${itemId}/${actionType}`;
    return this.http.get(url); 
  }

  addCompra(actionType:string, compra: any): Observable<any> {
    const url = `${this.apiUrl}/${actionType}`;
    return this.http.post<any>(url, compra);
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
// actualizarEstado(id: number, nuevoEstado: number): Observable<any> {
//   const body = { id, compras_vencimientosProcNuevo: nuevoEstado };
//   return this.http.put(`${this.apiUrl}/${id}`, body);
// }

actualizarEstado(id: number, nuevoEstado: number): Observable<any> {
  const body = { id, compras_vencimientosProcNuevo: nuevoEstado };
  return this.http.put(`${this.apiUrl}/${id}`, body);
}

editarCompra(id: string, actionType: string, compra: any): Observable<any> {
  const url = `${this.apiUrl}/${id}/${actionType}`; // Construir la URL con el id y actionType
  return this.http.put(url, compra);  // Enviar solicitud PUT con los datos
}
}
