import { Component,OnInit, Output, EventEmitter  } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [RouterModule,NgIf,CommonModule,NavbarComponent],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent implements OnInit{

  @Output() editItem = new EventEmitter<any>();
  detalle: any;
  
  constructor(private location: Location,private dataService: DataService, private route: ActivatedRoute,) { }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id !== null) {
      this.dataService.getDatoPorId(id,'general').subscribe((data) => {
        this.detalle = data;
      });
    } else {
      console.error('No se encontró el ID en la ruta');
    }
  }
  volver() {
    this.location.back();  // Vuelve a la página anterior
  }


}
