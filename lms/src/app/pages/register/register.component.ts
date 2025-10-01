import { Component,ElementRef,ViewChild,ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { nameSurnameValid } from '../../utils/valid';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class RegisterComponent {
  

  passlock = false; // Şifrenin görünürlüğünü kontrol eder.
  passType = 'password'; // <input type="password"> ya da text olacak şekilde değiştirilir.
  error = ''; // Geri bildirim mesajlarını tutar.
  success = ''; // Geri bildirim mesajlarını tutar.



  //register values
  name = '';
  email = '';
  password = '';
  passwordAgain = '';
  role = 'student';  // Opsiyonel, default "student"

  constructor(private router:Router,private authService: AuthService, private cdr: ChangeDetectorRef) {}

  @ViewChild("nameRef")
  nameRef:ElementRef | undefined
  @ViewChild("emailRef")
  emailRef:ElementRef | undefined
  @ViewChild("passwordRef")
  passwordRef:ElementRef | undefined
  @ViewChild("passwordAgainRef")
  passwordAgainRef:ElementRef | undefined

  userRegister() {
    this.error = ''; // Hata mesajını sıfırla.
    this.success = ''; // Başarı mesajını sıfırla.
     const nameData = nameSurnameValid(this.name)
    if(nameData === ''){
      this.error = 'Name / Surname not valid!';
      this.nameRef!.nativeElement.focus(); // nameRef'e odaklan.
    }else if(this.password === ''){
      this.error = 'Password empty!';
      this.passwordRef!.nativeElement.focus();
    }else if(this.password.length < 8){
      this.error = 'Password must be at least 8 characters!';
      this.passwordRef!.nativeElement.focus();
    }else if(this.password !== this.passwordAgain){
      this.error = 'Passwords do not match!';
      this.passwordAgainRef!.nativeElement.focus();
    }else{
      this.name = nameData;
      this.authService.userRegister(this.name, this.email, this.password, ).subscribe({
        next:(res) => {
          this.success = 'Registration successful!';

          // ✅ Fake token üret(Burayı tekrar düşün)
            const fakeToken = Math.random().toString(36).substring(2);
            localStorage.setItem('token', fakeToken);
            localStorage.setItem('user', JSON.stringify(res));

          this.formReset();// Formu sıfırla.
          this.cdr.detectChanges()
         setTimeout(() => {
          this.router.navigate(['/'],{replaceUrl:true})//başarlı bir şekilde register olduktan sonra login sayfasına yönlendirecek.siteTİmeout: belli bir süre beklerdikten sonra bu işlemi yap.
         }, 3000);
        },
        error: (err) => {
          this.error = 'E-mail All ready in user!'
         this.cdr.detectChanges()
        }
      })
    }

    
  }

   // resetfnc
  formReset(){
    this.name = ''
    this.email = ''
    this.password = ''
    this.passwordAgain = ''
    this.error = ''
  }
  // password text lock and unlock
  passwordLockUnLock() {
    this.passlock = !this.passlock
    this.passType = this.passlock === true ? 'text' : 'password'
  }
}




