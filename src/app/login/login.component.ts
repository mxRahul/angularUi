import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { ResponseObject } from 'src/app/definitions';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  reqBody: {};
  @Output() selectedUsers = new EventEmitter<void>();
  @Output() featureSelected = new EventEmitter<string>();
  loadedFeature = 'login';
  title = 'toaster-not';
  // tslint:disable-next-line:max-line-length
  constructor(private notifyService: NotificationService, private fb: FormBuilder, private httpService: HttpService, private router: Router, private storage: StorageService) {
    this.initFormController();
  }

  initFormController() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(3)])
    });
  }

  userLogin() {
    this.reqBody = {
      user: this.loginForm.value
    };
    this.httpService.userLogin(this.reqBody).subscribe((response: ResponseObject) => {
      if (response.user) {
        this.notifyService.showSuccess("Login successfully !!", "Success");
        this.storage.setData('user', JSON.stringify(response));
        this.router.navigate(['/profile']);
        // this.loadedFeature = 'profile';
      } else if (response.errors){
        this.notifyService.showError(JSON.stringify(response.errors)  , "Error");
        console.log('Error');
      }
    }, (err) => {
      this.notifyService.showError("something went wrong !!!" , "Error");
      console.log('Error', err);
    });
  }

  ngOnInit(): void {
  }

  onNavigate(event: string) {
    this.loadedFeature = event;
  }
}
