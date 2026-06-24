import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../core/services/dashboard.service';
import type { Dashboard } from '../../core/models/dashboard.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent  implements OnInit{
  private dashhboardService = inject(DashboardService)
  dashboard = signal<Dashboard |null>(null)
  ngOnInit(): void {
     this.dashhboardService.getDashboardSummary().subscribe(data =>
    {
      this.dashboard.set(data)
    }
    )
  }
}