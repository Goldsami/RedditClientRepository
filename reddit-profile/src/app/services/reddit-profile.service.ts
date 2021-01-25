import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URLList } from './URLs';

@Injectable({
  providedIn: 'root'
})
export class RedditProfileService {

  constructor(private http: HttpClient) { }

  profile: object;
  posts: object;

  testFunc(): any {
    return 'Service data';
  }

  getSubredditPage(): Observable<any> {
    return this.http.get<any>(URLList.redditProfileAbout);
  }

  getSubredditPosts(): Observable<any> {
    return this.http.get<any>(URLList.redditProfilePosts)
  }


}
