import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, take } from 'rxjs';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { CategoriesService } from 'src/app/core/services/production-module/categories/categories.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-catgrory-form',
  templateUrl: './catgrory-form.component.html',
  styleUrls: ['./catgrory-form.component.scss']
})
export class CatgroryFormComponent {
  environment                       : any       = environment
  @Input() category                 : any;
  @Input() eventype                 : any       = EventTypes.Add;
  myForm!                           : FormGroup;

  loading                           : boolean   = false;

  @Output() hideForm                : EventEmitter<any>  = new EventEmitter();
  @Output() addedCat                : EventEmitter<any>  = new EventEmitter();
  @Output() updatedCat                : EventEmitter<any>  = new EventEmitter();


  files                             : File[]  = [];
  existingFiles                     : any;
  url                               : any;

  constructor(
    private _CategoriesService      : CategoriesService,
    private uploadService           : FileUploadService
  ) {
  }

  ngOnInit(): void {

    this.initForm();
    this.handleEvent();

  }

  initForm(): void {
    this.myForm = new FormGroup({
      name   : new FormControl('',      [Validators.required]),
      photo  : new FormControl(''),
    });
  }


  handleEvent(){
    if(this.eventype == EventTypes.Edit || this.eventype == EventTypes.Duplicate){
      this.myForm.get('name')?.setValue(this.category?.name);
      this.myForm.get('photo')?.setValue(this.category?.photo);
      this.existingFiles = [this.category?.photo];
      this.url = this.environment?.Upload?.apiUrl + this.category?.photo?.url
    }
  }


  get form(){
      return this.myForm;
    }

    async save(){

      if(this.myForm.valid){
        this.loading = true;
        let data = this.myForm.value;
        var entreprise:any =  localStorage.getItem('ent_User') != null ? localStorage.getItem('ent_User') : 'global' ;
        // let data:any = {avatar: {name:'', url:'', type:''}};
        if(this.files.length > 0){
          const file = this.files[0];
            const response = await this.uploadService.uploadFile(file,entreprise).toPromise();
            if (response.body.status === true) {
              const fileName = response.body.generatedName;
              data['photo'] = {
                name: fileName,
                url: this.uploadService.getFileUrl(fileName,entreprise),
                type: file.type,
              };
            } else {
              return;
            }

        }

        console.log({data});


        this._CategoriesService.add(data)
        .pipe(take(1), map(res => res?.data))
        .subscribe((res:any)=>{
          this.loading = false;
          this.addedCat.emit(res);
        },
        error =>{
          this.loading = false;
          console.error(error);
        })
      }else{
        this.myForm.markAllAsTouched();
      }
    }

    async update(){
      if(this.myForm.valid){
        this.loading = true;
        let data = this.myForm.value;
        console.log({data});
        var entreprise:any =  localStorage.getItem('ent_User') != null ? localStorage.getItem('ent_User') : 'global' ;
        // let data:any = {avatar: {name:'', url:'', type:''}};
        if(this.files.length > 0){
          const file = this.files[0];
            const response = await this.uploadService.uploadFile(file,entreprise).toPromise();
            if (response.body.status === true) {
              const fileName = response.body.generatedName;
              data['photo'] = {
                name: fileName,
                url: this.uploadService.getFileUrl(fileName,entreprise),
                type: file.type,
              };
            } else {
              return;
            }

        }
        this._CategoriesService.update(this.category?.id, data)
        .pipe(take(1),map(res => res?.data))
        .subscribe((res:any)=>{
            this.loading    =  false;
            this.updatedCat.emit(res);
            // this.categories.splice(this.editIndex, 1, res);
            // this.handleResetform();
        },
        error =>{
          this.loading = false;
          console.error(error);
        })
      }
    }



    hideForm_(){
      this.hideForm.emit();
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

}
