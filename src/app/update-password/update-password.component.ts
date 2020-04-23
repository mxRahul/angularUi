import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotificationService } from '../notification.service';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  @ViewChild('oldPassword') oldPasswordInputRef: ElementRef;
  @ViewChild('newPassword') newPasswordInputRef: ElementRef;
  @ViewChild('confirmPassword') confirmPasswordInputRef: ElementRef;
  public showError = '';
  public disabledButton = false;
  public reqBody: any;
  public title = 'toaster-not';
  constructor(private notifyService: NotificationService,  private router: Router, private httpService: HttpService) { }

  ngOnInit(): void {
  }

  updatePassword(){
    if (!this.oldPasswordInputRef.nativeElement.value && !this.newPasswordInputRef.nativeElement.value
       && !this.confirmPasswordInputRef.nativeElement.value) {
          this.disabledButton = true;
    } else if (this.newPasswordInputRef.nativeElement.value !== this.confirmPasswordInputRef.nativeElement.value){
      this.showError = 'Password not matched.';
      this.disabledButton = true;
    }else{
      this.showError = '';
      this.disabledButton = false;
      this.reqBody = { user: {
        oldPassword: this.oldPasswordInputRef.nativeElement.value,
        newPassword: this.newPasswordInputRef.nativeElement.value
        }
      };
      this.httpService.updatePassword(this.reqBody).subscribe((res) => {
        if (res){
          this.router.navigate(['/profile']);
          this.notifyService.showSuccess("Update successfully !!", "Success");
        }else{
        this.notifyService.showError("Something went wrong !!!"  , "Error");
      }
      });
    }

  }

}
