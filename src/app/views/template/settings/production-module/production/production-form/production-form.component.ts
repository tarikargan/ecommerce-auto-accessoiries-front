import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SVGArCircleIcon, SVGFrCircleIcon,SVGEnCircleIcon} from 'src/app/core/services/svgIcons'
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { Observable } from 'rxjs';
import { ProductionService } from 'src/app/core/services/production-module/productions/productions.service';


@Component({
  selector: 'app-production-form',
  templateUrl: './production-form.component.html',
  styleUrls: ['./production-form.component.scss']
})
export class ProductionFormComponent {
  @Input()    production            :any;
  @Input()    eventype              :any                  = EventTypes.Add;

  @Output()   addedProduction       :EventEmitter<any>    = new EventEmitter();
  @Output()   closeForm             :EventEmitter<any>    = new EventEmitter();
  @Output()   updatedProduction     :EventEmitter<any>    = new EventEmitter();


  languages                         :string[]             = [];
  editId                            :any;
  lang                              :any                  = 'fr';
  productForm!                      :FormGroup;
  messge                            :any;

  fournisseurs                      :any = [];
  matierepremieres                  :any = [];

  url                               :any;
  file                              :any[]                = [];
  existingFiles                     :any;

  loading                           :boolean   = false;

  myToolbar                         :any;

  constructor(
    private _ProductionService            :ProductionService,
    private fb                            : FormBuilder
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
    this.initForm();

    this.handleEvent();

    this.getData();

  }

  initForm(): void {
    this.productForm = this.fb.group({
      title                     :['',      [Validators.required]],
      description               :['',      [Validators.required]],
      fournisseur_id            :['',      [Validators.required]],
      matiere_premieres         : this.fb.array([this.matierepre()])
    });
  }


  matierepre(){
    return this.fb.group({
         matiere_premiere_id   : ["",      [Validators.required]],
         used_quantity         : ["",      [Validators.required]],
    })
  }

  get FormArr(){
    return this.productForm.get('matiere_premieres') as FormArray;
  }

  addNewRow(){
    let matierepres = this.productForm.get('matiere_premieres') as FormArray;
    matierepres.push(this.matierepre());
  }

  removeRow(index:any){
    let matierepres = this.productForm.get('matiere_premieres') as FormArray;
    matierepres.removeAt(index);
  }


  getData(){
        this._ProductionService.create()
        .pipe(take(1))
        .subscribe(data =>{
          console.log('data',data);
          this.fournisseurs     = data?.fournisseurs;
          this.matierepremieres = data?.matierepremieres;
        })
  }


  handleEvent(){
      if(this.eventype == EventTypes.Edit){
        this.editId   = this.production?.id;

        this.productForm?.get('title')?.setValue(this.production?.title);
        this.productForm?.get('description')?.setValue(this.production?.description);
        this.productForm?.get('fournisseur_id')?.setValue(this.production?.fournisseur?.id);

        var matieres :any  = [];
        this.production?.matiere_premieres.forEach((element:any) => {
          matieres.push(this.fb.group({
            matiere_premiere_id        : element?.id,
            used_quantity              : element?.used_quantity
          }))
        });

        this.productForm.setControl('matiere_premieres',this.fb.array(matieres || []));
        // this.productForm?.get('matiere_premieres')?.setValue(this.production?.matiere_premieres);
        // this.existingFiles = this.elearning?.thumbnail;
        // this.productForm?.get('thumbnail')?.setValue(this.elearning?.thumbnail);
        // this.productForm?.get('videoUrl')?.setValue(this.elearning?.videoUrl);
        // this.languages.forEach(lang =>{
        //   this.productForm?.get(lang)?.patchValue({
        //     module      : this.elearning[lang].module,
        //     title       : this.elearning[lang].title
        //   })
        // })
      }
  }


  get form(){
    return this.productForm;
  }

  async save(){

    if(this.productForm.valid){
      this.loading = true;
      let data = this.productForm.value;
      // return;

      this._ProductionService.add(data)
      .pipe(take(1), map(res => res?.data))
      .subscribe((res:any)=>{
        this.loading = false;
          this.addedProduction.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }else{
      this.productForm.markAllAsTouched();
    }
  }

  async update(){
    if(this.productForm.valid){
      this.loading = true;
      let data = this.productForm.value;
      this._ProductionService.update(this.editId, data)
      .pipe(take(1),map(res => res?.data))
      .subscribe((res:any)=>{
          this.loading = false;
          this.updatedProduction.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }
  }



  resetForm(){
    this.productForm.reset();
  }

  closePopup(){
    // this._popupService.hidePopop();
    this.closeForm.emit();
    this.productForm.reset();
  }

  switchLang(lang:any){
   this.lang = lang;
  }

  // files
  async readFileCover(evt: any) {
    if (evt.length != 0) {
      await this.readFile(evt[0]).toPromise();
    } else {
      this.url = '';

    }
  }

  getUnit(){

  }

  private readFile(file: File): Observable<void> {
    return new Observable((obs) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.url = event.target!.result!.toString();
        // console.log('this.url',file);
        // console.log('this.filesCover',this.file);


        obs.next();
        obs.complete();
      };
      reader.readAsDataURL(file);
    });
  }

}
