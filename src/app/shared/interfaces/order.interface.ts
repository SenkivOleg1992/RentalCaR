import { IAuto } from './auto.interface';
import { ICategory } from './category.interface';

export interface IOrder {
    id: number;
    carId: number;
    userName: string;
    userPhone: string;
    userEmail: string;
    userTimeStart: string;
    userTimeEnd: string;
    userDateStart: any;
    userDateEnd: any;
    userStreetStart: string;
    userStreetEnd: string;
    totalPayment: number;
    totalDays: number;
    image?: string;
    userComment?: string;
}