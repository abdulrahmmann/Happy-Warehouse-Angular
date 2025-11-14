import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {WarehouseModel} from '../models/Warehouse.model';
import {CreateWarehouseModel} from '../models/CreateWarehouse.model';
import {WarehouseItemModel} from '../models/WarehouseItem.model';
import {UpdateWarehouseModel} from '../../dashboard/models/UpdateWarehouse.model';
import {WarehouseByIdModel} from '../models/WarehouseById.model';
import {CreateWarehouseItemModel} from '../models/CreateWarehouseItem.model';

const BASE_URL: string = "https://localhost:7018/api/Warehouse";

const BASE_WAREHOUSE_ITEMS_URL: string = "https://localhost:7018/api/WarehouseItems";

const header = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  private httpClient = inject(HttpClient);

  private warehouseList = new BehaviorSubject<WarehouseModel[]>([]);
  warehouseList$ = this.warehouseList.asObservable();

  getWarehouses(): Observable<WarehouseModel[]> {
    return this.httpClient.get<WarehouseModel[]>(`${BASE_URL}/warehouses`);
  }

  loadWarehouses(): void {
    this.httpClient
      .get<{ data: WarehouseModel[] }>(`${BASE_URL}/warehouses`)
      .subscribe({
        next: (res) => this.warehouseList.next(res.data),
        error: (err) => console.error("❌ Error loading warehouses:", err)
      });
  }

  postWarehouse(warehouse: CreateWarehouseModel): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/create-warehouse`, warehouse);
  }

  putWarehouse(id: number, warehouseDto: UpdateWarehouseModel): Observable<any> {
    return this.httpClient.put(`${BASE_URL}/update-warehouse/${id}`, warehouseDto, {headers: header});
  }

  deleteWarehouse(id: number): Observable<any> {
    return this.httpClient.delete(`${BASE_URL}/delete-warehouse/${id}`, {headers: header});
  }

  getWarehouseItems(id: number): Observable<WarehouseItemModel[]> {
    return this.httpClient.get<WarehouseItemModel[]>(`${BASE_WAREHOUSE_ITEMS_URL}/get-items/${id}`);
  }

  getWarehouseById(id: number): Observable<WarehouseByIdModel> {
    return this.httpClient.get<WarehouseByIdModel>(`${BASE_URL}/by-id/${id}`, {headers: header});
  }

  postWarehouseItem(warehouseItem: CreateWarehouseItemModel): Observable<any> {
    return this.httpClient.post(`${BASE_WAREHOUSE_ITEMS_URL}/create-item`, warehouseItem);
  }
}
