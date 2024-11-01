import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaService } from '../../shared/services/manga.service';
import { Manga } from '../../shared/models/manga';
import { MatTableDataSource } from '@angular/material/table';
import { Chapter } from 'src/app/shared/models/chapter';

@Component({
  selector: 'app-manga-view',
  templateUrl: './manga-view.component.html',
  styleUrls: ['./manga-view.component.scss']
})
export class MangaViewComponent implements OnInit{
  slug: string | null = null;
  public manga:  Manga | undefined;
  displayedColumns: string[] = ['No','chapter', 'updated_at'];
  dataSource: MatTableDataSource<Chapter> = new MatTableDataSource<Chapter>([]);
  constructor(private route: ActivatedRoute,
              private mangaService: MangaService
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    if(this.slug)
      this.loadManga(this.slug)
  }  
  loadManga(slug:any):void{
    this.mangaService.getMangaBySlug(slug).subscribe(data=>{
      this.manga = data;
      this.dataSource = new MatTableDataSource<Chapter>(data.chapters);
    })

  }
}
