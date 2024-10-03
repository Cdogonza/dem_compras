import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { DataService } from '../services/data.service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { FormBuilder } from '@angular/forms';
import { NgIf} from '@angular/common';





@Component({
  selector: 'app-form-new-proc',
  standalone: true,
  imports: [NgIf,FormsModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './form-new-proc.component.html',
  styleUrl: './form-new-proc.component.css'
})
export class FormNewProcComponent implements OnInit {
  compraForm!: FormGroup;
  data: any;
  editar:boolean=false;
  idGeneral:string = '';

  ngOnInit(): void {
    // Suscribirse a los parámetros de la ruta para obtener el ID
    this.route.params.subscribe(params => {
      const id = params['id']; // Obtén el ID de los parámetros de la ruta
      this.idGeneral = id;
      const edit = params['editar']
      if (edit =='editar'){
        this.editar = true;
        const formatFecha = (fecha: string) => {
          const dateObj = new Date(fecha);
          return dateObj.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        };
        this.dataService.getDatoPorId(id,'general').subscribe((data) => {
          this.data = data;
          this.compraForm.patchValue({
            proc_en_cursoFechaCreacion: formatFecha(data.proc_en_cursoFechaCreacion),
            proc_en_cursoMemo: data.proc_en_cursoMemo,
            proc_en_cursoNombre: data.proc_en_cursoNombre,
            proc_en_cursoNumero: data.proc_en_cursoNumero,
            proc_en_cursoTipoCompra: data.proc_en_cursoTipoCompra,
            proc_en_cursoResolucionFinal:data.proc_en_cursoResolucionFinal,
            proc_en_cursoMontoFinal: data.proc_en_cursoMontoFinal,
            proc_en_cursoMontoInicial: data.proc_en_cursoMontoInicial,
            proc_en_cursoRubro: data.proc_en_cursoRubro,
            proc_en_cursoEmpresa: data.proc_en_cursoEmpresa,
            proc_en_cursoTiempo: data.proc_en_cursoTiempo,
            proc_en_cursoObs: data.proc_en_cursoObs,
            proc_en_cursoRegimen: data.proc_en_cursoRegimen,
            proc_en_cursoFechaInicio: formatFecha(data.proc_en_cursoFechaInicio),
            proc_en_cursoFechaFin: formatFecha(data.proc_en_cursoFechaFin),
            proc_en_cursoProcNuevo:data.proc_en_cursoProcNuevo
            
          });
        });
      }else{
        if (id) {
          this.dataService.getDatoPorId(id,'general').subscribe((data) => {
            this.data = data;
            const today = new Date();
            this.compraForm.patchValue({
              proc_en_cursoFechaCreacion: [today.toISOString().split('T')[0]],
              //proc_en_cursoMemo: data.proc_en_cursoMemo,
              proc_en_cursoNombre: data.proc_en_cursoNombre,
              //proc_en_cursoNumero: data.proc_en_cursoNumero,
              proc_en_cursoTipoCompra: data.proc_en_cursoTipoCompra,
              //proc_en_cursoResolucionFinal:data.proc_en_cursoResolucionFinal,
              //proc_en_cursoMontoFinal: data.proc_en_cursoMontoFinal,
              //proc_en_cursoMontoInicial: data.proc_en_cursoMontoInicial,
              proc_en_cursoRubro: data.proc_en_cursoRubro,
              proc_en_cursoEmpresa: data.proc_en_cursoEmpresa,
              proc_en_cursoTiempo: data.proc_en_cursoTiempo,
              proc_en_cursoObs: data.proc_en_cursoObs,
              proc_en_cursoRegimen: data.proc_en_cursoRegimen,
              //proc_en_cursoFechaInicio: formatFecha(data.proc_en_cursoFechaInicio),
              //proc_en_cursoFechaFin: formatFecha(data.proc_en_cursoFechaFin),
              proc_en_cursoProcNuevo:data.proc_en_cursoProcNuevo
              
            });
          });
  
        }
      }
      
    });
  }
  constructor(private fb: FormBuilder, private dataService: DataService, private route: ActivatedRoute) {
    const today = new Date();
    this.compraForm = this.fb.group({
      
      proc_en_cursoFechaCreacion: [''],
      proc_en_cursoMemo: [''],
      proc_en_cursoNombre: [''],
      proc_en_cursoNumero: [''],
      proc_en_cursoTipoCompra: [''],
      proc_en_cursoResolucionFinal:[''],
      proc_en_cursoMontoInicial: [''],
      proc_en_cursoMontoFinal: [''],
      proc_en_cursoRubro: [''],
      proc_en_cursoEmpresa: [''],
      proc_en_cursoTiempo: [''],
      proc_en_cursoObs: [''],
      proc_en_cursoRegimen: [''],
      proc_en_cursoFechaInicio: ['',Validators.required],
      proc_en_cursoFechaFin: ['',Validators.required],
      proc_en_cursoIdCompraAnt: [''],
      proc_en_cursoProcNuevo: [''],
    });
  }

  addCompra() { 
    Loading.standard('Cargando...');
if(this.compraForm.invalid){
  Notify.failure('Los campos de fecha son obligatorios');
}else{
  this.dataService.addCompra('enlazada',this.compraForm.value).subscribe({
    next: (response) => {
      Loading.remove(2000);
      Notify.success('Procedimiento Agregado Correctamente');
      console.log('Compra añadida con éxito:', response);
      this.dataService.actualizarEstado(this.compraForm.value.proc_en_cursoIdCompraAnt, 1).subscribe({
        next: (response) => {
          console.log('Estado actualizado:', response);
        },
        error: (error) => {
          console.error('Error al actualizar estado:', error);
        }
      });
      this.resetForm();
    },
    error: (error) => {
      Notify.failure('Los campos de fecha son obligatorios');
      Loading.remove(2000);
      console.error('Error al añadir compra:', error);
    }
  });
}
    
  }
editarCompra(){
  Loading.standard('Cargando...');
if(this.compraForm.invalid){
  Notify.failure('Los campos de fecha son obligatorios');
}else{


  this.dataService.editarCompra(this.idGeneral,'total',this.compraForm.value).subscribe({
    next: (response) => {
      Loading.remove(2000);
      Notify.success('Procedimiento Agregado Correctamente');
      console.log('Compra añadida con éxito:', response);
      this.dataService.actualizarEstado(this.compraForm.value.proc_en_cursoIdCompraAnt, 1).subscribe({
        next: (response) => {
          console.log('Estado actualizado:', response);
        },
        error: (error) => {
          console.error('Error al actualizar estado:', error);
        }
      });
      this.resetForm();
    },
    error: (error) => {
      Notify.failure('Los campos de fecha son obligatorios');
      Loading.remove(2000);
      console.error('Error al añadir compra:', error);
    }
  });


}
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

