import { Component, OnInit, TemplateRef } from '@angular/core';
import { IAuto } from 'src/app/shared/interfaces/auto.interface';
import { AutoService } from 'src/app/shared/services/auto.service';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Auto } from 'src/app/shared/models/auto.model';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { Order } from 'src/app/shared/models/order.model';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal/';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  auto: IAuto;

  orders: Array<IOrder> = [];

  dateStart: any;
  dateEnd: any;
  userTimeStart: any;
  userTimeEnd: any;

  userName: string;
  userPhone: string;
  userEmail: string;
  userDateStart: any;
  userDateEnd: any;
  userStreetStart: any;
  userStreetEnd: any;
  orderDetails: Array<IAuto> = [];
  totalPayment: number;
  totalDays: number = 1;
  image?: string;
  userComment: string;

  pay: any = 0;

  clientName = "^[a-zA-ZаА-ЯІа-яіЇї ]{3,}$"
  clientEmail = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9]{2,8}\.[a-zA-Z]{2,4}$";
  clientPhone = "^[\+3]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]{4,10}$"

  minDate = Date.now()-(new Date()).getTimezoneOffset()*60000;

  id: number;

  modalRef: BsModalRef;
  modalRefOrder: BsModalRef;

  constructor(
    private autoService: AutoService,
    private router: ActivatedRoute,
    private ordersService: OrdersService,
    private location: Location,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getOneAuto();
    this.getOrder();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  openModalOrder( showOrder: TemplateRef<any>) {
    this.modalRefOrder = this.modalService.show(showOrder)
  }

  private getOneAuto(): void {
    this.id = +this.router.snapshot.paramMap.get('id');
    console.log(this.id);
    this.autoService.getOneAuto(this.id).subscribe(
      (data) => {
        this.auto = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getOrder(): void {
    this.ordersService.getOrder().subscribe(
      (data) => {
        this.orders = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addToOrder(): void {
    const newOrder: IOrder = new Order(
      1,
      this.auto.id,
      this.userName,
      this.userPhone,
      this.userEmail,
      this.userTimeStart,
      this.userTimeEnd,
      (this.userDateStart = this.dateStart),
      (this.userDateEnd = this.dateEnd),
      this.userStreetStart,
      this.userStreetEnd,
      (this.totalPayment = this.totalPay()),
      (this.totalDays = this.totalDay()),
      (this.image = this.auto.image),
      this.userComment
    );
    newOrder.id = this.generateId();
    this.ordersService.addOrder(newOrder);

    this.resetOrder();
  }

  private generateId(): number {
    if (this.orders.length > 0) {
      let sortedArr = this.orders.sort((a, b) =>
        a.id > b.id ? 1 : b.id > a.id ? -1 : 0
      );
      let lastElement = sortedArr[sortedArr.length - 1];
      return lastElement.id + 1;
    } else {
      return 1;
    }
  }

  totalPay(): any {
    let currentPay = this.totalDay();
    if (currentPay >= 15) {
      return (this.pay = this.auto.price15AndMore * currentPay);
    } else if (currentPay >= 1 && currentPay < 8) {
      return (this.pay = this.auto.price1_7 * currentPay);
    } else if (currentPay >= 8 && currentPay < 15) {
      return (this.pay = this.auto.price8_14 * currentPay);
    } else if( currentPay === 0)  {
      return (this.pay = this.auto.price1_7)
    } else {
      this.pay = 0;
    }
  }

  totalDay(): any {
    let start = new Date(this.dateStart);
    let end = new Date(this.dateEnd);
    let differenceTime = end.getTime() - start.getTime();
    let result = differenceTime / (1000 * 3600 * 24);
    if (start == null || end == null) {
      return 1;
    } else {
      return result;
    }
  }

  onDateChanged(template: TemplateRef<any>) {
    if (
      this.dateStart == undefined ||
      this.dateEnd == undefined ||
      this.orders == null
    ) {
      return;
    }
    let startTimestamp = new Date(this.dateStart).getTime();
    let endTimestamp = new Date(this.dateEnd).getTime();

    let modalBoolean = false;
    
    const filterOrders = this.orders.filter( ord => ord.carId === this.id)

    filterOrders.forEach(function (currentOrder, ind, ord) {
      let startDate = new Date(currentOrder.userDateStart).getTime();
      let endDate = new Date(currentOrder.userDateEnd).getTime();
      
      if (startTimestamp >= startDate && endTimestamp <= startDate) {
        modalBoolean = true;
      } else if (startTimestamp >= endDate && endTimestamp <= endDate) {
        modalBoolean = true;
      } else if (startDate >= startTimestamp && startDate <= endTimestamp) {
        modalBoolean = true;
      } else if (endDate >= startTimestamp && endDate <= endTimestamp) {
        modalBoolean = true
      } 
    });

    if( modalBoolean) {
      this.modalRef = this.modalService.show(template)
      modalBoolean = false;
    } 
  }

  backToCatalog(): void {
    this.location.back();
  }

  resetOrder(): void {}
}
