import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Chapter } from 'src/app/shared/models/chapter.model';
import { Manga } from 'src/app/shared/models/manga.model';
import { MangaService } from 'src/app/shared/services/manga.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-dialog-create-manga',
  templateUrl: './dialog-create-manga.component.html',
  styleUrls: ['./dialog-create-manga.component.scss']
})
export class DialogCreateMangaComponent implements OnInit {
  chapter!: Chapter;
  createForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogCreateMangaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Manga,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.createForm = new FormGroup({
      created_at: new FormControl({ value: new Date(), disabled: true }),
      updated_at: new FormControl({ value: new Date(), disabled: true }),
      name: new FormControl('', [Validators.required]),
      slug: new FormControl({ value: '', disabled: true }),
      description: new FormControl(''),
      image: new FormControl('', [Validators.required]),
      variousName:new FormControl('',[Validators.required]),
      chapters: new FormArray([])
    });
  }

  get chapters(): FormArray {
    return this.createForm.get('chapters') as FormArray;
  }
  addChapter(): void {
    const chapter = new FormGroup({
      name: new FormControl('', Validators.required),
      slug:new FormControl({value:'', disabled:true}),
      updated_at: new FormControl(new Date()),
      images: new FormArray([]) // FormArray pour les images
    });

    this.chapters.push(chapter);
  }

// Fonction pour supprimer un chapitre
  removeChapter(index: number): void {
    const chapters = this.createForm.get('chapters') as FormArray;
    chapters.removeAt(index);
  }
  // Ajouter une image à un chapitre spécifique
  addImageToChapter(chapterIndex: number): void {
    const chapter = this.chapters.at(chapterIndex) as FormGroup;
    const images = chapter.get('images') as FormArray;

    images.push(new FormGroup({
      path: new FormControl('', Validators.required)
    }));
  }

  // Supprimer une image d'un chapitre
  removeImageFromChapter(chapterIndex: number, imageIndex: number): void {
    const chapter = this.chapters.at(chapterIndex) as FormGroup;
    const images = chapter.get('images') as FormArray;

    images.removeAt(imageIndex);
  }
  getImages(chapterIndex: number): FormArray {
    return (this.chapters.at(chapterIndex).get('images') as FormArray);
  }

  onCancel() {
    this.dialogRef.close();
  }
  onChange(): void {
    const name = this.createForm.get('name')?.value;
    if (name) {
      this.createForm.get('slug')?.setValue(name.replace(' ', '-'));
    } else {
      this.createForm.markAllAsTouched();
    }
  }
  onChangeChapter(index: number): void {
    const chapterControl = this.chapters.at(index) as FormGroup;
    const name = chapterControl.get('name')?.value;

    if (name) {
        const slug = name.replace(/ /g, '-'); // Remplace les espaces par des tirets
        chapterControl.get('slug')?.setValue(slug); // Met à jour le champ "slug"
    } else {
        this.createForm.markAllAsTouched();
    }
}


  onSave() {
    if (this.createForm.valid) {
      const MangaData = this.createForm.getRawValue();
      this.dialogRef.close(MangaData);
    } else {
      this.createForm.markAllAsTouched();
      this.snackbarService.showError();
    }
  }
}
