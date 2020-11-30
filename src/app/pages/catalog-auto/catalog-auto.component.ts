import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { AutoService } from 'src/app/shared/services/auto.service';
import { IAuto } from 'src/app/shared/interfaces/auto.interface';

@Component({
  selector: 'app-catalog-auto',
  templateUrl: './catalog-auto.component.html',
  styleUrls: ['./catalog-auto.component.scss'],
})
export class CatalogAutoComponent implements OnInit {
  autoCatalog: Array<IAuto> = [];
  suma = 0;
  getAuto: Array<IAuto> = [];

  constructor(
    private ordersService: OrdersService,
    private autoService: AutoService
  ) {}

  ngOnInit(): void {
    this.getAutoFromAutoComp();
  }

  private getAutoFromAutoComp(): void {
    this.autoService.getAuto().subscribe((data) => {
      this.autoCatalog = data;
    });
  }
  private autoLength(): void {
    this.ordersService.basket.subscribe(data => {
      this.getAuto.push(data);
      this.suma = this.getAuto.reduce(
        (accum, auto) => accum + auto.price1_7,
        0
      );
    });
  };

  addToOrder(auto: IAuto): void {
    this.ordersService.basket.next(auto)
    ;
  }
}
