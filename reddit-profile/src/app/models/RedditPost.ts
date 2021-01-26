export class RedditPost {
    id: string;
    title: string;
    url: string;
    subreddit_id: string;

    constructor(id: string, title: string, url: string, subreddit_id: string) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.subreddit_id = subreddit_id;
    }
}