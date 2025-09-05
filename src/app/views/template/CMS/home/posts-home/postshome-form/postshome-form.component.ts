import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { PostsHomeService } from 'src/app/core/services/pages/home/posts.service';

@Component({
  selector: 'app-postshome-form',
  templateUrl: './postshome-form.component.html',
  styleUrls: ['./postshome-form.component.scss']
})
export class PostshomeFormComponent {

  @Input() editItem      : any = null;
  @Input() eventType     : any = null;

  @Output() updatedItem  : EventEmitter<any> = new EventEmitter();
  @Output() closeForm    : EventEmitter<any> = new EventEmitter();
  @Output() addedItem    : EventEmitter<any> = new EventEmitter();

  postsHomeForm : FormGroup;



   editId                           : any       = null;
   loading                          : boolean  = false;


      // files
  files                             : File[]  = [];
  existingFiles                     : any;
  url                               : any;


    myToolbar                         : any;

  constructor(
    private fb                      : FormBuilder,
    private postsHomeService        : PostsHomeService,
    private route                   : ActivatedRoute,
    private router                  : Router,
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

    this.postsHomeForm = this.fb.group({
      title:       ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required],
      button_name: ['', Validators.maxLength(100)],
      button_href: ['']
    });

  }

  ngOnInit(): void {
    this.handleEvent();
  }

  handleEvent(){
      if(this.eventType == EventTypes.Edit || this.eventType == EventTypes.Duplicate){
        this.editId   = this.editItem.id;
        this.postsHomeForm?.get('title')?.setValue(this.editItem.title);
        this.postsHomeForm?.get('description')?.setValue(this.editItem.description);
        this.postsHomeForm?.get('button_name')?.setValue(this.editItem.button_name);
        this.postsHomeForm?.get('button_href')?.setValue(this.editItem.button_href);
        this.existingFiles = [this.editItem['image']];
      }
    }







  async onSubmit() {
    if (this.postsHomeForm.valid) {
      this.loading = true;

      const formData = this.postsHomeForm.value;
      formData['image'] = await this.existingFiles.length > 0 ? this.existingFiles[0] : null;

      if(this.files.length > 0){
        for (let file of this.files) {
          var entreprise:any =  localStorage.getItem('ent_User') != null ? localStorage.getItem('ent_User') : 'global' ;
          const response = await this.uploadService.uploadFile(file, entreprise).toPromise();
          console.log({response});

          if (response.body.status === true) {
            const fileName = response.body.generatedName;
            formData['image'] = await {
              name: fileName,
              url: this.uploadService.getFileUrl(fileName, entreprise),
              originName: file.name,
              type: file.type,
            };
          } else {
            // this.loudingButton = true;
            // this._toastService.toastrError(response.body.msg);
            return;
          }
        }
      }
      const request = this.eventType == EventTypes.Edit
        ? this.postsHomeService.updatePostsHome( this.editId, formData)
        : this.postsHomeService.createPostsHome(formData);

      request
      .pipe(take(1), map((res:any) => res?.data))
      .subscribe((data:any)=>{
        if(this.eventType == EventTypes.Edit){
          this.loading = false;
          this.updatedItem.emit(data);
        }else{
          this.loading = false;
          this.addedItem.emit(data);
        }
      }

      );
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.postsHomeForm.controls).forEach(key => {
      const control = this.postsHomeForm.get(key);
      control?.markAsTouched();
    });
  }




  cancel(): void {
   this.closeForm.emit();
  }

  // getImageUrl(imagePath: string): string {
  //   return `http://localhost:8000/storage/${imagePath}`;
  // }

  // Getter methods for template
  get title() { return this.postsHomeForm.get('title'); }
  get description() { return this.postsHomeForm.get('description'); }
  get buttonName() { return this.postsHomeForm.get('button_name'); }
  get buttonHref() { return this.postsHomeForm.get('button_href'); }


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
}
