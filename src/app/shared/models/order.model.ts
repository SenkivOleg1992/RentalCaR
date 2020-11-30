import { IOrder } from '../interfaces/order.interface';
import { IAuto } from '../interfaces/auto.interface';

export class Order implements IOrder{
    constructor(
        public id: number,
        public carId: number,
        public userName: string,
        public userPhone: string,
        public userEmail: string,
        public userTimeStart: string,
        public userTimeEnd: string,
        public userDateStart: any,
        public userDateEnd: any,
        public userStreetStart: string,
        public userStreetEnd: string,
        public totalPayment: number,
        public totalDays: number,
        public image?: string,
        public userComment?: string
    ){}
}