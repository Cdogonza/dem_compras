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
  filtroObs: string = '';
  linkProcNuevo:boolean=false;
  noAdjudicado:boolean=true;

  constructor(private dataService: DataService,public dialog: MatDialog, private router:Router) { }

  ngOnInit(): void {
    // Obtener todos los datos al iniciar el componente
    this.dataService.getDatos('vigentes').subscribe((data) => {
      this.datosFiltrados = data;
  });
  }
  filtrarDatos(): void {
    this.datosFiltrados = this.datos.filter((dato) =>
      this.isDateAfter2000(dato.fecha) && this.isNameMatch(dato.nombre, this.filtro)


    );
  }
  filtrarDatosNombre(): void {
    this.datosFiltrados = this.datos.filter((dato) =>
      this.isDateAfter2000(dato.fecha) && this.isNameMatch(dato.nombre, this.filtro)
    );
  }
  filtrarDatosServicio(): void {
    this.datosFiltrados = this.datos.filter((dato) =>
      this.isDateAfter2000(dato.fecha) && this.isNameMatch(dato.nombre, this.filtro)
    );
  }

  isNameMatch(name: string, searchText: string): boolean {
    return name.toLowerCase().includes(searchText.toLowerCase());
  }

  isDateAfter2000(dateString: string): boolean {
    const date = new Date(dateString);
    return date.getFullYear() < 2000;
  }




  getClassForDate(fecha: string): string {
    const fechaVencimiento = new Date(fecha);
    const fechaActual = new Date();
    const mesesRestantes = differenceInMonths(fechaVencimiento, fechaActual);
    const aniosdiferencia = fechaActual.getFullYear() -fechaVencimiento.getFullYear() ;

    if(aniosdiferencia <2000){

      this.noAdjudicado=true;
    }
    if (mesesRestantes <= 0) {
      return 'bg-black text-white'; // Rojo con texto blanco
    }
    else if (mesesRestantes > 0 && mesesRestantes <= 6) {
      return 'bg-danger'; // Rojo
    } 
     else if (mesesRestantes > 6 && mesesRestantes <= 12) {
      return 'bg-warning'; // Amarillo
    } else if (mesesRestantes > 12 && mesesRestantes <= 18) {
      return 'bg-success text-white'; // Verde con texto blanco
    } else {
      return 'bg-white'; // Blanco
    }
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
// Método para ver si hay un procedimeinto en curso de una compra, y de ahi cambia el valor del boolean para que aparezca el linck de ver proc o no.
ChequoEstadoProcNuevo(item: any): void {
 
  const nuevoEstado = item.compras_vencimientosProcNuevo; 

if (item.compras_vencimientosProcNuevo) {
  this.linkProcNuevo=true;

}else{
  this.linkProcNuevo=false;
}
}
}






