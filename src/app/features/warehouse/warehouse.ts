import {Component, inject, OnInit} from '@angular/core';
import {Layout} from '../../shared/layout/layout';
import {WarehouseModel} from './models/Warehouse.model';
import {WarehouseService} from './services/warehouse-service';
import {Router} from '@angular/router';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-warehouse',
  imports: [
    Layout,
    TableModule,
    CommonModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './warehouse.html',
})
export class Warehouse implements OnInit{
  private warehouseService = inject(WarehouseService);
  private router = inject(Router);

  warehouses: WarehouseModel[] = [];

  ngOnInit(): void {
    // this.loadWarehouses();
    this.warehouseService.loadWarehouses();

    this.warehouseService.warehouseList$.subscribe(list => {
      this.warehouses = list;
    });
  }

  loadWarehouses(): void {
    this.warehouseService.getWarehouses().subscribe({
      next: (response: any) => {
        this.warehouses = response.data || [];
        console.log('✅ Warehouses:', this.warehouses);
      },
      error: (error) => {
        console.error('❌ Error loading warehouses:', error);
      }
    });
  }

  NavigateAddNewWarehouse() {
    this.router.navigate(['/add-warehouse']);
  }

  deleteWarehouse(id:number) {
    this.warehouseService.deleteWarehouse(id).subscribe({
      next: (response: any) => {
        console.log('✅ Deleted Warehouses:', id);
        this.loadWarehouses();
      },
      error: (error) => {
        console.error('❌ Error deleting warehouses:', error);
      }
    });
  }

  navigateToWarehouseItems(id: number) {
    this.router.navigate(['/warehouse/warehouse-items', id]);
  }

  navigateToUpdateWarehouse(id: number) {
    this.router.navigate(['/warehouse/update-warehouse', id]);
  }

}
