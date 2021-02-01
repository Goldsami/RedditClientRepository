export class DisplayOptions {
    showOnlyStarred: boolean = false;
    showOnlyDeleted: boolean = false;

    constructor(showOnlyStarred: boolean, showOnlyDeleted: boolean) {
        this.showOnlyDeleted = showOnlyDeleted;
        this.showOnlyStarred = showOnlyStarred;
    }
}