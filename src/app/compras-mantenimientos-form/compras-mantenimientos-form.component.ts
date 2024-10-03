import { Component,OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormBuilder, FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { DataService } from '../services/data.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-compras-mantenimientos-form',
  standalone: true,
  imports: [NgIf,FormsModule, NavbarComponent,ReactiveFormsModule],
  templateUrl: './compras-mantenimientos-form.component.html',
  styleUrl: './compras-mantenimientos-form.component.css'
})
export class ComprasMantenimientosFormComponent implements OnInit {

  compraForm!: FormGroup;
  nuevoProc:boolean = false;
  constructor(private fb: FormBuilder,private dataService: DataService, private http: HttpClient, private route: ActivatedRoute) {
    const today = new Date();
    this.compraForm = this.fb.group({
      // Otras propiedades del formulario aquí...
      proc_en_cursoFechaCreacion: [today.toISOString().split('T')[0]],
      proc_en_cursoMemo: [''],
      proc_en_cursoNombre: [''],
      proc_en_cursoTipoCompra: [''],
      proc_en_cursoMontoInicial: [''],
      proc_en_cursoEmpresa: [''],
      proc_en_cursoTiempo: [''],
      proc_en_cursoObs: [''],
      proc_en_cursoRegimen: [''],
      proc_en_cursoFechaInicio: ['1000-01-01'],
      proc_en_cursoFechaFin: ['1000-01-01'],
      proc_en_cursoProcNuevo: ['0'],
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      if (id === '0') {
        this.nuevoProc = false;
      }
    } else {
      // Handle the case where id is null
      console.error('ID is null');
    }
    
  }

  onSubmit() { 

    Loading.standard('Cargando...');
    // convertir todos los datos del formulario a mayuscula
    Object.keys(this.compraForm.controls).forEach(key => {
      const control = this.compraForm.get(key);
      if (control) {
        control.setValue(control.value.toString().toUpperCase());
        console.log(control.value);
      }
    });

    this.dataService.addCompra('nueva',this.compraForm.value).subscribe({
      next: (response) => {
        Loading.remove(2000);
        Notify.success('Procedimiento Agregado Correctamente');
        console.log('Compra añadida con éxito:', response);
      
        this.resetForm();
      },
      error: (error) => {
        Notify.failure('Algo salio mal al completar el formulario');
        Loading.remove(2000);
        console.error('Error al añadir compra:', error);
      }
    });



  }
  resetForm() {
    // Reiniciar el formulario
   this.compraForm.reset();
  }
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\//g, '-'); // Elimina el carácter '/'
  }
}
