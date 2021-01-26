export class URLList {
    static corseAnywhere = "https://cors-anywhere.herokuapp.com/";
    static baseRedditUrl = "https://www.reddit.com/";
    static corseRedditUrl = URLList.corseAnywhere + URLList.baseRedditUrl;
    static redditProfileAbout = URLList.corseRedditUrl + "r/lostgeneration/about.json";
    static redditProfilePosts = URLList.corseRedditUrl + "r/lostgeneration.json";
    static postUrl = URLList.baseRedditUrl + "r/lostgeneration/comments/";
}
