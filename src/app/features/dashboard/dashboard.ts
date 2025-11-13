import {Component, inject, OnInit} from '@angular/core';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import {Layout} from '../../shared/layout/layout';
import {WarehouseWithInventoryDetailsModel} from './models/WarehouseWithInventoryDetails.model';
import {DashboardService} from './services/DashboardService';
import {WarehouseStatusModel} from './models/WarehouseStatus.model';
import {TopItemsModel} from './models/TopItems.model';

@Component({
  selector: 'app-dashboard',
  imports: [
    ScrollPanelModule,
    Layout
  ],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit{
  private dashboardService = inject(DashboardService);

  warehouses: WarehouseWithInventoryDetailsModel[] = [];

  warehouseStatus: WarehouseStatusModel[] = [];

  topItems: TopItemsModel[] = [];

  ngOnInit(): void {
    this.loadWarehouses();
    this.loadWarehouseStatus();
    this.loadTopItems();
  }

  loadWarehouses(): void {
    this.dashboardService.getWarehouseInventoryDetails().subscribe({
      next: (response: any) => {
        this.warehouses = response.data || [];
        console.log('✅ Warehouses:', this.warehouses);
      },
      error: (error) => {
        console.error('❌ Error loading warehouses:', error);
      }
    });
  }

  loadWarehouseStatus(): void {
    this.dashboardService.getWarehouseStatus().subscribe({
      next: (response: any) => {
        this.warehouseStatus = response.data || [];
        console.log('✅ WarehouseStatus:', this.warehouseStatus);
      }
    });
  }

  loadTopItems(): void {
    this.dashboardService.getTopItems().subscribe({
      next: (response: any) => {
        this.topItems = response.data || [];
        console.log('✅ TopItems:', this.topItems);
      }
    });
  }
}
