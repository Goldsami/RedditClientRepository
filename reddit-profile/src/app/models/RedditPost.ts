export class RedditPost {
    id: string;
    title: string;
    imageUrl: string;
    subredditId: string;
    author: string;
    selftext: string;
    num_comments: number;
    created_utc: number;
    score: number;

    get creationDateTime() {
        let date = new Date(this.created_utc * 1000);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    }

    constructor(id: string, title: string, url: string, subreddit_id: string, author: string,
        selftext: string, num_comments: number, created_utc: number, score: number) {
        this.id = id;
        this.title = title;
        this.imageUrl = url;
        this.subredditId = subreddit_id;
        this.author = author;
        this.selftext = selftext;
        this.num_comments = num_comments;
        this.created_utc = created_utc;
        this.score = score;
    }

}