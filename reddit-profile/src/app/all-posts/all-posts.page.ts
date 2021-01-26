import { URLList } from './../services/URLs';
import { RedditPost } from './../models/RedditPost';
import { RedditProfile } from './../models/RedditProfile';
import { RedditProfileService } from './../services/reddit-profile.service';
import { Component, OnInit } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.page.html',
  styleUrls: ['./all-posts.page.scss'],
})
export class AllPostsPage implements OnInit {

  constructor(private _redditProfileService: RedditProfileService, private _toastController: ToastController) {
    if (!_redditProfileService.posts) {
      _redditProfileService.getSubredditPosts().subscribe(r => {
        this.posts = _redditProfileService.posts;
      })
    }
    if (!_redditProfileService.profile) {
      _redditProfileService.getSubredditProfile().subscribe(r => {
        this.profile = _redditProfileService.profile;
      })
    }
  }

  ngOnInit() {

  }

  profile: RedditProfile;
  posts: RedditPost[];

  open(postId: string) {
    console.debug(postId);
    window.open(URLList.postUrl + postId);
  }

  star(post: RedditPost, event) {
    post.isStarred = true;
    event.stopPropagation();
  }

  delete(post: RedditPost, event) {
    if (!post.isStarred) post.isDeleted = true;
    else {
      this.presentToast('You can\'t delete starred post.', 'danger')
    }
    event.stopPropagation();
  }

  async presentToast(message: string, color: string) {
    const toast = await this._toastController.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

}
