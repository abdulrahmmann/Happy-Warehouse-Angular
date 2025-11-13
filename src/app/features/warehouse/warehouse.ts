import {Component, inject, OnInit} from '@angular/core';
import {Layout} from '../../shared/layout/layout';
import {WarehouseModel} from './models/Warehouse.model';
import {WarehouseService} from './services/warehouse-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-warehouse',
  imports: [
    Layout
  ],
  templateUrl: './warehouse.html',
})
export class Warehouse implements OnInit{
  private warehouseService = inject(WarehouseService);
  private router = inject(Router);

  warehouses: WarehouseModel[] = [];

  ngOnInit(): void {
    this.loadWarehouses();
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

}
