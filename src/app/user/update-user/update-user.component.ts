import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { NotificationService } from '../../notification.service';
import { ResponseObject } from 'src/app/definitions';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  public extraParameters: any;
  public userProfile1;
  public userProfile;
  public showProfile = false;
  public showPasswordComponent = false;
  public showUploadButton = false;
  public showLoader = false;
  public title = 'toaster-not';
  public reqBody: any;
  @ViewChild('firstName') firstNameInputRef: ElementRef;
  @ViewChild('lastName') lastNameInputRef: ElementRef;
  @ViewChild('mobile') mobileInputRef: ElementRef;
  @ViewChild('email') emailInputRef: ElementRef;
  @ViewChild('city') cityInputRef: ElementRef;
  @ViewChild('age') ageInputRef: ElementRef;
  @ViewChild('userName') userNameInputRef: ElementRef;

  // tslint:disable-next-line:max-line-length
  constructor(private notifyService: NotificationService, private httpService: HttpService, private router: Router, private storage: StorageService) {
  }

  ngOnInit(): void {
    const storageData = this.storage.getData('user');
    this.userProfile1 = (storageData && storageData.length > 10) ? JSON.parse(storageData) : false;
    this.httpService.getUserDetails().subscribe((response: any) => {
      if (response) {
        this.userProfile = response;
      }
    }, (err) => {
      console.log(err);
    });
  }

  updateDetails(){
    this.reqBody = { user: {
      firstName: this.firstNameInputRef.nativeElement.value,
      lastName: this.lastNameInputRef.nativeElement.value,
      mobile: this.mobileInputRef.nativeElement.value,
      email: this.emailInputRef.nativeElement.value,
      city: this.cityInputRef.nativeElement.value,
      age: this.ageInputRef.nativeElement.value,
      userName: this.userNameInputRef.nativeElement.value
      }
    };
    this.httpService.updateProfile(this.reqBody).subscribe((res: ResponseObject) => {
      if (res.user){
       this.router.navigate(['/profile']);
       this.notifyService.showSuccess('Update successfully !!', 'Success');
      }
      this.notifyService.showError('Something went wrong !!!'  , 'Error');
    });
    }

    onFileChange(evt){
      console.log('Event taret value', evt.target.files);
      if (evt.target.files.length > 0) {
        this.showLoader = true;
        const formData = new FormData();
        formData.append('avatar', evt.target.files[0]);
        this.httpService.uploadAvatar(formData).subscribe((response: any) => {
            console.log('Event taret value', response.profileUrl);
            this.userProfile.profileURL = response.profileUrl;
            this.storage.setData('user', JSON.stringify(this.userProfile));
          });
      }
    }

}
