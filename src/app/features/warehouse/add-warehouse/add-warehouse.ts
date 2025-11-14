import {Component, CreateEffectOptions, inject, OnInit} from '@angular/core';
import {Layout} from '../../../shared/layout/layout';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import {CountryService} from '../services/country-service';
import {CountryModel} from '../models/Country.model';
import {CreateWarehouseModel} from '../models/CreateWarehouse.model';
import {WarehouseService} from '../services/warehouse-service';

@Component({
  selector: 'app-add-warehouse',
  imports: [
    Layout,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    SelectModule
  ],
  templateUrl: './add-warehouse.html',
})
export class AddWarehouse implements OnInit {
  private router = inject(Router);
  private countryService = inject(CountryService);
  private warehouseService = inject(WarehouseService);

  countries: CountryModel[] = [];

  BackToWarehouses() {
    this.router.navigate(['/warehouses']);
  }

  ngOnInit() {
    this.loadCountries();
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

  addWarehouseForm = new FormGroup({
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
      name: this.addWarehouseForm.controls.warehouseName.value!,
      address: this.addWarehouseForm.controls.warehouseAddress.value!,
      city: this.addWarehouseForm.controls.warehouseCity.value!,
      countryId: this.addWarehouseForm.controls.warehouseCountry.value?.id!,
      createdByUserId: this.adminUserId
    };

    this.warehouseService.postWarehouse(payload).subscribe({
      next: (res) => {
        console.log('✅ Warehouse added successfully:', res);
        this.BackToWarehouses();
        this.warehouseService.loadWarehouses();
      },
      error: (err) => {
        console.error('❌ Error adding warehouse:', err);
      }
    });
  }

}
