import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ResponseObject } from '../definitions';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  public userProfile1: ResponseObject;
  public userProfile: ResponseObject;
  public showProfile = false;
  public showPasswordComponent = false;
  public showUploadButton = false;
  public showLoader = false;
  public isOpen = false;
  public title = 'toaster-not';
  @Output() featureSelected = new EventEmitter<string>();
  // tslint:disable-next-line:max-line-length
  constructor(private notifyService: NotificationService, private http: HttpService, private router: Router, private storage: StorageService) {
   
  }

  ngOnInit(): void {
    const storageData = this.storage.getData('user');
    this.userProfile1 = (storageData && storageData.length > 10) ? JSON.parse(storageData) : false;
    this.http.getUserDetails().subscribe((response: any) => {
      if (response) {
        this.userProfile = response;
      }
    }, (err) => {
      this.showLoader = false;
    });
  }


  profileUpdateHandler(updateData) {
    this.userProfile = updateData;
  }

  logoutUser() {
    this.notifyService.showInfo("Logout successfully !!", "Success");
    this.storage.clearStorage();
    this.router.navigateByUrl('/login');
  }

  onSelect(feature) {
    this.isOpen = true;
    this.router.navigate(['/update'],  feature);
  }

  onUpdatePassword(){
    this.router.navigate(['/updatePassword']);
  }
}
