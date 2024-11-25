import { Chapter } from './chapter.model'
export class Manga {
    name: string;
    variousName: string;
    slug: string;
    description: string;
    image: string;
    Genre: string[];
    status: string;
    author: string;
    popularity: number;
    publicationYear: number;
    language: string;
    rating: number;
    type: string;
    chapters: Chapter[];
    updated_at: Date;
    created_at: Date;

    constructor() {
        this.name = '';
        this.variousName = '';
        this.slug = '';
        this.description = '';
        this.image = '';
        this.Genre = [];
        this.status = '';
        this.author = '';
        this.popularity = 0;
        this.publicationYear = new Date().getFullYear();
        this.language = '';
        this.rating = 0;
        this.type = '';
        this.chapters = [new Chapter()];
        this.updated_at = new Date();
        this.created_at = new Date();
    }
}
export class MangaGet{
    page:number;
    count:number;
    data:Manga[];
    constructor(){
        this.page=1;
        this.count = 0;
        this.data = [new Manga];
    }
}
