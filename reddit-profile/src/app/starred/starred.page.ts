import { Component, OnInit } from '@angular/core';
import { RedditPost } from '../models/RedditPost';
import { RedditProfile } from '../models/RedditProfile';
import { RedditProfileService } from '../services/reddit-profile.service';
import { URLList } from '../services/URLs';

@Component({
  selector: 'app-starred',
  templateUrl: './starred.page.html',
  styleUrls: ['./starred.page.scss'],
})
export class StarredPage implements OnInit {

  constructor(private _redditProfileService: RedditProfileService) {
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
    window.open(URLList.postUrl + postId);
  }

  unStar(post: RedditPost, event) {
    post.isStarred = false;
    event.stopPropagation();
  }

}
