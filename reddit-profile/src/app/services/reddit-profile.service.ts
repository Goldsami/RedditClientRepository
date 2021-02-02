import { ToastController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { RedditPost } from './../models/RedditPost';
import { RedditProfile } from './../models/RedditProfile';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageKeys, URLList } from './constants';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedditProfileService implements OnDestroy {
  private _profile: BehaviorSubject<RedditProfile> = new BehaviorSubject<RedditProfile>(null);
  private _posts: BehaviorSubject<RedditPost[]> = new BehaviorSubject<RedditPost[]>([]);
  private _savedPostsIds: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private _deletedPostsIds: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private _subredditName: string;
  private _subscriptions: Subscription[] = [];

  constructor(private http: HttpClient, private _toastController: ToastController) {
    this._subredditName = localStorage.getItem(LocalStorageKeys.subredditName) || 'random';

    this.getSavedPostsIds();
    this.getDeletedPostsIds();

    this.getSubredditProfile(this._subredditName);

    this._subscriptions.push(
      this._profile.subscribe(x => {
        if (x) {
          this._subredditName = x.displayName;
          localStorage.setItem(LocalStorageKeys.subredditName, this._subredditName);
          this.getSubredditPosts(this._subredditName);
        };
      }));
  }

  profile = this._profile.asObservable();
  posts = this._posts.asObservable();
  savedPostsIds = this._savedPostsIds.asObservable();
  deletedPostsIds = this._deletedPostsIds.asObservable();

  getSubredditProfile(name: string) {
    this._subscriptions.push(
      this.http.get<any>(URLList.redditProfileAbout.replace('$profile_name', name)).subscribe(res => {
        console.debug('GET PROFILE');
        this._profile.next(
          new RedditProfile(res.data.name, res.data.display_name, res.data.title, res.data.icon_img));
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

  getSavedPostsIds() {
    let items = localStorage.getItem(LocalStorageKeys.savedPostsIds);
    this._savedPostsIds.next(items ? items.split(',') : []);
  }

  getDeletedPostsIds() {
    let items = localStorage.getItem(LocalStorageKeys.deletedPostsIds);
    this._deletedPostsIds.next(items ? items.split(',') : []);
  }

  savePost(postId: string) {
    console.debug('savePost');
    this._subscriptions.push(this.savedPostsIds.subscribe(x =>
      localStorage.setItem(LocalStorageKeys.savedPostsIds, x.concat(postId).join(','))
    ));
    this.getSavedPostsIds();
  }

  deletePost(postId: string) {
    console.debug('deletePost');
    this._subscriptions.push(this.deletedPostsIds.subscribe(x =>
      localStorage.setItem(LocalStorageKeys.deletedPostsIds, x.concat(postId).join(','))
    ));
    this.getDeletedPostsIds();
  }

  removePostFromSaved(postId: string) {
    console.debug('unSavePost');
    this._subscriptions.push(this.savedPostsIds.subscribe(x => {
      localStorage.setItem(LocalStorageKeys.savedPostsIds, x.filter(i => i !== postId).join(','));
    }));
    this.getSavedPostsIds();
  }

  removePostFromDeleted(postId: string) {
    console.debug('restorePost');
    this._subscriptions.push(this.deletedPostsIds.subscribe(x => {
      localStorage.setItem(LocalStorageKeys.deletedPostsIds, x.filter(i => i !== postId).join(','));
    }));
    this.getDeletedPostsIds();
  }

  openPostInBrowser(postId: string) {
    window.open(URLList.postUrl.replace('$profile_name', this._subredditName) + postId);
  }

  refreshPage() {
    // localStorage.removeItem(LocalStorageKeys.subredditName);
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



