import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:3320/posts');
  }

  
  createPost(post: Post): Observable<Post[]> {
    return this.http.post<Post[]>('http://localhost:3320/admin/store', post);
  }
  
}
