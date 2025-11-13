import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WarehouseWithInventoryDetailsModel} from '../models/WarehouseWithInventoryDetails.model';
import {Observable} from 'rxjs';
import {WarehouseStatusModel} from '../models/WarehouseStatus.model';
import {TopItemsModel} from '../models/TopItems.model';

const BASE_URL = 'https://localhost:7018/api/Dashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private httpClient = inject(HttpClient);

  getWarehouseInventoryDetails(): Observable<WarehouseWithInventoryDetailsModel[]> {
    return this.httpClient.get<WarehouseWithInventoryDetailsModel[]>(`${BASE_URL}/warehouse-inventory-details`);
  }

  getWarehouseStatus(): Observable<WarehouseStatusModel[]> {
    return this.httpClient.get<WarehouseStatusModel[]>(`${BASE_URL}/warehouse-status`);
  }

  getTopItems(): Observable<TopItemsModel[]> {
    return this.httpClient.get<TopItemsModel[]>(`https://localhost:7018/api/Dashboard/top-warehouse-items`);
  }

}

