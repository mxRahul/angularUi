import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public userProfile;
  public token;
  constructor(private httpClient: HttpClient,  private storage: StorageService) {
    this.getProfile();
   }
  /**
   *
   * @param userData user Data
   */
  userLogin(userData) {
    return this.httpClient.post(`${URL.apiURL}/users/login`, userData);
  }


  getProfile() {
    const storageData = this.storage.getData('user');
    this.userProfile = (storageData && storageData.length > 10) ? JSON.parse(storageData) : false;
    this.token = this.userProfile.user ? this.userProfile.user.token : null;
  }

  /**
   *
   * @param userData Updated profile data.
   */
  updateProfile(userData) {
    const header = new HttpHeaders({
      Authorization: this.token
    });
    return this.httpClient.put(`${URL.apiURL}/update`, userData, { headers: header } );
  }


  /**
   *
   * @param userData Updated profile data.
   */
  registerUser(userData) {
    return this.httpClient.post(`${URL.apiURL}/users`, userData);
  }

  getUserDetails(){
    const header = new HttpHeaders({
      Authorization: this.token
    });
    return this.httpClient.get(`${URL.apiURL}/user`, { headers: header } );
  }

  updatePassword(userData){
    const header = new HttpHeaders({
      Authorization: this.token
    });
    return this.httpClient.put(`${URL.apiURL}/updatePassword`, userData, { headers: header } );
  }

  uploadAvatar(formData) {
    const header = new HttpHeaders({
      Authorization: this.token
    });
    return this.httpClient.post(`${URL.apiURL}/uploadImage`, formData, { headers: header });
  }
}

