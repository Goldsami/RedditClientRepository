import { Component, OnInit } from '@angular/core';
import { RedditPost } from '../models/RedditPost';
import { RedditProfile } from '../models/RedditProfile';
import { RedditProfileService } from '../services/reddit-profile.service';
import { URLList } from '../services/URLs';

@Component({
  selector: 'app-deleted',
  templateUrl: './deleted.page.html',
  styleUrls: ['./deleted.page.scss'],
})
export class DeletedPage implements OnInit {

  constructor(private _redditProfileService: RedditProfileService) {
    console.debug(_redditProfileService.posts);
    if (!_redditProfileService.posts) {
      _redditProfileService.getSubredditPosts().subscribe(r => {
        this.posts = _redditProfileService.posts;
      })
    }
    else this.posts = _redditProfileService.posts;
  }

  ngOnInit() {
  }

  posts: RedditPost[];

  open(postId: string) {
    console.debug(postId);
    window.open(URLList.postUrl + postId);
  }

  restore(post: RedditPost, event) {
    post.isDeleted = false;
    event.stopPropagation();
  }

}
