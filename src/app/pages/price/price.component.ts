import { Component, OnInit } from '@angular/core';
import { IAuto } from 'src/app/shared/interfaces/auto.interface';
import { AutoService } from 'src/app/shared/services/auto.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit {

  priceTable: Array<IAuto> = [];

  constructor(private autoService: AutoService,
  ) { }

  ngOnInit(): void {
    this.getAutoFromAutoComp();
  };

  private getAutoFromAutoComp(): void {
    this.autoService.getAuto().subscribe( data => {
      this.priceTable = data;
    });
  };

}
