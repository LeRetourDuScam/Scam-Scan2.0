export class Comment {
    parentId: string | null;
    mangaSlug: string;
    username: string;
    content: string;
    createdAt: Date;
    _id:string;
    constructor() {
        this.parentId = null;
        this.mangaSlug = '';
        this.username = '';
        this.content = '';
        this.createdAt = new Date();
        this._id = '';
    }
}