import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../../../../models/category.interface';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Subject, takeUntil } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit, OnDestroy{

  cats: Category[] = [];
  sub$ = new Subject<void>(); // Fixed property declaration and initialization


  constructor(private apiService: ApiService) {}


  ngOnInit(): void {
    this.apiService.getAllCategories()
    .pipe(takeUntil(this.sub$))
    .subscribe(res => {
      console.log('Categories:', res); // Log the categories to check if the data is being fetched correctly
      this.cats = res;
    });
  }

  ngOnDestroy(): void {
    this.sub$.next();
    this.sub$.complete();
  }



}
