import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from 'src/app/shared/services/sales.service';
import { ISales } from 'src/app/shared/interfaces/sales.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sales-details',
  templateUrl: './sales-details.component.html',
  styleUrls: ['./sales-details.component.scss']
})
export class SalesDetailsComponent implements OnInit {

  sale: ISales;

  constructor(private router: ActivatedRoute,
              private salesService: SalesService,
              private location: Location
  ) { }

  ngOnInit(): void {
    this.getSale();
  };

  private getSale(): void{
    const id = +this.router.snapshot.paramMap.get('id');
    this.salesService.getOneSales(id).subscribe( data => {
      this.sale = data;
    }, err => {
      console.log(err);
    });
  };

  backToSales(): void{
    this.location.back();
  };
}
