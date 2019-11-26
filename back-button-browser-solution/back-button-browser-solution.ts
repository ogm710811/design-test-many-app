import {Component, HostListener} from '@angular/core';
import {LoginService} from './core/login-service/login.service';
import {Event as NavigationEvent, NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {ClaimsMaterialApi} from './swagger-generated/claim-processing/ClaimsMaterialApi';
import * as uuid from 'uuid';
import {MessageBoxService} from './shared/message-box/message-box.service';
/**
 * fox-claims
 *
 * NOTE: with Angular 6, the Angular team added a "navigationTrigger" property and
 * a "restoredState" property to the NavigationStart Router event.
 * This gives us the ability to differentiate between an imperative navigation
 * (ex, the user clicked a router-link) and a location-change navigation
 * (ex, the user clicked the Back or Forward buttons in the browser).
 * We are using those properties to identify when the user click the back button
 * in the Browser and emit this event to be used to unlock member account.
 */

@Component({
  selector: 'fox-ui-app',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(
      private loginSvc: LoginService,
      private router: Router,
      claimsMemberApi: ClaimsMaterialApi,
      messageBoxService: MessageBoxService) {

    router.events
        .pipe(
            filter(
                (event: NavigationEvent) =>  {
                  return (event instanceof NavigationStart);
                }
            )
        ).subscribe((event: NavigationStart) => {
          if (event.restoredState) {
            const memberNumber = localStorage.getItem('memberNumber');
            if (memberNumber) {
              claimsMemberApi.getLockAccountStatus(memberNumber, uuid()).subscribe(status => {
                if (status.lockStatus === 'LOCKED') {
                  claimsMemberApi.unlockAccount(memberNumber, uuid()).subscribe(res => {
                    messageBoxService.addMessageBox('Success', 'success', 'Member was unlocked.', 3000);
                  }, err => {
                    messageBoxService.addMessageBox('Error', 'error', 'The account has not been unlocked.');
                  });
                }
                localStorage.removeItem('memberNumber');
              });
            }
          }
        }
    );
  }

  /**
   * fox-claims:
   *
   * event: window:storage
   * fired whenever a change is made to the Storage object.
   * it's a way for other windows-tabs on the domain using the storage
   * to sync any changes that are made.
   *
   * We use this event to check if user logs out from a second open tab,
   * if that happens the App logs out from all window-tabs
   * and the localStorage is clean.
   */
  @HostListener('window:storage', ['$event'])
  storageChange(e): void {
    if (e.key === 'loginState') {
      this.loginSvc.onNewLoginState();
    }
  }
}
