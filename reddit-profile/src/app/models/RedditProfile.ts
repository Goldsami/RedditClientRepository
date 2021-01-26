import { RedditPost } from "./RedditPost";

export class RedditProfile {
    id: string;
    display_name: string;
    title: string;
    community_icon: string;
    posts: RedditPost[];

    constructor(id: string, display_name: string, title: string, community_icon: string) {
        this.id = id;
        this.display_name = display_name;
        this.title = title;
        this.community_icon = community_icon;
    }
}