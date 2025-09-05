import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/core/classes/user';
import { ErrorsMessageService } from 'src/app/core/services/ErrorsMessage.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('labelEmail',    { static: true }) labelEmail!: ElementRef;
  @ViewChild('labelPassword', { static: true }) labelPassword!: ElementRef;
  @ViewChild('emailInput',    { static: true }) emailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInput', { static: true }) passwordinput!: ElementRef<HTMLInputElement>;

  showPassword_         : boolean     = true;
  message               : any         = '';
  activeNotice          : boolean     = false;
  msgType               : string      = '';
  // lang                  : any         = 'fr';

  loginForm!: FormGroup;
  user                  : User        = new User();
  public loading        : boolean     = false;
  public error          : any         = '';
  public errorMessage   : any;

  constructor(
    private route                   : ActivatedRoute,
    private auth                    : AuthService,
    private formBuilder             : FormBuilder,
    public  router                  : Router,
    // private _cookie                 : CookieService,
    // private _LoadingScreen          : loadingScreenService,
    private _errorsMessageService   : ErrorsMessageService,
    // public translate                : TranslateService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    // this._LoadingScreen.hide();
    this.route.queryParams.pipe(take(1)).subscribe((params: Params) => {
      console.log(params);
      if(params['email'] && params['email'].trim() !== null){
        this.labelEmail.nativeElement.classList.add('active');
        this.form.get('email')?.setValue(params['email']);
        this.passwordinput.nativeElement.focus();
      }else{
        console.log('bad');
      }
    });

    // remember me settings
    // this.checkCookie();

    this._errorsMessageService.errorMessage
    .subscribe(msg =>{
      console.log('msg',msg);

      if(msg !== null){
        this.errorMessage = msg;
        setTimeout(() => this.errorMessage = null, 6000);
      }
    })
  }


  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email:    new FormControl('', Validators.compose([Validators.required, Validators.email])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      remember_me: new FormControl(false),
    });
  }

  async signIn() {
    if (!this.loginForm.valid) {
      // console.log("sorry this form is not valid");
      this.loginForm.markAllAsTouched();
    }else{
      this.loading = true;
      // if(this.loginForm.get('remember_me')?.value){
      //   this._cookie.set('_Aoauth.0Cookie', JSON.stringify(this.loginForm.value),{expires:7});
      // }
      this.auth.login(this.loginForm.value).catch((err) => {
          // console.log('error',err);
          this.loading = false;
          // this.errorMessage = err?.message;

          // setTimeout(() => this.errorMessage = null, 4000);

      })
    }

  }


  get form() {
    return this.loginForm;
  }

  /**
   * @description check if there are cookies
  */

  checkCookie(){
    // let isCokkies = this._cookie.check('_Aoauth.0Cookie');
    // if(isCokkies){
    //   this.getCookies();
    // }
  }

  /**
   * @description set login form data
  */
  // getCookies(){
  //   let cookie = JSON.parse(this._cookie.get('_Aoauth.0Cookie'));

  //   this.loginForm.get('email')?.setValue(cookie?.email)
  //   this.loginForm.get('password')?.setValue(cookie?.password)
  //   this.loginForm.get('remember_me')?.setValue(true)
  //   console.log(this.loginForm.value);

  // }


  /**
   * @description show & hide password
   */
  togglePassword(status: any) {
    if (!this.showPassword_) {
      this.showPassword_ = true;
      this.passwordinput.nativeElement.setAttribute('type','password');
      } else {
        this.showPassword_ = false;
        this.passwordinput.nativeElement.setAttribute('type','text');
    }
  }
}
