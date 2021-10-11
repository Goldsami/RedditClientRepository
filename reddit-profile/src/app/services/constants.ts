export class URLList {
  static CORSE_ANYWHERE = 'http://localhost:8080/';
  static BASE_REDDIT_URL = 'https://www.reddit.com/';
  static CORSE_REDDIT_URL = URLList.CORSE_ANYWHERE + URLList.BASE_REDDIT_URL;
  static REDDIT_PROFILE_ABOUT =
    URLList.CORSE_REDDIT_URL + 'r/$profile_name/about.json';
  static PREDIT_PROFILE_POSTS =
    URLList.CORSE_REDDIT_URL + 'r/$profile_name.json';
  static POST_URL = URLList.BASE_REDDIT_URL + 'r/$profile_name/comments/';
}

export class LocalStorageKeys {
  static SUBREDDIT_NAME = 'subredditName';
  static SAVED_POSTS_IDS = 'savedPostsIds';
  static DELETED_POSTS_IDS = 'deletedPostsIds';
}
