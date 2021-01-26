export class RedditPost {
    id: string;
    title: string;
    url: string;
    subredditId: string;
    private _isStarred: boolean;
    private _isDeleted: boolean;

    constructor(id: string, title: string, url: string, subreddit_id: string) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.subredditId = subreddit_id;
    }

    get isStarred() {
        return this._isStarred
    }

    set isStarred(newValue: boolean) {
        if (this._isDeleted && newValue) return;
        this._isStarred = newValue;
    }

    get isDeleted() {
        return this._isDeleted
    }

    set isDeleted(newValue: boolean) {
        if (this._isStarred && newValue) return;
        this._isDeleted = newValue;
    }
}