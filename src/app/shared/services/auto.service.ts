import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAuto } from '../interfaces/auto.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AutoService {
  private url: string;

  constructor(private firestore: AngularFirestore) {}

  getAuto(): Observable<Array<IAuto>> {
    return this.firestore.collection<IAuto>('auto').valueChanges();
  };

  getOneAuto(id: number): Observable<IAuto> {
    return this.firestore
      .collection<IAuto>('auto')
      .doc(id.toString())
      .get()
      .pipe(
        map( data => {
          return data.data() as IAuto;
        })
      );
  };
  

  addAuto(auto: IAuto): void {
    let image: String = "";

    if (auto.image != undefined) {
      image = auto.image;
    };

    let _auto = {
      id: auto.id,
      category: {
        id: auto.category.id,
        nameUA: auto.category.nameUA,
        nameEN: auto.category.nameEN
      },
      nameUA: auto.nameUA,
      nameEN: auto.nameEN,
      deposit: auto.deposit,
      price1_7: auto.price1_7,
      price8_14: auto.price8_14,
      price15AndMore: auto.price15AndMore,
      transmission: auto.transmission,
      engine: auto.engine,
      seats: auto.seats,
      fuel: auto.fuel,
      bodyType: auto.bodyType,
      image: image,
    };

    this.firestore
      .collection<IAuto>('auto')
      .doc(auto.id.toString())
      .set(_auto);
  };

  deleteAuto(auto: IAuto): void {
    this.firestore
      .collection<IAuto>('auto')
      .doc(auto.id.toString())
      .delete();
  };

  updateAuto(auto: IAuto): void {

    let image: String = "";

    if (auto.image != undefined) {
      image = auto.image;
    };

    let _auto = {
      id: auto.id,
      category: {
        id: auto.category.id,
        nameUA: auto.category.nameUA,
        nameEN: auto.category.nameEN
      },
      nameUA: auto.nameUA,
      nameEN: auto.nameEN,
      deposit: auto.deposit,
      price1_7: auto.price1_7,
      price8_14: auto.price8_14,
      price15AndMore: auto.price15AndMore,
      transmission: auto.transmission,
      engine: auto.engine,
      seats: auto.seats,
      fuel: auto.fuel,
      bodyType: auto.bodyType,
      image: image
    };

    this.firestore
      .collection<IAuto>('auto')
      .doc(auto.id.toString())
      .set(_auto);
  };
  
}
