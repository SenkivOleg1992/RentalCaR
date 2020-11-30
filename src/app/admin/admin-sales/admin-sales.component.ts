import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { ISales } from 'src/app/shared/interfaces/sales.interface';
import { Sales } from 'src/app/shared/models/sales.model';
import { Subscription } from 'rxjs';
import { SalesService } from 'src/app/shared/services/sales.service';

@Component({
  selector: 'app-admin-sales',
  templateUrl: './admin-sales.component.html',
  styleUrls: ['./admin-sales.component.scss']
})
export class AdminSalesComponent implements OnInit, OnDestroy {
  adminSales: Array<ISales> = [];

  saleName: string;
  saleDescription: string;
  saleMoreDescription1: string;
  saleMoreDescription2: string;
  saleMoreDescription3: string;
  saleMoreDescription4: string;
  saleImage: string;
  saleID: number;

  isEdit = false; 

  private subscription: Subscription;

  constructor(private salesService: SalesService,            
  ) { }

  ngOnInit(): void {
    this.getAdminSales();
  };
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getAdminSales(): void{
    this.subscription = this.salesService.getSales().subscribe( data => {
      this.adminSales = data;
    });
  };

  addSale(): void{
    const newSale = new Sales(
      1, 
      this.saleName,
      this.saleDescription,
      this.saleMoreDescription1,
      this.saleMoreDescription2 = ' ',
      this.saleMoreDescription3 = ' ',
      this.saleMoreDescription4 = ' ',
      this.saleImage
    );
    if(!this.isEdit) {
      newSale.id = this.generateId();
      this.salesService.addSales(newSale);
    } else {
      newSale.id = this.saleID;
      this.salesService.updateSales(newSale);
      this.isEdit = false;
    };
    this.resetForm();
  };

  private generateId(): number {
    if (this.adminSales.length > 0) {
      let sortedArr = this.adminSales.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
      let lastElement = sortedArr[sortedArr.length - 1];
      return lastElement.id + 1;
    } else {
      return 1;
    }
  }

  deleteSale(sales: ISales): void{
    this.salesService.deleteSales(sales);
  };

  editSale(sale: ISales): void{
    this.isEdit = true;
    this.saleID = sale.id;
    this.saleName = sale.name;
    this.saleDescription = sale.description;
    this.saleMoreDescription1 = sale.moreDescription1;
    this.saleMoreDescription2 = sale.moreDescription2;
    this.saleMoreDescription3 = sale.moreDescription3;
    this.saleMoreDescription4 = sale.moreDescription4;
    this.saleImage = sale.image;

  };

  private resetForm(): void{
    this.saleName = '';
    this.saleDescription = '';
    this.saleMoreDescription1 = '';
    this.saleMoreDescription2 = '';
    this.saleMoreDescription3 = '';
    this.saleMoreDescription4 = '';
    this.saleImage = '';
  };
}
