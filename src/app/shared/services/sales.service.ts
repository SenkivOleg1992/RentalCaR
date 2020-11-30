import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISales } from '../interfaces/sales.interface';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  private url: string;

  constructor( private firestore: AngularFirestore,
              private http: HttpClient) {
    this.url = 'http://localhost:3000/sales';
  }
  getSales(): Observable<Array<ISales>> {
    return this.firestore.collection<ISales>('sales').valueChanges();
  };

  getOneSales(id: number): Observable<ISales> {
    return this.firestore.collection<ISales>('sales')
      .doc(id.toString()).get().pipe(
        map( data => {
          return data.data() as ISales
        })
      );
  };

  addSales(sales: ISales): void{
    const _sales: ISales = {
      id: sales.id,
      name: sales.name,
      description: sales.description,
      moreDescription1: sales.moreDescription1,
      moreDescription2: sales.moreDescription2,
      moreDescription3: sales.moreDescription3,
      moreDescription4: sales.moreDescription4,
      image: sales.image
    };
    this.firestore.collection<ISales>('sales').doc(sales.id.toString()).set(_sales);
  };
  deleteSales(sales: ISales ): void {
    this.firestore.collection<ISales>('sales').doc(sales.id.toString()).delete();
  };

  updateSales(sales: ISales): void{
    const _sales: ISales = {
      id: sales.id,
      name: sales.name,
      description: sales.description,
      moreDescription1: sales.moreDescription1,
      moreDescription2: sales.moreDescription2,
      moreDescription3: sales.moreDescription3,
      moreDescription4: sales.moreDescription4,
      image: sales.image
    };
    this.firestore.collection<ISales>('sales').doc(sales.id.toString()).set(_sales);
  };

  // getSales(): Observable<Array<ISales>>{
  //   return this.http.get<Array<ISales>>(this.url);
  // };
  // getOneSale(id: number): Observable<ISales>{
  //   return this.http.get<ISales>(`${this.url}/${id}`)
  // };
  // addSales(sale: ISales ): Observable<Array<ISales>>{
  //   return this.http.post<Array<ISales>>(this.url, sale)
  // };
  // deleteSales(sale: ISales): Observable<Array<ISales>>{
  //   return this.http.delete<Array<ISales>>(`${this.url}/${sale.id}`)
  // };
  // updateSales(sale: ISales): Observable<Array<ISales>>{
  //   return this.http.put<Array<ISales>>(`${this.url}/${sale.id}`, sale)
  // };
  
}
