import { ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { RedditPost } from './../models/RedditPost';
import { RedditProfile } from './../models/RedditProfile';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URLList } from './URLs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedditProfileService implements OnDestroy {
  private _profile: BehaviorSubject<RedditProfile> = new BehaviorSubject<RedditProfile>(null);
  private _posts: BehaviorSubject<RedditPost[]> = new BehaviorSubject<RedditPost[]>([]);
  private _subredditName: string;
  private _subscriptions: Subscription[] = [];

  constructor(private http: HttpClient, private _toastController: ToastController) {
    console.debug('CONSTRUCTOR');
    this._subredditName = localStorage.getItem('subredditName') || 'random';
    console.debug(this._subredditName);
    this.getSubredditProfile(this._subredditName);
    this._subscriptions.push(
      this._profile.subscribe(x => {
        if (x) {
          this._subredditName = x.displayName;
          localStorage.setItem('subredditName', this._subredditName);
          this.getSubredditPosts(this._subredditName);
        };
      }));
  }

  profile = this._profile.asObservable();
  posts = this._posts.asObservable();

  getSubredditProfile(name: string) {
    this._subscriptions.push(
      this.http.get<any>(URLList.redditProfileAbout.replace('$profile_name', name)).subscribe(res => {
        console.debug('GET PROFILE');
        this._profile.next(
          new RedditProfile(res.data.name, res.data.display_name, res.data.title, res.data.community_icon));
      })
    )
  }

  getSubredditPosts(name: string) {
    this._subscriptions.push(
      this.http.get<any>(URLList.redditProfilePosts.replace('$profile_name', name)).subscribe(res => {
        console.debug('GET POSTS');
        this._posts.next(
          res.data.children.map(x =>
            new RedditPost(x.data.id, x.data.title, x.data.url, x.data.subreddit_id,
              x.data.author, x.data.selftext, x.data.num_comments, x.data.created_utc, x.data.score)));
      }))
  };

  openPostInBrowser(postId: string) {
    window.open(URLList.postUrl.replace('$profile_name', this._subredditName) + postId);
  }

  refreshPage() {
    localStorage.clear();
    window.location.reload();
  }

  async presentToast(message: string, color: string) {
    const toast = await this._toastController.create({
      message: message,
      duration: 1000,
      color: color
    });
    toast.present();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

}



