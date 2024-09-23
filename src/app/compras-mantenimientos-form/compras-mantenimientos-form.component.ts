import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { DataService } from '../services/data.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';


@Component({
  selector: 'app-compras-mantenimientos-form',
  standalone: true,
  imports: [FormsModule,NavbarComponent],
  templateUrl: './compras-mantenimientos-form.component.html',
  styleUrl: './compras-mantenimientos-form.component.css'
})
export class ComprasMantenimientosFormComponent {


  compra = {
    compras_vencimientosMemo: '',
    compras_vencimientosNumero: '',
    compras_vencimientosNombre: '',
    compras_vencimientosMonto: '',
    compras_vencimientosEmpresa: '',
    compras_vencimientosMontoFinal: '',
    compras_vencimientosObs: '',
    compras_vencimientosRegimen: '',
    compras_vencimientosResFinal: '',
    compras_vencimientosServicio: '',
    compras_vencimientoFecha: '',
    compras_vencimientosProcNuevo: false
  };

  constructor(private dataService: DataService,private http: HttpClient, private router: Router) {
    const today = new Date();
    this.compra.compras_vencimientoFecha = today.toISOString().split('T')[0];
  }

  onSubmit() {
    Loading.standard('Cargando...');
    this.compra.compras_vencimientosMemo = this.compra.compras_vencimientosMemo.toUpperCase();
    this.compra.compras_vencimientosNumero = this.compra.compras_vencimientosNumero.toUpperCase();
    this.compra.compras_vencimientosNombre = this.compra.compras_vencimientosNombre.toUpperCase();
    this.compra.compras_vencimientosMonto = this.compra.compras_vencimientosMonto.toUpperCase();
    this.compra.compras_vencimientosEmpresa = this.compra.compras_vencimientosEmpresa.toUpperCase();
    this.compra.compras_vencimientosMontoFinal = this.compra.compras_vencimientosMontoFinal.toUpperCase();
    this.compra.compras_vencimientosObs = this.compra.compras_vencimientosObs.toUpperCase();
    this.compra.compras_vencimientosRegimen = this.compra.compras_vencimientosRegimen.toUpperCase();
    this.compra.compras_vencimientosResFinal = this.compra.compras_vencimientosResFinal.toUpperCase();
    this.compra.compras_vencimientosServicio = this.compra.compras_vencimientosServicio.toUpperCase();

    this.dataService.addCompra(this.compra).subscribe({
      next: (response) => {
        Loading.remove(2000);
        Notify.success('Bienvenido');
        console.log('Compra añadida con éxito:', response);
        // Aquí puedes mostrar un mensaje al usuario o reiniciar el formulario
        this.resetForm();
      },
      error: (error) => {
        Notify.failure('Ocurrio un Error');
        Loading.remove(2000);
        console.error('Error al añadir compra:', error);
        // Aquí puedes manejar el error, como mostrar un mensaje al usuario
      }
    });
  }
  resetForm() {
    // Reiniciar el formulario
    this.compra = {
      compras_vencimientosMemo: '',
    compras_vencimientosNumero: '',
    compras_vencimientosNombre: '',
    compras_vencimientosMonto: '',
    compras_vencimientosEmpresa: '',
    compras_vencimientosMontoFinal: '',
    compras_vencimientosObs: '',
    compras_vencimientosRegimen: '',
    compras_vencimientosResFinal: '',
    compras_vencimientosServicio: '',
      compras_vencimientoFecha: new Date().toISOString().split('T')[0],
      compras_vencimientosProcNuevo: false
    };
  }
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\//g, '-'); // Elimina el carácter '/'
  }
}
