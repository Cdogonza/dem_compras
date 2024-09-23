import { Routes } from '@angular/router';
import { DetallesComponent } from './detalles/detalles.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full', // Asegura que la redirección se aplique solo a la raíz
  },
    {
      path: 'nuevo-formulario',
      loadComponent: () =>
        import('./compras-mantenimientos-form/compras-mantenimientos-form.component').then(
          (m) => m.ComprasMantenimientosFormComponent
        ),



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
    // otras rutas...
  ];
