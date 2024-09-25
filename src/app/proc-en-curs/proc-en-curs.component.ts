import { Component,OnInit  } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgFor } from '@angular/common';
import { ProcCursoDataService } from '../services/proc-curso-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-proc-en-curs',
  standalone: true,
  imports:[RouterModule,NavbarComponent,NgFor,CommonModule,FormsModule],
  templateUrl: './proc-en-curs.component.html',
  styleUrl: './proc-en-curs.component.css'
})
export class ProcEnCursComponent implements OnInit {

  datos: any[] = [];
  datosFiltrados: any[] = [];
  filtro: string = '';
  filtroNombre: string = '';
  filtroServicio: string = '';
  detalle: any;
  constructor(private dataService: ProcCursoDataService,public dialog: MatDialog, private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {


    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      if(id === '0'){
        this.dataService.getDatos().subscribe((data) => {
          this.datos = data;
          this.datosFiltrados = data; // Inicialmente, mostrar todos los datos
        });
      }
      this.dataService.getProcedimientoRelacionado(id).subscribe((data) => {
        this.detalle = data;
        this.datosFiltrados = [this.detalle]; // Mostrar solo el detalle del procedimiento
      });
   
  }
  }

  filtrarDatos(): void {
    this.datosFiltrados = this.datos.filter((dato) =>
      dato.datos_proc_curso.includes(this.filtro.toUpperCase())
    );
  }
filtrarDatosNombre(): void {
    this.datosFiltrados = this.datos.filter((dato) =>
      dato.datos_proc_curso.includes(this.filtroNombre.toLocaleUpperCase())
    );
  }
  filtrarDatosServicio(): void {
    this.datosFiltrados = this.datos.filter((dato) =>
      dato.datos_proc_curso.includes(this.filtroServicio.toUpperCase())
    );
  }

}
