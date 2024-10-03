import { Routes } from '@angular/router';
import { DetallesComponent } from './detalles/detalles.component';
import { ProcEnCursComponent } from './proc-en-curs/proc-en-curs.component';
import { FormNewProcComponent } from './form-new-proc/form-new-proc.component';
import { ComprasMantenimientosFormComponent } from './compras-mantenimientos-form/compras-mantenimientos-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full', // Asegura que la redirección se aplique solo a la raíz
  },
    {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },

      {
        path: 'detalles/:id',
        component: DetallesComponent,
      },
      {
        path: 'proc-en-curso/:id',
        component: ProcEnCursComponent,
      },
      {
        path: 'form_new_proc/:id/:editar',
        component: FormNewProcComponent,
      },
      {
        path: 'nuevo-formulario/:id',
        component: ComprasMantenimientosFormComponent,
      }
    // otras rutas...
  ];
