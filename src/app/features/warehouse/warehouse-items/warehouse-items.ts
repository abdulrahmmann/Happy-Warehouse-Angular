import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {Layout} from '../../../shared/layout/layout';
import {TableModule} from 'primeng/table';
import {WarehouseService} from '../services/warehouse-service';
import {WarehouseItemModel} from '../models/WarehouseItem.model';

@Component({
  selector: 'app-warehouse-items',
  imports: [
    Layout,
    TableModule,
    RouterLink
  ],
  templateUrl: './warehouse-items.html',
})
export class WarehouseItems implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private warehouseService = inject(WarehouseService);

  warehouseItems: WarehouseItemModel[] = [];

  id: number = 0;

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.loadWarehouseItems(this.id);
  }

  BackToWarehouses() {
    this.router.navigate(['/warehouses']);
  }

    loadWarehouseItems(id:number) {
    this.warehouseService.getWarehouseItems(id).subscribe({
      next: (response: any) => {
        this.warehouseItems = response.data || [] || null;
        console.log("Success Load Warehouses Items");
      },
      error: (error) => {
        console.error('❌ Error Load warehouse items:', error);
      }
    });
  }

  navigateToAddItem() {

  }

}
