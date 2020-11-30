import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from '../interfaces/category.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { IOrder } from '../interfaces/order.interface';
import { IAuto } from '../interfaces/auto.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: AngularFirestore) {}

  getCategory(): Observable<Array<ICategory>> {
    return this.firestore.collection<ICategory>('categories').valueChanges();
  };

  addCategory(category: ICategory): void {
    let _category: ICategory = {
      id: category.id,
      nameUA: category.nameUA,
      nameEN: category.nameEN,
    };
    this.firestore
      .collection<ICategory>('categories')
      .doc(category.id.toString())
      .set(_category);
  };

  deleteCategory(category: ICategory): void {
    this.firestore
      .collection<ICategory>('categories')
      .doc(category.id.toString())
      .delete();
  };

  updateCategory(category: ICategory): void {
    let _category: ICategory = {
      id: category.id,
      nameUA: category.nameUA,
      nameEN: category.nameEN,
    };

    this.firestore
      .collection<ICategory>('categories')
      .doc(category.id.toString())
      .set(_category);
  };
  
}
