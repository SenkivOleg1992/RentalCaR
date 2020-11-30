import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Category } from 'src/app/shared/models/category.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss'],
})
export class AdminCategoryComponent implements OnInit {
  nameUA: string;
  nameEN: string;
  categoryID: number;
  adminCategory: Array<ICategory> = [];

  isEdit = false;

  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.getCategory();
  };

  private getCategory(): void {
    this.categoryService.getCategory().subscribe((data) => {
      this.adminCategory = data;
    });
  };

  addCategory(): void {
    const category: ICategory = new Category(1, this.nameUA, this.nameEN);
    if (!this.isEdit) {
        category.id = this.generateId();
        console.log(category.id)
        console.log(this.adminCategory);
      this.categoryService.addCategory(category);
    } else {
      category.id = this.categoryID;
      this.categoryService.updateCategory(category);
      this.isEdit = false;
    }
    this.resetForm();
  };

  private generateId(): number {
    if (this.adminCategory.length > 0) {
      let sortedArr = this.adminCategory.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
      let lastElement = sortedArr[sortedArr.length - 1];
      return lastElement.id + 1;
    } else {
      return 1;
    }
  }

  editCategory(category: ICategory): void {
    this.isEdit = true;
    this.categoryID = category.id;
    this.nameUA = category.nameUA;
    this.nameEN = category.nameEN;
  };

  public deleteCategory(category: ICategory): void {
    this.categoryService.deleteCategory(category)
    this.resetForm();
  };

  private resetForm(): void {
    this.nameUA = '';
    this.nameEN = '';
  };
}
