import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, take } from 'rxjs';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { BlogCategoryService } from 'src/app/core/services/blog/blog-category.service';
import { BlogService } from 'src/app/core/services/blog/blog.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent {
  @Input() editItem      : any = null;
  @Input() eventType     : any = null;

  @Output() updatedItem  : EventEmitter<any> = new EventEmitter();
  @Output() closeForm    : EventEmitter<any> = new EventEmitter();
  @Output() addedItem    : EventEmitter<any> = new EventEmitter();

  blogForm!: FormGroup;

  categories                        : any[]    = [];

  loudingButton                     : boolean  = false;
  loading                           : boolean  = false;
  addCategoryForm                   : boolean  = false;
  // files
  files                             : File[]   = [];
  existingFiles                     : any;
  url                               : any;

  myToolbar                         : any;
  editId                            : any       = null;

  tags                              : any[]  = [];

  constructor(
    private blogService             : BlogService,
    private _blogCtegoryService     : BlogCategoryService,
    private fb                      : FormBuilder,
    private http                    : HttpClient,
    private uploadService           : FileUploadService,
  ) {
    this.myToolbar = [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', { direction: 'rtl' }],
      [{ color: [] }, { background: [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote'],
      ['link'],
    ];


  }

  ngOnInit(): void {
    this.getCat();
    this.initForm();
    this.handleEvent();

  }


  getCat(){
    this._blogCtegoryService
    .getAll()
    .pipe(take(1), map((res:any) => res?.data))
    .subscribe((data: any) => {
      console.log({data});

      this.categories = data;
    });
  }


  initForm(){
    this.blogForm = this.fb.group({
      title:                  ['', Validators.required],
      description:            ['', Validators.required],
      blog_category_id:       ['', Validators.required],
      tags:                   [''],
      published_at:           [''],
      images:                 [null]
    });
  }

  get form(){
    return this.blogForm;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.blogForm.patchValue({ image: file });
    }
  }

  async save(): Promise<void> {
    if (!this.blogForm.valid) {
      this.blogForm.markAllAsTouched();
      return;

    }else{
      console.log(this.blogForm.value);

      var files = [];
      var entreprise:any =  localStorage.getItem('ent_User') != null ? localStorage.getItem('ent_User') : 'global' ;
      if(this.files.length > 0){
        for (let file of this.files) {
          const response = await this.uploadService.uploadFile(file, entreprise).toPromise();
          console.log({response});

          if (response.body.status === true) {
            const fileName = response.body.generatedName;
            files.push({
              name: fileName,
              url: this.uploadService.getFileUrl(fileName, entreprise),
              originName: file.name,
              type: file.type,
            });
          } else {
            this.loudingButton = true;
            // this._toastService.toastrError(response.body.msg);
            return;
          }
        }
      }


      this.loading = true;
      let data = this.blogForm.value;
      let url                        = this.blogForm.get('tags')?.value.trim();
      if(url != '') this.tags.push(url);
      data['tags']            = this.tags;
      data['images']          = files;
      data['published_at']    = this.blogForm.get('published_at')?.value != null ? this.blogForm.get('published_at')?.value : new Date();

      this.blogService.create(data)
      .pipe(take(1), map((res:any) => res?.data))
      .subscribe((data: any) => {
        this.loading = false;
        this.addedItem.emit(data);
      }, err =>{
        this.loading = false;
        console.log({err});
      });
    }
  }


  async update(): Promise<void> {
    if (!this.blogForm.invalid){

    }else{
      console.log(this.blogForm.value);

      var files =  [...this.existingFiles];
      var entreprise:any =  localStorage.getItem('ent_User') != null ? localStorage.getItem('ent_User') : 'global' ;
      if(this.files.length > 0){
        for (let file of this.files) {
          const response = await this.uploadService.uploadFile(file, entreprise).toPromise();
          console.log({response});

          if (response.body.status === true) {
            const fileName = response.body.generatedName;
            files.push({
              name: fileName,
              url: this.uploadService.getFileUrl(fileName, entreprise),
              originName: file.name,
              type: file.type,
            });
          } else {
            this.loudingButton = true;
            // this._toastService.toastrError(response.body.msg);
            return;
          }
        }
      }


      this.loading = true;
      let data = this.blogForm.value;
      data['tags']            = this.tags;
      data['images']          = files;
      data['published_at']     = this.blogForm.get('published_at')?.value != null ? this.blogForm.get('published_at')?.value : new Date();

      this.blogService.create(data)
      .pipe(take(1), map((res:any) => res?.data))
      .subscribe((data: any) => {
        this.loading = false;
        this.updatedItem.emit(data);
      }, err =>{
        this.loading = false;
        console.log({err});
      });
    }


  }


  handleEvent(){
    if(this.eventType == EventTypes.Edit || this.eventType == EventTypes.Duplicate){
      this.editId   = this.editItem.id;
      this.blogForm?.get('title')?.setValue(this.editItem.title);
      this.blogForm?.get('description')?.setValue(this.editItem.description);
      this.blogForm?.get('blog_category_id')?.setValue(this.editItem.category?.id);
      this.tags = this.editItem['tags'].length > 0 ? this.editItem['tags'] : [];
      // this.blogForm?.get('tags')?.setValue(this.editItem.tags);
      const localDateTime = new Date(this.editItem.published_at).toISOString().slice(0, 16);
      this.blogForm?.get('published_at')?.setValue(localDateTime);
      console.log(localDateTime);

      // this.blogForm?.get('images')?.setValue(this.editItem.images);
      this.existingFiles = this.editItem['images'];
    }
  }

  closePopup(){
      this.closeForm.emit();
  }



  addTag(event: any) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      var url = this.blogForm.get('tags')?.value.trim();

      console.log(url);

      if (url == '' || this.tags.includes(url) ) return;
      this.tags = [...this.tags, url];
      console.log(this.tags);

      this.blogForm.get('tags')?.clearValidators();
      this.blogForm.get('tags')?.setValue('');
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
    // this.blogForm.get('tags')?.setValue(this.tags.join(','));
  }


    // files
    async readFileCover(evt: any) {
      if (evt.length != 0) {
        await this.readFile(evt[0]).toPromise();
      } else {
        this.url = '';
      }
    }


    private readFile(file: File): Observable<void> {
      return new Observable((obs) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.url = event.target!.result!.toString();

          obs.next();
          obs.complete();
        };
        reader.readAsDataURL(file);
      });
    }


    // add category
    onAddCategory() {
      this.addCategoryForm = true;
    }


    // added category
    addedCat(cat:any) {
      this.categories = [cat, ...this.categories];
      this.closeCatForm();
    }



    // close form
    closeCatForm() {
      this.addCategoryForm = false;
    }
}
