import { RedditPost } from "./RedditPost";

export class RedditProfile {
    id: string;
    displayName: string;
    title: string;
    communityIcon: string;

    constructor(id: string, display_name: string, title: string, community_icon: string) {
        this.id = id;
        this.displayName = display_name;
        this.title = title;
        this.communityIcon = community_icon.split('?')[0];
    }
}