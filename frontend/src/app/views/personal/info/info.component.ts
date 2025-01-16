import { Component, OnInit } from '@angular/core';
import {DeliveryType} from "../../../../types/delivery.type";
import {PaymentType} from "../../../../types/payment.type";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  userInfoForm

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

    protected readonly deliveryTypes = DeliveryType;
    protected readonly paymentTypes = PaymentType;
}
