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
  providedIn: 'root',
})
export class RedditProfileService implements OnDestroy {
  private profileSubject: BehaviorSubject<RedditProfile> =
    new BehaviorSubject<RedditProfile>(null);
  private postsSubject: BehaviorSubject<RedditPost[]> = new BehaviorSubject<
    RedditPost[]
  >([]);
  private savedPostsIdsSubject: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  private deletedPostsIdsSubject: BehaviorSubject<string[]> =
    new BehaviorSubject<string[]>([]);
  private subredditNameSubject: string;
  private subscriptionsSubject: Subscription[] = [];

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) {
    this.subredditNameSubject =
      localStorage.getItem(LocalStorageKeys.SUBREDDIT_NAME) || 'random';

    this.getSavedPostsIds();
    this.getDeletedPostsIds();

    this.getSubredditProfile(this.subredditNameSubject);

    this.subscriptionsSubject.push(
      this.profileSubject.subscribe((x) => {
        if (x) {
          this.subredditNameSubject = x.displayName;
          localStorage.setItem(
            LocalStorageKeys.SUBREDDIT_NAME,
            this.subredditNameSubject
          );
          this.getSubredditPosts(this.subredditNameSubject);
        }
      })
    );
  }

  profile = this.profileSubject.asObservable();
  posts = this.postsSubject.asObservable();
  savedPostsIds = this.savedPostsIdsSubject.asObservable();
  deletedPostsIds = this.deletedPostsIdsSubject.asObservable();

  getSubredditProfile(name: string) {
    this.subscriptionsSubject.push(
      this.http
        .get<any>(URLList.REDDIT_PROFILE_ABOUT.replace('$profile_name', name))
        .subscribe((res) => {
          this.profileSubject.next(
            new RedditProfile(
              res.data.name,
              res.data.display_name,
              res.data.title,
              res.data.icon_img
            )
          );
        })
    );
  }

  getSubredditPosts(name: string) {
    this.subscriptionsSubject.push(
      this.http
        .get<any>(URLList.PREDIT_PROFILE_POSTS.replace('$profile_name', name))
        .subscribe((res) => {
          this.postsSubject.next(
            res.data.children.map(
              (x) =>
                new RedditPost(
                  x.data.id,
                  x.data.title,
                  x.data.url,
                  x.data.subreddit_id,
                  x.data.author,
                  x.data.selftext,
                  x.data.num_comments,
                  x.data.created_utc,
                  x.data.score
                )
            )
          );
        })
    );
  }

  getSavedPostsIds() {
    const items = localStorage.getItem(LocalStorageKeys.SAVED_POSTS_IDS);
    this.savedPostsIdsSubject.next(items ? items.split(',') : []);
  }

  getDeletedPostsIds() {
    const items = localStorage.getItem(LocalStorageKeys.DELETED_POSTS_IDS);
    this.deletedPostsIdsSubject.next(items ? items.split(',') : []);
  }

  savePost(postId: string) {
    this.subscriptionsSubject.push(
      this.savedPostsIds.subscribe((x) =>
        localStorage.setItem(
          LocalStorageKeys.SAVED_POSTS_IDS,
          x.concat(postId).join(',')
        )
      )
    );
    this.getSavedPostsIds();
  }

  deletePost(postId: string) {
    this.subscriptionsSubject.push(
      this.deletedPostsIds.subscribe((x) =>
        localStorage.setItem(
          LocalStorageKeys.DELETED_POSTS_IDS,
          x.concat(postId).join(',')
        )
      )
    );
    this.getDeletedPostsIds();
  }

  removePostFromSaved(postId: string) {
    this.subscriptionsSubject.push(
      this.savedPostsIds.subscribe((x) => {
        localStorage.setItem(
          LocalStorageKeys.SAVED_POSTS_IDS,
          x.filter((i) => i !== postId).join(',')
        );
      })
    );
    this.getSavedPostsIds();
  }

  removePostFromDeleted(postId: string) {
    this.subscriptionsSubject.push(
      this.deletedPostsIds.subscribe((x) => {
        localStorage.setItem(
          LocalStorageKeys.DELETED_POSTS_IDS,
          x.filter((i) => i !== postId).join(',')
        );
      })
    );
    this.getDeletedPostsIds();
  }

  openPostInBrowser(postId: string) {
    window.open(
      URLList.POST_URL.replace('$profile_name', this.subredditNameSubject) +
        postId
    );
  }

  refreshPage() {
    // localStorage.removeItem(LocalStorageKeys.subredditName);
    localStorage.clear();
    window.location.reload();
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      color,
    });
    toast.present();
  }

  ngOnDestroy() {
    this.subscriptionsSubject.forEach((s) => s.unsubscribe());
  }
}
