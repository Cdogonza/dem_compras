import { Component,OnInit  } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor } from '@angular/common';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { differenceInMonths } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule,NavbarComponent,NgFor,CommonModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

 
  datos: any[] = [];
  datosFiltrados: any[] = [];
  filtro: string = '';
  filtroNombre: string = '';
  filtroServicio: string = '';
  constructor(private dataService: DataService,public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    // Obtener todos los datos al iniciar el componente
    this.dataService.getDatos().subscribe((data) => {
      this.datos = data;
      this.datosFiltrados = data; // Inicialmente, mostrar todos los datos
    });
  }
  filtrarDatos(): void {
    this.datosFiltrados = this.datos.filter((dato) =>
      dato.compras_vencimientosNumero.includes(this.filtro.toUpperCase())
    );
  }
filtrarDatosNombre(): void {
    this.datosFiltrados = this.datos.filter((dato) =>
      dato.compras_vencimientosNombre.includes(this.filtroNombre.toLocaleUpperCase())
    );
  }
  filtrarDatosServicio(): void {
    this.datosFiltrados = this.datos.filter((dato) =>
      dato.compras_vencimientosServicio.includes(this.filtroServicio.toUpperCase())
    );
  }
// Método para manejar el cambio del checkbox
cambiarEstado(item: any): void {
  let estadoEnvio:number =0;
  const nuevoEstado = !item.compras_vencimientosProcNuevo; // Cambiar el estado actual
  item.compras_vencimientosProcNuevo = nuevoEstado; // Actualizar el estado en el frontend
if (item.compras_vencimientosProcNuevo) {
estadoEnvio=1;
console.log('estadoEnvio:', estadoEnvio);
}else{
estadoEnvio=0;
console.log('estadoEnvio:', estadoEnvio);
}
  // Llamar al servicio para actualizar la base de datos si hay o no un procedimiento nuevo, el checkbox
  this.dataService.actualizarEstado(item.idcompras_vencimientos, estadoEnvio).subscribe(
    response => {
      console.log('Estado actualizado:', response);
    },
    error => {
      console.error('Error al actualizar estado:', error);
      // Si hay un error, podrías revertir el estado en el frontend
      item.compras_vencimientosProcNuevo = !nuevoEstado; // Revertir el cambio
    }
  );
}

  getClassForDate(fecha: string): string {
    const fechaVencimiento = new Date(fecha);
    const fechaActual = new Date();
    const mesesRestantes = differenceInMonths(fechaVencimiento, fechaActual);

    if (mesesRestantes <= 0) {
      return 'bg-black text-white'; // Rojo con texto blanco
    }
    else if (mesesRestantes > 0 && mesesRestantes <= 3) {
      return 'bg-danger'; // Rojo
    } 
     else if (mesesRestantes > 3 && mesesRestantes <= 6) {
      return 'bg-warning'; // Amarillo
    } else if (mesesRestantes > 6 && mesesRestantes <= 12) {
      return 'bg-success text-white'; // Verde con texto blanco
    } else {
      return 'bg-white'; // Blanco
    }
  }
}






