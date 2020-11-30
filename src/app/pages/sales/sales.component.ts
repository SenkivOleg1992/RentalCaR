import { Component, OnInit } from '@angular/core';
import { ISales } from 'src/app/shared/interfaces/sales.interface';
import { SalesService } from 'src/app/shared/services/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  sales:Array<ISales> = [];

  constructor(
    private salesService: SalesService,
  ) { }

  ngOnInit(): void {
    this.getSales();
  };

  private getSales(): void{
    this.salesService.getSales().subscribe( data => {
      this.sales = data;
    }, err => {
      console.log(err);
    });
  };

}
