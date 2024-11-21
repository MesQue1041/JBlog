import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../../../../models/post.interface';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../../tools/src/lib/api.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-single-post',
  imports: [DatePipe, CommonModule],
  templateUrl: './single-post.component.html',
  styleUrl: './single-post.component.scss'
})
export class SinglePostComponent implements OnInit {
  // @ts-ignore
  post: Observable<Post>;


  constructor(private route: ActivatedRoute,
    private apiService: ApiService
  ) {
    
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.post = this.apiService.getPostBySlug(slug);
    })
    
  }

}
