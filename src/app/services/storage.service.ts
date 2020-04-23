import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  setData(key: string, data: string) {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.setItem(key, data);
    }
  }

  getData(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      return window.localStorage.getItem(key);
    } else {
      return '';
    }
  }

  clearStorage() {
    if (isPlatformBrowser(this.platformId)) {
      window.localStorage.clear();
    }
  }
}
