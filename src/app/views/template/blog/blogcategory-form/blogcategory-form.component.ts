import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, take } from 'rxjs';
import { BlogCategoryService } from 'src/app/core/services/blog/blog-category.service';
import { ToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'app-blogcategory-form',
  templateUrl: './blogcategory-form.component.html',
  styleUrls: ['./blogcategory-form.component.scss']
})
export class BlogcategoryFormComponent {
  categoryForm!                     :FormGroup;
  @Output() closeCatForm                :EventEmitter<any>   = new EventEmitter();
  @Output() addedCat                    :EventEmitter<any>   = new EventEmitter();

  clicked                       :boolean             = false;
  loading                       :boolean             = false;

  constructor(
    private formBuilder          : FormBuilder,
    private el                   : ElementRef,
    private _blogCtegoryService  : BlogCategoryService,
    private toastrService        : ToastrService
  ) {

  }

  ngOnInit(): void {
    this.initForm();

  }


  @HostListener('document:click', ['$event.target'])
  public onClick(target: any) {
      const clickedInside = this.el.nativeElement.contains(target);
      if (!clickedInside && this.clicked) {
        this.closeCatForm.emit();
        this.clicked = false;
      }else{
        this.clicked = true;
      }
  }

  initForm(){
    this.categoryForm = this.formBuilder.group({
      name:                   new FormControl('', [Validators.required])
    });
  }


  get form(){
    return this.categoryForm;
  }

  save(){
    if(this.form.valid){
      this.loading  = true;
      this._blogCtegoryService.create(this.form.value)
      .pipe(take(1),map((res:any) => res?.data))
      .subscribe(data => {
        // // console.log('data',data);
        this.loading  = false;
        this.addedCat.emit(data);
        this.toastrService.toastSuccess('Category added successfully');
      },
      error => {
        // console.log({error});
        this.loading  = false;
        this.toastrService.toastError(error?.message);
      })
    }else this.categoryForm.markAllAsTouched();

  }
}


