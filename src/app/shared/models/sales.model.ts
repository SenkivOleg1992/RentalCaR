import { ISales } from '../interfaces/sales.interface';

export class Sales  implements ISales{
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public moreDescription1?: string,
        public moreDescription2?: string,
        public moreDescription3?: string,
        public moreDescription4?: string,
        public image?: string
    ){}
}