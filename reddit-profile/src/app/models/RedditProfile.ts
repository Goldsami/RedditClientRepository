export class RedditProfile {
  id: string;
  displayName: string;
  title: string;
  icon_img: string;

  constructor(
    id: string,
    display_name: string,
    title: string,
    community_icon: string
  ) {
    this.id = id;
    this.displayName = display_name;
    this.title = title;
    this.icon_img = community_icon.split('?')[0];
  }
}
