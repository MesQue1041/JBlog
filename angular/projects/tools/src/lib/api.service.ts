import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../models/user.interface';
import { Router } from '@angular/router';
import { Post } from '../../../models/post.interface';
import { Category } from '../../../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private URL = 'http://localhost:5000';
  private authState$ = new BehaviorSubject<boolean>(false);

  private user: User = {
    id: -1,
    email: '',
    firstname: '',
    lastname: '',
    profilePic: '',
    roles: '',
  }
  private user$ = new BehaviorSubject<User>(this.user);

  constructor(private http: HttpClient,
    private router: Router) { 
      
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.URL}/post`);
  }

  getPostBySlug(slug: string | null): Observable<Post> {
    return this.http.get<Post>(`${this.URL}/post/slug/${slug}`);
  }

  getAllCategories() {
    return this.http.get<Category[]>(`${this.URL}/category`);
  }
}
