import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DebugService {

  isDevEnv: boolean = !environment.production;

  constructor() { }

  /**
   * Print debug messages in browser console
   *
   * @param message
   * @param params
   */
  log(message: any, ...params: any): void {
    this.isDevEnv && console.log(message, ...params);
  }

  /**
   * Print warning messages in browser console
   *
   * @param message
   * @param params
   */
  warn(message: any, ...params: any): void {
    this.isDevEnv && console.warn(message, ...params);
  }

  /**
   * Print error messages in browser console
   *
   * @param message
   * @param params
   */
  error(message: any, ...params: any): void {
    this.isDevEnv && console.error(message, ...params);
  }

}
