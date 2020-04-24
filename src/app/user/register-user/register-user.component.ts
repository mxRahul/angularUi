import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { NotificationService } from '../../notification.service';
import { ResponseObject } from 'src/app/definitions';
import { StorageService } from 'src/app/services/storage.service';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  @ViewChild('firstName') firstNameInputRef: ElementRef;
  @ViewChild('lastName') lastNameInputRef: ElementRef;
  @ViewChild('mobile') mobileInputRef: ElementRef;
  @ViewChild('email') emailInputRef: ElementRef;
  @ViewChild('password') passwordInputRef: ElementRef;
  @ViewChild('city') cityInputRef: ElementRef;
  @ViewChild('age') ageInputRef: ElementRef;
  @ViewChild('userName') userNameInputRef: ElementRef;
  @ViewChild('dateOfBirth') dateOfBirthInputRef: ElementRef;
  public reqBody = {};
  public title = 'toaster-not';
  @ViewChild(BsDatepickerDirective, { static: false }) datepicker: BsDatepickerDirective;
  // tslint:disable-next-line:max-line-length
  constructor(private notifyService: NotificationService,  private storage: StorageService, private httpService: HttpService , private router: Router) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll')
  onScrollEvent() {
    this.datepicker.hide();
  }

  registerUserDetails(){
    this.reqBody = { user: {
      firstName: this.firstNameInputRef.nativeElement.value,
      lastName: this.lastNameInputRef.nativeElement.value,
      mobile: this.mobileInputRef.nativeElement.value,
      email: this.emailInputRef.nativeElement.value,
      password: this.passwordInputRef.nativeElement.value,
      city: this.cityInputRef.nativeElement.value,
      age: this.ageInputRef.nativeElement.value,
      userName: this.userNameInputRef.nativeElement.value,
      dateOfBirth: this.dateOfBirthInputRef.nativeElement.value
    }
    };
    this.httpService.registerUser(this.reqBody).subscribe((res: ResponseObject) => {
      if (res.user){
        this.notifyService.showSuccess('User create successfully !!', 'Success');
        this.storage.setData('user', JSON.stringify(res));
        this.router.navigate(['/profile']);
        }
      this.notifyService.showError('Something went wrong !!!'  , 'Error');
    });
  }
}
