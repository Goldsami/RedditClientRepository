import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URLList } from './URLs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedditProfileService {

  constructor(private http: HttpClient) { }

  profile: any;
  posts: any[];

  testFunc(): any {
    return 'Service data';
  }

  getSubredditPage(): Observable<any> {
    return this.http.get<any>(URLList.redditProfileAbout).pipe(res => {
      console.debug('getSubPage');
      res.subscribe(x => this.profile = x.data);
      return res;
    });
  }

  getSubredditPosts(): Observable<any> {
    return this.http.get<any>(URLList.redditProfilePosts).pipe(res => {
      console.debug('getSubPage');
      res.subscribe(x => this.posts = x.data.children);
      return res;
    });
  }


}
