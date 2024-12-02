import { Image } from './image.model'
export class Chapter {
    name: string;
    slug: string;
    images: Image[];
    updated_at: Date; 
    views:number;
  
    constructor() {
      this.name = '';
      this.slug='';
      this.images = [new Image()];
      this.updated_at = new Date(); 
      this.views=0;
    }
  }
  