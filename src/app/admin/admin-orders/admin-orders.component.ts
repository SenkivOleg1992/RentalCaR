import { Component, OnInit } from '@angular/core';
import { IAuto } from 'src/app/shared/interfaces/auto.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { IOrder } from 'src/app/shared/interfaces/order.interface';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  
  getOrders: Array<IOrder> = [];

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getAuto();
  };

  private getAuto(): void {
    this.ordersService.getOrder().subscribe( data => {
      this.getOrders = data;
    });
  };
  
  deleteOrder( order: IOrder): void{
    this.ordersService.deleteOrder(order);
  };

}
