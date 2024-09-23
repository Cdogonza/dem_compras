import { Component,OnInit  } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [NgIf,CommonModule,NavbarComponent],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent implements OnInit{

  detalle: any;
  constructor(private router: Router,private dataService: DataService, private route: ActivatedRoute,) { }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.dataService.getDatoPorNumero(id).subscribe((data) => {
        this.detalle = data;
      });
    } else {
      // Handle the case where id is null
      console.error('ID is null');
    }
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']); // Cambia la ruta según tu configuración
  }
}
