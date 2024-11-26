export class Comment {
    parentId: string | null;
    mangaSlug: string;
    userId: string;
    content: string;
    createdAt: Date;
    _id:string;
    constructor() {
        this.parentId = null;
        this.mangaSlug = '';
        this.userId = '';
        this.content = '';
        this.createdAt = new Date();
        this._id = '';
    }
}