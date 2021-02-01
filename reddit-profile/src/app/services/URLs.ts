export class URLList {
    static corseAnywhere = "https://cors-anywhere.herokuapp.com/";
    static baseRedditUrl = "https://www.reddit.com/";
    static corseRedditUrl = URLList.corseAnywhere + URLList.baseRedditUrl;
    static redditProfileAbout = URLList.corseRedditUrl + "r/$profile_name/about.json";
    static redditProfilePosts = URLList.corseRedditUrl + "r/$profile_name.json";
    static postUrl = URLList.baseRedditUrl + "r/$profile_name/comments/";
}
