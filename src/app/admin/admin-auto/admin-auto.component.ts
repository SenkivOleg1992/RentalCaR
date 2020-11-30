import { Component, OnInit } from '@angular/core';
import { IAuto } from 'src/app/shared/interfaces/auto.interface';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { AutoService } from 'src/app/shared/services/auto.service';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { IcuPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Auto } from 'src/app/shared/models/auto.model';

@Component({
  selector: 'app-admin-auto',
  templateUrl: './admin-auto.component.html',
  styleUrls: ['./admin-auto.component.scss'],
})
export class AdminAutoComponent implements OnInit {
  adminCategory: Array<ICategory> = [];
  adminAuto: Array<IAuto> = [];

  autoCategory: ICategory = {
    id: 1,
    nameUA: 'преміум',
    nameEN: 'premium',
  };
  autoNameUA: string;
  autoNameEN: string;
  autoID: number;
  autoDescription: string;
  autoDeposit: number;
  autoPrice1_7: number;
  autoPrice8_14: number;
  autoPrice15AndMore: number;
  autoTransmission: string;
  autoEngine: string;
  autoSeats: number;
  autoFuel: string;
  autoBodyType: string;
  autoCount: number;
  autoImage?: string;

  isEdit: boolean;

  uploadProgress: Observable<number>;

  constructor(
    private categoryService: CategoriesService,
    private autoService: AutoService,
    private afStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.getAuto();
  };

  private getCategory(): void {
    this.categoryService.getCategory().subscribe((data) => {
      this.adminCategory = data;
    });
  }

  private getAuto(): void {
    this.autoService.getAuto().subscribe((data) => {
      this.adminAuto = data;
    });
  };

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then((e) => {
      this.afStorage
        .ref(`images/${e.metadata.name}`)
        .getDownloadURL()
        .subscribe((url) => {
          this.autoImage = url;
        });
    });
  };

  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c
    ) {
      let r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  addAuto(): void {
    const auto: IAuto = new Auto(
      1,
      this.autoCategory,
      this.autoNameUA,
      this.autoNameEN,
      this.autoDeposit,
      this.autoPrice1_7,
      this.autoPrice8_14,
      this.autoPrice15AndMore,
      this.autoTransmission,
      this.autoEngine,
      this.autoSeats,
      this.autoFuel,
      this.autoBodyType,
      this.autoImage
    );
    if (!this.isEdit) {
      console.log("Generate id");
      console.log(this.generateId());
      auto.id = this.generateId();
      this.autoService.addAuto(auto);
    } else {
      auto.id = this.autoID;
      this.autoService.updateAuto(auto);
      this.isEdit = false;
      console.log(auto);
      console.log(this.adminAuto)
    }
    this.resetForm();
  };


  private generateId(): number {
    if (this.adminAuto.length > 0) {
      let sortedArr = this.adminAuto.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
      let lastElement = sortedArr[sortedArr.length - 1];
      return lastElement.id + 1;
    } else {
      return 1;
    }
  }

  public deleteAuto(auto: IAuto): void {
    this.autoService.deleteAuto(auto);
    this.resetForm();
  };

  public editAuto(auto: IAuto): void {
    this.isEdit = true;
    this.autoID = auto.id;
    this.autoCategory = auto.category;
    this.autoNameUA = auto.nameUA;
    this.autoNameEN = auto.nameEN;
    this.autoDeposit = auto.deposit;
    this.autoPrice1_7 = auto.price1_7;
    this.autoPrice8_14 = auto.price8_14;
    this.autoPrice15AndMore = auto.price15AndMore;
    this.autoTransmission = auto.transmission;
    this.autoEngine = auto.engine;
    this.autoSeats = auto.seats;
    this.autoFuel = auto.fuel;
    this.autoBodyType = auto.bodyType;
    this.autoImage = auto.image;
  };

  public resetForm(): void {
    this.autoCategory;
    this.autoNameUA = '';
    this.autoNameEN = '';
    this.autoDeposit = 0;
    this.autoPrice1_7 = 0;
    this.autoPrice8_14 = 0;
    this.autoPrice15AndMore;
    this.autoTransmission = '';
    this.autoEngine = '';
    this.autoSeats;
    this.autoFuel = '';
    this.autoBodyType = '';
    this.autoImage = '';
  };
  
}
