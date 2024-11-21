import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { Post } from '../../../../../models/post.interface';
import { Subject, takeUntil, map } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Category } from '../../../../../models/category.interface';
import { CategoryListComponent } from '../category-list/category-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [RouterModule, DatePipe, CommonModule, CategoryListComponent],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: Post[] = []; // Holds the list of posts
  sub$ = new Subject<void>(); // For unsubscription on destroy

  constructor(
    private readonly apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.sub$)).subscribe(params => {
      const catTitle = params.get('title'); // Get the title from route parameters

      if (catTitle) {
        // If category title exists, filter posts by category
        this.apiService
          .getAllPosts()
          .pipe(
            map(posts => posts.filter(p => p.category.title === catTitle)),
            takeUntil(this.sub$)
          )
          .subscribe(filteredPosts => {
            this.posts = filteredPosts;
          });
      } else {
        // Otherwise, fetch all posts
        this.apiService
          .getAllPosts()
          .pipe(takeUntil(this.sub$))
          .subscribe(allPosts => {
            this.posts = allPosts;
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub$.next(); // Trigger unsubscription
    this.sub$.complete(); // Complete the Subject
  }
}
