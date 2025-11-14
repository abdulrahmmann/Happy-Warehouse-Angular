import {Component, OnInit} from '@angular/core';
import {Layout} from '../../../shared/layout/layout';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-add-item',
  imports: [
    Layout,
    InputText,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './add-item.html',
})
export class AddItem implements OnInit {

  ngOnInit(): void {

  }

  addItemForm = new FormGroup ({
    itemName: new FormControl('', {

    }),
    skuCode: new FormControl('', {

    }),
    qty: new FormControl('', {

    }),
    costPrice: new FormControl('', {

    }),
    msrpPrice: new FormControl('', {

    }),
    warehouseId: new FormControl('', {

    }),
    createdByUserId: new FormControl('', {

    }),
    createdBy: new FormControl('', {

    }),
  });

  onSubmit() {

  }


}
