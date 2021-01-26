import { RedditPost } from './../models/RedditPost';
import { RedditProfile } from './../models/RedditProfile';
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

  profile: RedditProfile;
  posts: RedditPost[];

  getSubredditProfile(): Observable<any> {
    return this.http.get<any>(URLList.redditProfileAbout).pipe(map(res => {
      this.profile = new RedditProfile(res.data.name, res.data.display_name, res.data.title, res.data.community_icon);
      console.debug(this.profile);
      return this.profile;
    }));
  }

  getSubredditPosts(): Observable<any> {
    return this.http.get<any>(URLList.redditProfilePosts).pipe(map(res => {
      this.posts = res.data.children.map(x => new RedditPost(x.data.id, x.data.title, x.data.url, x.data.subreddit_id));
      console.debug(this.posts);
      return this.posts;
    }));
  };


}



