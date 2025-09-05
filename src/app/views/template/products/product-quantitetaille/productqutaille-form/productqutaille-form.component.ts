import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { take, map } from 'rxjs/operators';
import { EventTypes } from 'src/app/core/enum/eventTypes';
import { Observable } from 'rxjs';
import { ProduitService } from 'src/app/core/services/produit/produit.service';
import { QuntiteTailleService } from 'src/app/core/services/quantite-taille/quantiteTaille.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';

@Component({
  selector: 'app-productqutaille-form',
  templateUrl: './productqutaille-form.component.html',
  styleUrls: ['./productqutaille-form.component.scss']
})
export class ProductqutailleFormComponent {
  @Input()    qutaille           :any;
  @Input()    productId          :any;
  @Input()    eventype           :any                     = EventTypes.Add;

  @Output()   addedqutaille      :EventEmitter<any>       = new EventEmitter();
  @Output()   closeForm          :EventEmitter<any>       = new EventEmitter();
  @Output()   updatedqutaille    :EventEmitter<any>       = new EventEmitter();

  public colors = [
    "Red", "Green", "Blue", "Yellow", "Cyan", "Magenta", "Black", "White", "Gray",
    "Maroon", "Olive", "Lime", "Teal", "Navy", "Purple", "Silver", "Aqua", "Fuchsia",
    "Orange", "Brown", "Gold", "Pink", "Violet", "Indigo", "Turquoise", "Salmon",
    "Beige", "Coral", "Crimson", "Lavender", "Khaki", "Plum", "Orchid", "Tan", "Azure",
    "Ivory", "Mint", "Peach", "Rose", "Chocolate", "Peru", "Thistle", "SlateGray",
    "DarkRed", "DarkGreen", "DarkBlue", "DarkCyan", "DarkMagenta", "DarkGoldenRod",
    "DarkOrchid", "DarkSlateGray", "DeepPink", "DeepSkyBlue", "DodgerBlue", "FireBrick",
    "ForestGreen", "HotPink", "IndianRed", "LightBlue", "LightCoral", "LightGreen",
    "LightGray", "LightPink", "LightSalmon", "LightSkyBlue", "LightYellow", "MediumBlue",
    "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen",
    "MediumTurquoise", "MidnightBlue", "MistyRose", "Moccasin", "NavajoWhite",
    "OldLace", "OliveDrab", "PaleGoldenRod", "PaleGreen", "PaleTurquoise",
    "PapayaWhip", "PowderBlue", "RoyalBlue", "SaddleBrown", "SeaGreen", "SkyBlue",
    "Snow", "SpringGreen", "SteelBlue", "Tomato", "Wheat", "YellowGreen"
  ];

  activeOption                      : any                  = 'color';

  selectedColor                     : string               = '#ff0000';
  languages                         : string[]             = [];
  editId                            : any;
  lang                              : any                  = 'fr';
  productionForm!                   : FormGroup;
  messge                            : any;

  tailles                           : any[]                = [];
  stocks                            : any[]                = [];

  qutailles                         : any                  = [];
  productions                       : any                  = [];

  url                               : any;
  file                              : any[]                = [];
  existingFiles                     : any;


  loading                           : boolean   = false;
  other                             : boolean   = false;


  // files                             : File[]  = [];
  // existingFiles                     : any;
  // url                               : any;

  constructor(
    private _ProductService         : ProduitService,
    private _QuntiteTailleService   : QuntiteTailleService,
    private uploadService           : FileUploadService,
  ) {
  }

  ngOnInit(): void {
    this.languages        = environment.supportedLanguages;

    this.initForm();

    this.handleEvent();

    this.getData();
  }

  initForm(): void {
    this.productionForm = new FormGroup({
      quantite                : new FormControl('',      [Validators.required]),
      color                   : new FormControl('without',      [Validators.required]),
      color_exist             : new FormControl(true,    [Validators.required]),
      color_type              : new FormControl('color', [Validators.required]),
      color_name              : new FormControl(null,    [Validators.required]),
      quantite_livre          : new FormControl('',      [Validators.required]),
      taille_id               : new FormControl('',      [Validators.required]),
      stock_id                : new FormControl('',      [Validators.required]),
      detailsOn               : new FormControl('product'),
      detailsID               : new FormControl(this.productId),
      file                    : new FormControl(''),
      price                   : new FormControl(''),
      sale_price              : new FormControl(''),
    });
  }

  getData(){
    this._QuntiteTailleService.create()
    .pipe(take(1))
    .subscribe(data =>{
      // console.log('date:::::', data);

      this.tailles = data?.tailles;
      this.stocks = data?.stocks;
    })
  }


  handleEvent(){
      if(this.eventype == EventTypes.Edit || this.eventype == EventTypes.Duplicate){
        console.log('this.qutaille => editId',this.qutaille);

        this.editId   = this.qutaille?.id;
        this.productionForm?.get('quantite')?.setValue(this.qutaille?.quantite);
        this.productionForm?.get('quantite_livre')?.setValue(this.qutaille?.quantite_livre);
        this.productionForm?.get('color')?.setValue(this.qutaille?.color);
        this.productionForm?.get('color_exist')?.setValue(this.qutaille?.color_exist);
        this.productionForm?.get('color_type')?.setValue(this.qutaille?.color_type);
        this.productionForm?.get('stock_id')?.setValue(this.qutaille?.stock?.id);
        this.productionForm?.get('taille_id')?.setValue(this.qutaille?.taille?.id);
        this.productionForm?.get('file')?.setValue(this.qutaille?.file);
        this.productionForm?.get('price')?.setValue(this.qutaille?.price);
        this.productionForm?.get('sale_price')?.setValue(this.qutaille?.sale_price);
        this.productionForm?.get('color_name')?.setValue(this.qutaille?.color_name);

        if(!this.qutaille.color_exist){
          this.other = true;
          this.activeOption =  this.productionForm.get('color_type')?.value;

          if(this.activeOption == 'image'){
            console.log( this.productionForm?.get('file')?.value);

            this.existingFiles = this.productionForm?.get('file')?.value;
          }else{
            this.selectedColor = this.productionForm?.get('color')?.value;
          }

          // this.productionForm.get('color_type')?.setValue(type);
        }
      }
  }



  get form(){
    return this.productionForm;
  }

  async save(){
    console.log(
      this.productionForm.valid,
      this.productionForm.value,

    );


    if(this.productionForm.valid){
      this.loading = true;
      var image :any = this.existingFiles ? this.existingFiles : null;

      console.log('localStorage ',localStorage.getItem('ent_User') );

      var entreprise:any =  localStorage.getItem('ent_User') != null ? localStorage.getItem('ent_User') : 'global' ;
      if(this.file.length > 0){
        for (let file of this.file) {
          const response = await this.uploadService.uploadFile(file, entreprise).toPromise();
          console.log({response});

          if (response.body.status === true) {
            const fileName = response.body.generatedName;
            image = {
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

      let data = this.productionForm.value;
      data.file = image;
      console.log({data}, image);

      this._QuntiteTailleService.add(data)
      .pipe(take(1), map(res => res?.data))
      .subscribe((res:any)=>{
        this.loading = false;
        this.addedqutaille.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }else{
      this.productionForm.markAllAsTouched();
    }
  }



  async update(){
    if(this.productionForm.valid){
      var entreprise:any =  localStorage.getItem('ent_User') != null ? localStorage.getItem('ent_User') : 'global' ;
      let data           = this.productionForm.value;
      data.file = this.existingFiles;
      if(this.file.length > 0 && this.other){
        for (let file of this.file) {
          const response = await this.uploadService.uploadFile(file, entreprise).toPromise();
          console.log({response});

          if (response.body.status === true) {
            const fileName = response.body.generatedName;
            data.file = {
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
      }else {
        if(this.other && this.activeOption == 'image'){
          data.file = this.existingFiles;
        }else{
          data.file = null;
        }
      }
      this.loading = true;

      this._QuntiteTailleService.update(this.editId, data)
      .pipe(take(1),map(res => res?.data))
      .subscribe((res:any)=>{
          this.loading = false;
          this.updatedqutaille.emit(res);
      },
      error =>{
        this.loading = false;
        console.error(error);
      })
    }
  }



  resetForm(){
    this.productionForm.reset();
  }

  closePopup(){
    this.closeForm.emit();
    this.productionForm.reset();
  }


  handleChangeOther(event:any){
    if(event.target.checked){
      this.other     = true;
      this.productionForm?.get('color_exist')?.setValue(false)
    }else{
      this.productionForm?.get('color_exist')?.setValue(true)
      this.other = false;
    }

}

handlePickColor(){
  console.log('this.selectedColor',this.selectedColor);

  this.productionForm.get('color')?.setValue(this.selectedColor)
}


handleToggleActiveOption(type:any){
  this.activeOption = type;

  this.productionForm.get('color_type')?.setValue(type);


}


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
      this.productionForm.get('file')?.setValue(file);

      obs.next();
      obs.complete();
    };
    reader.readAsDataURL(file);
  });
}


}
