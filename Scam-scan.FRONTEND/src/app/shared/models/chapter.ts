import { Image } from './image'
export class Chapter {
    name: string;
    slug: string;
    images: Image[];
    updated_at: Date; 
  
    constructor() {
      this.name = '';
      this.slug='';
      this.images = [new Image()];
      this.updated_at = new Date(); 
    }
  }
  