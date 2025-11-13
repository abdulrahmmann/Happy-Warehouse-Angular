import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {WarehouseModel} from '../models/Warehouse.model';
import {CreateWarehouseModel} from '../models/CreateWarehouse.model';

const BASE_URL: string = "https://localhost:7018/api/Warehouse";

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  private httpClient = inject(HttpClient);

  getWarehouses(): Observable<WarehouseModel[]> {
    return this.httpClient.get<WarehouseModel[]>(`${BASE_URL}/warehouses`);
  }
  postWarehouse(warehouse: CreateWarehouseModel): Observable<any> {
    return this.httpClient.post(`${BASE_URL}/create-warehouse`, warehouse);
  }

}
