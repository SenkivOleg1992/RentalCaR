import { IAuto } from '../interfaces/auto.interface';
import { ICategory } from '../interfaces/category.interface';

export class Auto implements IAuto{
  constructor(
    public id: number,
    public category: ICategory,
    public nameUA: string,
    public nameEN: string,
    public deposit: number,
    public price1_7: number,
    public price8_14: number,
    public price15AndMore: number,
    public transmission: string,
    public engine: string,
    public seats: number,
    public fuel: string,
    public bodyType: string,
    public image?: string
  ){}

}