import { Chapter } from './chapter'
export class Manga {
    name: string;
    slug: string;
    description: string;
    image: string;
    chapters: Chapter[];
    updated_at: Date;
    created_at: Date;
    variousName:string;
    constructor(){
        this.name = '';
        this.slug = '';
        this.description = '';
        this.image = '';
        this.chapters = [new Chapter()]; 
        this.updated_at = new Date();
        this.created_at = new Date();
        this.variousName='';
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