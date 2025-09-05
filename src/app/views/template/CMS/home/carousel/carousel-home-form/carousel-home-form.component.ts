import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { HeroSlideService } from 'src/app/core/services/pages/home/HeroSlide.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carousel-home-form',
  templateUrl: './carousel-home-form.component.html',
  styleUrls: ['./carousel-home-form.component.scss']
})
export class CarouselHomeFormComponent {
  environment                       : any       = environment
  slides             : any[] = [];
  slideForm        : FormGroup;
  showCreateForm   : boolean= false;
  editingSlide     : any | null = null;
  loading          : boolean= false;


      // files
  files                             : File[]  = [];
  existingFiles                     : any;
  url                               : any;

  constructor(
    private heroSlideService: HeroSlideService,
    private fb: FormBuilder,
    private uploadService           : FileUploadService,
  ) {
    this.slideForm = this.createForm();
  }

  ngOnInit() {
    this.loadSlides();
  }

  createForm(): FormGroup {
    return this.fb.group({
      title:         ['', [Validators.required, Validators.maxLength(255)]],
      description:   [''],
      image:         [''],
      button_text:   ['', Validators.maxLength(100)],
      button_link:   ['' ],
      order:         [0, [Validators.min(0)]],
      is_active:     [true]
    });
  }

  loadSlides() {
    this.heroSlideService.getSlides()
    .pipe(take(1))
    .subscribe({
      next: (slides) => {
        this.slides = slides.sort((a, b) => a.order - b.order);
        console.log(this.slides );

      },
      error: (error) => console.error('Error loading slides:', error)
    });
  }

  async onSubmit() {
    if (this.slideForm.valid) {
      this.loading = true;
      const formData = this.slideForm.value;
      var entreprise:any =  localStorage.getItem('ent_User') != null ? localStorage.getItem('ent_User') : 'global' ;
     console.log('this.files.::::',this.files);


      if(this.files.length > 0){
        for (let file of this.files) {
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

      console.log('formData:::', formData);
      const operation = this.editingSlide
        ? this.heroSlideService.updateSlide(this.editingSlide.id!, formData)
        : this.heroSlideService.createSlide(formData);

      operation
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.loadSlides();
          this.cancelEdit();
          this.loading = false;
        },
        error: (error:any) => {
          console.error('Error saving slide:', error);
          this.loading = false;
        }
      });
    }
  }

  editSlide(slide: any) {
    this.editingSlide = slide;
    this.showCreateForm = true;
    this.slideForm.patchValue(slide);
    console.log('this.slideForm:::', this.slideForm);
    // this.existingFiles = slide.image;

  }

  deleteSlide(id: number) {
    if (confirm('Are you sure you want to delete this slide?')) {
      this.heroSlideService.deleteSlide(id)
      .pipe(take(1))
      .subscribe({
        next: (data:any) => {
          this.loadSlides();
          console.log('Slide deleted successfully', data);

        },
        error: (error:any) => console.error('Error deleting slide:', error)
      });
    }
  }

  cancelEdit() {
    this.showCreateForm = false;
    this.editingSlide = null;
    this.slideForm.reset(this.createForm().value);
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
