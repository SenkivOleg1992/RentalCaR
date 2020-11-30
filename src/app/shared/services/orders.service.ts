import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../interfaces/order.interface';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  basket: Subject<any> = new Subject<any>();
  

  constructor(private firestore: AngularFirestore,
              private http: HttpClient ) {
  };

  getOrder(): Observable<Array<IOrder>>{
    return this.firestore.collection<IOrder>('orders').valueChanges();
  };

  addOrder( order: IOrder): void {
    const _order:IOrder = {
      id: order.id,
      carId: order.carId,
      userName: order.userName,
      userPhone: order.userPhone,
      userEmail: order.userEmail,
      userTimeStart: order.userTimeStart,
      userTimeEnd: order.userTimeEnd,
      userDateStart: order.userDateStart,
      userDateEnd: order.userDateEnd,
      userStreetStart: order.userStreetStart,
      userStreetEnd: order.userStreetEnd,
      totalPayment: order.totalPayment,
      totalDays: order.totalDays,
      image: order.image
    };
    this.firestore.collection<IOrder>('orders').doc(order.id.toString()).set(_order);
  };

  deleteOrder( order: IOrder ):void {
    this.firestore.collection<IOrder>('orders').doc(order.id.toString()).delete()
  }

  updateOrder( order: IOrder ): void {
    const _order:IOrder = {
      id: order.id,
      carId: order.carId,
      userName: order.userName,
      userPhone: order.userPhone,
      userEmail: order.userEmail,
      userTimeStart: order.userTimeStart,
      userTimeEnd: order.userTimeEnd,
      userDateStart: order.userDateStart,
      userDateEnd: order.userDateEnd,
      userStreetStart: order.userStreetStart,
      userStreetEnd: order.userStreetEnd,
      totalPayment: order.totalPayment,
      totalDays: order.totalDays,
      image: order.image
    };
    this.firestore.collection<IOrder>('orders').doc(order.id.toString()).set(_order);
  };

}
