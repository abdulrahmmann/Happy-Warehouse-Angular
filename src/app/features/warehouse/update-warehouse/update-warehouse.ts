import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WarehouseService} from '../services/warehouse-service';
import {UpdateWarehouseModel} from '../../dashboard/models/UpdateWarehouse.model';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Layout} from '../../../shared/layout/layout';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {CountryModel} from '../models/Country.model';
import {CountryService} from '../services/country-service';
import {CreateWarehouseModel} from '../models/CreateWarehouse.model';
import {WarehouseByIdModel} from '../models/WarehouseById.model';

@Component({
  selector: 'app-update-warehouse',
  imports: [
    Layout,
    InputText,
    ReactiveFormsModule,
    Select
  ],
  templateUrl: './update-warehouse.html',
})
export class UpdateWarehouse implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private warehouseService = inject(WarehouseService);
  private countryService = inject(CountryService);

  countries: CountryModel[] = [];

  id: number = 0;

  warehouseById: WarehouseByIdModel | null = null;

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadCountries();
    this.getWarehouseById(this.id);
  }

  loadCountries(): void {
    this.countryService.getAllCountries().subscribe({
      next: (response: any) => {
        this.countries = response.data || [];
        console.log('✅ Countries:', this.countries);
      },
      error: (error) => {
        console.error('❌ Error loading Countries:', error);
      }
    });
  }

  updateWarehouseForm = new FormGroup({
    warehouseName: new FormControl("", {
      validators: [Validators.required, Validators.maxLength(60)]
    }),
    warehouseAddress: new FormControl("", {
      validators: [Validators.required, Validators.maxLength(500)]
    }),
    warehouseCity: new FormControl("", {
      validators: [Validators.required, Validators.maxLength(60)]
    }),
    warehouseCountry: new FormControl<CountryModel | null>(null, {
      validators: [Validators.required]
    }),
    warehouseCreatedByUserId: new FormControl("", {
      validators: [Validators.required]
    }),
  });

  adminUserId = Number(localStorage.getItem('userId'));

  onSubmit() {
    const payload: CreateWarehouseModel = {
      name: this.updateWarehouseForm.controls.warehouseName.value!,
      address: this.updateWarehouseForm.controls.warehouseAddress.value!,
      city: this.updateWarehouseForm.controls.warehouseCity.value!,
      countryId: this.updateWarehouseForm.controls.warehouseCountry.value?.id!,
      createdByUserId: this.adminUserId
    }

    this.warehouseService.putWarehouse(this.id, payload).subscribe({
      next: (res) => {
        console.log('✅ Warehouse Updated successfully:', res);
        this.BackToWarehouses();
      },
      error: (err) => {
        console.error('❌ Error Updating warehouse:', err.error());
      }
    });
  };


getWarehouseById(id: number) {
  return this.warehouseService.getWarehouseById(id).subscribe({
    next: (response: any) => {
      this.warehouseById = response.data;
    },
    error: (err: any) => {
      console.log(err);
    }
  });
}

BackToWarehouses() {
    this.router.navigate(['/warehouses']);
  }

}
