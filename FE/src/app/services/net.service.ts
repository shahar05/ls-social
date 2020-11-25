import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Like, Post, User } from '../models';

const URL = environment.serverURL;

@Injectable({
  providedIn: 'root'
})

export class NetService {



  constructor(private http: HttpClient) { }
  getUser(): Observable<object> {
    return this.http.get(`${URL}/user`);
  }

  login(user: Partial<User>): Observable<object> {
    return this.http.post(`${URL}/user/login`, user);
  }

  register(user: User): Observable<object> {
    return this.http.post(`${URL}/user/register`, user);
  }

  createPost(post: Post): Observable<object> {
    return this.http.post(`${URL}/post`, post);
  }
  getPosts(offset: number = 0): Observable<object> {
    return this.http.get(`${URL}/post?offset=${offset}`);
  }
  likeToggle(like: Like): Observable<object> {
    return this.http.put(`${URL}/post/like`, like);
  }
  deletePost(post: Post): Observable<object> {
    return this.http.delete(`${URL}/post/${post._id}`);
  }
  updatePost(post: Post, postId: string): Observable<object> {
    return this.http.put(`${URL}/post/${postId}`, post);
  }
}


