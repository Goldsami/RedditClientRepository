import { RedditPost } from './../models/RedditPost';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'getNotDeleted' })
export class GetNotDeletedPipe implements PipeTransform {
    transform(value: RedditPost[], deletedPostsIds: string[]): RedditPost[] {
        console.debug('GetNotDeleted');
        return value.filter(x => !deletedPostsIds.includes(x.id))
    }
}

@Pipe({ name: 'getStarred' })
export class GetStarredPipe implements PipeTransform {
    transform(value: RedditPost[], starredPostsIds: string[]): RedditPost[] {
        console.debug('GetStarred');
        return value.filter(x => starredPostsIds.includes(x.id))
    }
}

@Pipe({ name: 'getDeleted' })
export class GetDeletedPipe implements PipeTransform {
    transform(value: RedditPost[], deletedPostsIds: string[]): RedditPost[] {
        console.debug('GetDeleted');
        return value.filter(x => deletedPostsIds.includes(x.id))
    }
}