import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

  getAuthState() {
    return this.authState$.asObservable();
  }

  getUserObservable() {
    return this.user$.asObservable();
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

  login(email:string, password: string) {
    return this.http.post<any>(`${this.URL}/auth/login`, {email,password}, {
      withCredentials: true
    }).pipe(
      tap((value) => {
        if (value.success) {
          this.authState$.next(true);
          this.user$.next(value.user);
        } else {
          this.authState$.next(false);
        }
      })
    )
  }
}
