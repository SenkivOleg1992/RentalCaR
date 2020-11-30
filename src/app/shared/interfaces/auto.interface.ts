import { ICategory } from './category.interface';

export interface IAuto {
  id: number;
  category: ICategory;
  nameUA: string;
  nameEN: string;
  deposit: number;
  price1_7: number;
  price8_14: number;
  price15AndMore: number;
  transmission: string;
  engine: string;
  seats: number;
  fuel: string;
  bodyType: string;
  image?: string;
}
