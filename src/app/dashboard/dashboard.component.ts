import { Component,OnInit  } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { DataService } from '../data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  tableData: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(data => {
      this.tableData = data;
    });
  }
}





