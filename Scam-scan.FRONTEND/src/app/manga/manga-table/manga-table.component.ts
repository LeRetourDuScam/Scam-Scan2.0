import { Component, Input, OnInit } from '@angular/core';
import { MangaService } from '../../shared/services/manga.service';
import { Manga } from '../../shared/models/manga';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateMangaComponent } from '../../dialog/dialog-create-manga/dialog-create-manga.component';
import { Chapter } from '../../shared/models/chapter';
import { SnackbarService } from '../../shared/services/snackbar.service'
import { mangaParams } from 'src/app/shared/params/manga-params.const';
import { MangaParams } from 'src/app/shared/params/manga-params';

@Component({
  selector: 'app-manga-table',
  templateUrl: './manga-table.component.html',
  styleUrls: ['./manga-table.component.scss']
})
export class MangaTableComponent implements OnInit{
  @Input() defaultMangaParams!: MangaParams;

  public MangaParams!: MangaParams;
  public mangas:  Manga[] | undefined;

  countMangas:number =0;
  countPage:number=0;

  constructor(private mangaService: MangaService,
              private dialog:MatDialog,
              private snackbarService:SnackbarService  ) { }

  ngOnInit(): void {
    this.MangaParams = {...mangaParams};
    this.refreshManga();
  }
  GetAllMangas(): void {
    this.mangaService.getMangas(this.MangaParams).subscribe(res => {
      this.mangas = res.data;
      this.countMangas = res.count;

    });
  }
  createMangas(){
    const dialogRef = this.dialog.open(DialogCreateMangaComponent,{
      data:{
        name : '',
        slug : '',
        description : '',
        image : '',
        chapters : new Chapter(),
        updated_at : new Date(),
        created_at : new Date(),
      }
    });
    dialogRef.afterClosed().subscribe((createdData:any)=>{
      if(createdData){
        this.mangaService.createManga(createdData).subscribe({
          next:()=>{
            this.snackbarService.showSuccess();
            this.refreshManga();
          },
          error:()=>{
            this.snackbarService.showError();
          }
        })
      }
    })
  }

  getLastChapters(manga:Manga){
    return manga.chapters.slice(-3);
  }

  hasPreviousPage(): boolean {
    return this.MangaParams.pageNumber>1;
  }

  hasNextPage(): boolean {
    return this.MangaParams.pageNumber< Math.ceil(this.countMangas/this.MangaParams.pageSize);
  }

  previousPage(): void { 
    if(this.hasPreviousPage()){
      this.MangaParams.pageNumber--;
      this.GetAllMangas();
    }
  }

  nextPage(): void { 
    if(this.hasNextPage()){
      this.MangaParams.pageNumber++;
      this.GetAllMangas();
    }
  }

  refreshManga(){
    this.MangaParams.pageNumber=1;
    this.GetAllMangas();
  }
}
