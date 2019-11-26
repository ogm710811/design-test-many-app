import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild, ViewChildren, QueryList
} from '@angular/core';
import {
  ActivatedRoute,
  ActivationStart,
  Event,
  NavigationEnd,
  NavigationExtras,
  Router
} from '@angular/router';
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {interval as observableInterval, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import * as uuid from 'uuid';
import {OP} from '../../shared/authority/op';
import {HotkeyDirective} from '../../shared/hotkey/hotkey.directive';
import {MessageBoxService} from '../../shared/message-box/message-box.service';
import {ModalService} from '../../shared/modal/modal.service';
import {PageHeaderService} from '../../shared/page-header/page-header.service';
import {TransferSrvService} from '../../shared/service/transfer-srv.service';
import {ConfiguserApi} from '../../swagger-generated/user/ConfiguserApi';
import {WorkQueueItemVO} from '../../swagger-generated/work-queue-management/model/WorkQueueItemVO';
import {WorkProcessApi} from '../../swagger-generated/work-queue-management/WorkProcessApi';
import {WorkQueueApi} from '../../swagger-generated/work-queue-management/WorkQueueApi';
import {
  checkRecoveryRouteCommandDepositFileVerification,
  checkRecoveryRouteCommandFindCheckRegister,
  checkRecoveryRouteCommandFindDepositTRC,
  checkRecoveryRouteCommandManualEntry,
  checkRecoveryRouteCommandOverPaymentAddOrEdit,
  checkRecoveryRouteCommandOverpaymentRecovery,
  checkRecoveryRouteCommandOverpaymentSelection,
  checkRecoveryRoutePathAddOrEditOverpayment,
  checkRecoveryRoutePathManualEntry,
  checkRecoveryRoutePathOverpaymentRecovery,
  checkRecoveryRoutePathOverpaymentSelection,
  checkRecoveryRoutePathRoot,
  checkRecoveryUrlDepositFileVerification,
  checkRecoveryUrlFindCheckRegister,
  checkRecoveryUrlFindDepositTRC,
  checkRecoveryUrlPrefixDepositDetail
} from '../check-recovery.constants';
import {
  claimProcessingRouteCommandBypass,
  claimProcessingRouteCommandBypassMgmt,
  claimProcessingRouteCommandClaimEligibility,
  claimProcessingRouteCommandDupeClaimCheck,
  claimProcessingRouteCommandElectronicClaimSuspension,
  claimProcessingRouteCommandElectronicClaimVerification,
  claimProcessingRouteCommandHistory,
  claimProcessingRouteCommandMaintenanceApproval,
  claimProcessingRouteCommandManualClaimIntake,
  claimProcessingRouteCommandMemLookup,
  claimProcessingRouteCommandSearch,
  claimProcessingRoutePathBypass,
  claimProcessingRoutePathBypassMgmt,
  claimProcessingRoutePathClaimEligibility,
  claimProcessingRoutePathDupeClaimCheck,
  claimProcessingRoutePathElectronicClaimVerfSuspProcess,
  claimProcessingRoutePathHistory,
  claimProcessingRoutePathMaintenanceApproval,
  claimProcessingRoutePathMemLookup,
  claimProcessingRoutePathRoot,
  claimProcessingRoutePathSearch,
  claimProcessingRoutePathTypeOfService,
  claimProcessingUrlManualClaimIntake,
  claimProcessingUrlPrefixClaimDetails,
  claimProcessingRouteCommandProcess
} from '../claim-processing.constants';
import {
  communicationRouteCommandCommInfo,
  communicationRouteCommandDeleteComm,
  communicationRouteCommandListComm,
  communicationRouteCommandQualityReviewComm,
  communicationRouteCommandRevComm,
  communicationRoutePathCommInfo,
  communicationRoutePathDeleteComm,
  communicationRoutePathListComm,
  communicationRoutePathQualityReviewComm,
  communicationRoutePathRevComm,
  communicationRoutePathRoot
} from '../communication.constants';
import {
  dashboardRouteCommandCurrentStats,
  dashboardRouteCommandDefaultFile,
  dashboardRouteCommandOperatorFile,
  dashboardRouteCommandReplaceEob,
  dashboardRoutePathCurrentStats,
  dashboardRoutePathDefaultFile,
  dashboardRoutePathOperatorFile,
  dashboardRoutePathReplaceEob,
  dashboardRoutePathRoot,
  dashboardUrlDefault,
  workQueueManagementFeature
} from '../dashboard.constants';
import {
  documentRepositoryRouteCommandDocumentSearch,
  documentRepositoryRouteCommandDocumentUpload,
  documentRepositoryRoutePathDocumentDetail,
  documentRepositoryRoutePathDocumentUpload,
  documentRepositoryRoutePathRoot
} from '../document-repository.constants';
import {
  fileMaintenanceRouteCommandClaimNumberRangeFileMaintenanceMenu,
  fileMaintenanceRouteCommandMessageMaintenance,
  fileMaintenanceRoutePathClaimNumberRangeFileMaintenanceMenu,
  fileMaintenanceRoutePathMessageMaintenance,
  fileMaintenanceRoutePathRoot
} from '../file-maintenance.constants';
import {LoginService} from '../login-service/login.service';
import {
  memberInformationRouteCommandEobInfo,
  memberInformationRouteCommandMemberSearch,
  memberInformationRouteCommandProviderSearch,
  memberInformationRoutePathEobInfo,
  memberInformationRoutePathMemberSearch,
  memberInformationRoutePathPlanInfoMaintenanceMenu,
  memberInformationRoutePathProviderSearch,
  memberInformationRoutePathRoot,
  memberInformationUrlPrefixMemberProfile
} from '../member-information.constants';
import {
  processingRouteCommandIcdTableMaintenance,
  processingRouteCommandlDrugInquiry,
  processingRouteCommandReviewCptHpcsCodes,
  processingRouteCommandReviewIcdCodes,
  processingRouteCommandReviewMessages,
  processingRoutePathIcdTableMaintenance,
  processingRoutePathlDrugInquiry,
  processingRoutePathReviewCptHpcsCodes,
  processingRoutePathReviewIcdCodes,
  processingRoutePathReviewMessages,
  processingRoutePathRoot
} from '../processing.constants';
import {
  securityRouteCommandOperatorStatistics,
  securityRoutePathOperatorStatistics,
  securityRoutePathRoot
} from '../security.constants';
import {
  workQueueRoutePathQueueSelection,
  workQueueRoutePathRoot,
  workQueueRoutePathWorkbench
} from '../work-queue.constants';
import {WorkSessionService} from '../work-session-service/work-session.service';
import {
  qualityReviewRouteCommandQualityInformation,
  qualityReviewRouteCommandQualityReviewVolume,
  qualityReviewRouteCommandRevalidationErrorMenu,
  qualityReviewRouteCommandRevalidationMenu,
  qualityReviewRouteCommandRevalidationMenuQQ,
  qualityReviewRouteCommandSequenceNumberInquiry,
  qualityReviewRoutePathQualityInformation,
  qualityReviewRoutePathQualityReviewVolume,
  qualityReviewRoutePathRevalidationErrorMenu,
  qualityReviewRoutePathRevalidationMenu,
  qualityReviewRoutePathRoot,
  qualityReviewRoutePathSequenceNumberInq
} from '../quality-review.constants';
import {homeRoutePathRoot, menuRoutePathRoot} from '../home.constants';
import {AuthorityRule} from '../../shared/authority/authority-rule';
import {ClaimsMaterialApi} from '../../swagger-generated/claim-processing/ClaimsMaterialApi';

/**
 * Displays the header for the FOX UI application when logged in
 */
@Component({
  selector: 'fox-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  /**
   * The html id of the header, which also serves as the prefix for the child divs and spans
   */
  @Input() headerId: string;

  /**
   * The title text appearing in the header's banner
   */
  @Input() headerTitle: string;
  @Output() showMenuChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('cmd') commandElRef?: ElementRef | null;
  @ViewChild('header') element: ElementRef;

  commandInputVal: string = '';
  memberInputVal: string = '';
  recordInputVal: string = '';
  commInputVal: string = '';
  initial = 'inital';

  dashboardConst = '/' + dashboardRoutePathRoot;
  currentStatsConst = dashboardRoutePathCurrentStats;
  homeConst = '/' + homeRoutePathRoot;
  menuConst = menuRoutePathRoot;
  fullname: string = '';
  tokenRefreshTimer: Subscription;
  workQueueCountRefreshTimer: Subscription;
  currentPath: string;
  showMenu = false;
  unknownCommandError: boolean = false;
  noAccessError: boolean = false;
  wqItemCountByUserId: number;
  workbenchTarget = '/' + workQueueRoutePathRoot + '/' + workQueueRoutePathWorkbench;
  queueSelectTarget = '/' + workQueueRoutePathRoot + '/' + workQueueRoutePathQueueSelection;
  planInfoMaintMenuTarget = '/' + memberInformationRoutePathRoot + '/' + memberInformationRoutePathPlanInfoMaintenanceMenu;
  documentFocusChange: number;
  AuthorityRule: AuthorityRule;
  disableOrHideWorkItems: boolean = false;

  get tokenTimeout(): number {
    return this.loginSvc.loginState.token_timeout;
  }

  /**
   * username attribute, which is backed by the LoginService via getter
   *
   * @returns string containing username of currently logged-in user
   */
  get username(): string {
    if (this.loginSvc && this.loginSvc.loginState && this.loginSvc.loginState && this.loginSvc.loginState.username) {
      return this.loginSvc.loginState.username;
    }

    return '';
  }

  get hasReleaseEnableWQ(): boolean {
    return !this.loginSvc.isFeatureDisabled(workQueueManagementFeature);
  }

  get isSecurityAdmin(): boolean {
    return this.loginSvc.isSecurityAdmin;
  }

  get hasMaintainWorkQueueRole(): boolean {
    return this.loginSvc.hasRole(OP.MAINTAIN_WORKQUEUE);
  }

  get hasWorkQueueSession(): boolean {
    return this.workSessionService.hasWorkQueueSession;
  }

  get documentNotesCount(): number {
    return this.workSessionService.documentNotesCount;
  }

  get currentWorkQueueType(): string {
    return this.workSessionService.currentWorkQueueType;
  }

  get currentWorkQueueItem(): WorkQueueItemVO {
    return this.workSessionService.currentSessionWorkQueueItem;
  }

  get currentWorkQueueBusinessId(): string {
    return this.workSessionService.currentWorkQueueBusinessId;
  }

  get currentSessionQueueType(): string {
    return this.workSessionService.workType;
  }

  get fromWorkBench(): boolean {
    return this.workSessionService.fromWorkBench;
  }
  idleState = 'Not started.';
  timedOut = false;

  private clearAndFocusCmdHotkey?: Hotkey;

  private completeAndGetNextCmdHotkey?: Hotkey;

  /**
   * Constructor injecting LoginService so that the username can appear in the top right of the component, and the
   * logout functionality of the service is available to the component's logout link
   *
   * @param router for highlighting the command bar on navigation change
   * @param loginSvc LoginService retrieving login state and providing login and logout related functionality
   * @param userAPISvc
   * @param idle
   * @param ngZone
   * @param hotkeySvc register/unregister hotkeys
   * @param workQueueApi
   * @param messageBoxSvc remove message boxes on logout
   * @param workSessionService
   * @param modalService
   * @param workProcessApi
   * @param transferSrv
   * @param activatedRouteSvc
   * @param messageBoxService
   * @param claimsMaterialApi support processing for Unlock member account on UI logout or timeout
   */
  constructor(private router: Router,
              private loginSvc: LoginService,
              private userAPISvc: ConfiguserApi,
              private idle: Idle,
              private ngZone: NgZone,
              private hotkeySvc: HotkeysService,
              private workQueueApi: WorkQueueApi,
              private messageBoxSvc: MessageBoxService,
              private workSessionService: WorkSessionService,
              private modalService: ModalService,
              private workProcessApi: WorkProcessApi,
              protected transferSrv: TransferSrvService,
              private activatedRouteSvc: ActivatedRoute,
              private claimsMaterialApi: ClaimsMaterialApi,
              private messageBoxService: MessageBoxService,
              private pageHeaderService: PageHeaderService) {

    this.workSessionService.checkSession();

    this.ngZone.runOutsideAngular(() => {
      this.tokenRefreshTimer = observableInterval(this.tokenTimeout * 1000).subscribe(() => {
        this.ngZone.run(() => {
          console.log('get refresh token =>', this.tokenTimeout);
          loginSvc.getRefreshToken();
        });
      });
    });

    // sets an idle timeout.
    this.ngZone.runOutsideAngular(() => {
      if (loginSvc.idleTimeout && loginSvc.logoutTimeout) {
        idle.setIdle(loginSvc.idleTimeout);
        // sets a timeout period after inactivity, the user will be logged out.
        idle.setTimeout(30);
      }
    });

    this.ngZone.runOutsideAngular(() => {
      // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');

      idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!';
        this.timedOut = true;
        console.log('idleState:::', this.idleState)
      });

      idle.onIdleStart.subscribe(() => {
        this.idleState = 'You\'ve gone idle!';
        console.log('idleState:::', this.idleState)
      });

      idle.onTimeoutWarning.subscribe((countdown) => {
        this.idleState = 'You will time out in ' + countdown + ' seconds!';
        console.log('idleState:::', this.idleState)
      });

      idle.onTimeout.subscribe(() =>
        this.ngZone.run(() => {
          this.unlockAccountLogout();
        }));

      this.idle.watch();

      /**
       * fox-claims:
       *
       * property: document.visibilityState
       * document read-only property that returns the visibility of the document.
       * It is useful to know if the document is in the background or an invisible tab,
       * or only loaded for pre-rendering. Possible values are: 'visible', 'hidden', 'prerender'.
       *
       * We use this document property to check if user is in the main-primary window-tab,
       * where he/she was logged in. if state = visible and user logs out from
       * main-primary window-tab the user is logged out from all window-tabs,
       * and the localStorage is clean.
       */
      this.ngZone.runOutsideAngular(() => {
        this.documentFocusChange = window.setInterval(() => {
          this.ngZone.runTask(() => {
            if (document.visibilityState === 'visible') {
              this.loginSvc.isMainTabVisible = true;
            }
          });
        }, 300);
      });

    });
  }

  private static formatNameCasing(str: string): string {
    return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
  }

  ngOnInit(): void {
    this.getFullName();
    this.onRefreshCallWqmUserCount();

  }

  goToDetailPage(tab: number): void {
    if (this.currentWorkQueueType === 'Document') {
      this.router.navigate([documentRepositoryRoutePathRoot + '/' + documentRepositoryRoutePathDocumentDetail], {
        queryParams: {
          dcn: this.currentWorkQueueBusinessId,
          tab: tab
        }
      }).then();
    } else if (this.currentWorkQueueType === 'Deposit') {
      this.router.navigate([checkRecoveryUrlPrefixDepositDetail + this.currentWorkQueueBusinessId]).then();
    }
  }

  sendToWorkBench(): void {
    this.modalService.saveToWorkbenchModalVisible = true;
    this.modalService.saveToWorkbenchItemList = [];
    this.modalService.saveToWorkbenchItemList.push(this.currentWorkQueueItem);
  }

  routeToQueue(): void {
    this.modalService.routeToQueueModalVisible = true;
    this.modalService.routeToQueueItemList = [];
    if (this.currentWorkQueueItem.wqiId) {
      this.modalService.routeToQueueItemList.push(this.currentWorkQueueItem.wqiId);
    }
  }

  completeWorkQueue(endSession: boolean): void {
    if (this.currentWorkQueueItem && this.currentWorkQueueItem.processId && this.workSessionService.hasWorkQueueSession) {
      this.workProcessApi.completeWQItem(this.currentWorkQueueItem.processId, uuid(), endSession, 'response').subscribe((response) => {
        if (this.router.url.startsWith('/' + documentRepositoryRoutePathRoot + '/' + documentRepositoryRoutePathDocumentDetail)) {
          this.router.navigate([this.workSessionService.redirectTo], {queryParams: this.workSessionService.params}).then();
        }
        this.workSessionService.checkSession(!endSession);
        if (response.status === 204 && !endSession) {
          this.messageBoxSvc.addMessageBox(
            'No Items to Work',
            'success',
            'There are no available work items left in the work queue.', 5000);
          return;
        }
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.transferSrv.sendData(event.target.innerWidth);
    this.transferSrv.set('header', this.element.nativeElement.offsetWidth);
  }

  ngAfterViewInit(): void {
    this.transferSrv.set('header', this.element.nativeElement.offsetWidth);
    let cmdFocus: boolean = true;
    this.router.events.pipe(filter((as: ActivationStart) => as instanceof ActivationStart)).subscribe(resp => {
      cmdFocus = !resp.snapshot.data.customFocus;
    });

    if (this.commandElRef && this.commandElRef.nativeElement && cmdFocus) {
      this.commandElRef.nativeElement.focus();
    }
    this.router.events.pipe(filter((ev: Event) => ev instanceof NavigationEnd)).subscribe(() => {
      if (this.commandElRef && this.commandElRef.nativeElement && cmdFocus) {
        if (!this.recordInputVal || this.recordInputVal.length === 0) {
          this.commandElRef.nativeElement.focus();
        }
      }
    });
  }

  ngAfterViewChecked(): void {
    this.clearAndFocusCmdHotkey = HotkeyDirective.registerHotkey(this.hotkeySvc, 'alt+\\', (): boolean => {
      this.commandInputVal = '';
      this.memberInputVal = '';
      this.recordInputVal = '';
      this.commInputVal = '';
      if (this.commandElRef && this.commandElRef.nativeElement) {
        this.commandElRef.nativeElement.focus();
      }

      // return false to prevent event bubbling
      return false;
    }, 'Clear the command bar and give it focus');

    this.completeAndGetNextCmdHotkey = HotkeyDirective.registerHotkey(this.hotkeySvc, 'alt+g', (): boolean => {

      if (!this.disableOrHideWorkItems && !this.workSessionService.fromWorkBench) {
        console.log('Calling complete and next via hotkey');
        this.completeWorkQueue(false);

        // return false to prevent event bubbling
        return false;
      } else {
        return false;
      }
    }, 'Complete and Get next work queue item');

  }

  ngOnDestroy(): void {
    if (this.clearAndFocusCmdHotkey) {
      this.hotkeySvc.remove(this.clearAndFocusCmdHotkey);
    }

    if (this.completeAndGetNextCmdHotkey) {
      this.hotkeySvc.remove((this.completeAndGetNextCmdHotkey));
    }

    if (this.documentFocusChange) {
      clearInterval(this.documentFocusChange);
    }
  }

  /**
   * The LoginService's logout() function, exposed to this component
   */
  btnLogoutEventClick(): void {
    this.unlockAccountLogout();
  }

  unlockAccountLogout(): void {
    this.claimsMaterialApi.unlockAccountLogout(uuid()).subscribe(res => {
      this.logout();
    }, e => {
      if (e.status === 404 || e.status === 401) {
        this.logout();
      } else {
        this.messageBoxService.addMessageBox('Error', 'error', 'Accounts have not been unlocked. Please try to logout again.');
      }
    });
  }

  logout(): void {
    this.pageHeaderService.reset();
    if (this.hasWorkQueueSession) {
      this.workSessionService.endSessionLogout();
    } else {
      this.loginSvc.logout();
    }
    if (this.hasReleaseEnableWQ) {
      if (this.workQueueCountRefreshTimer) {
        this.workQueueCountRefreshTimer.unsubscribe();
      }
    }
    this.tokenRefreshTimer.unsubscribe();
    this.messageBoxSvc.empty();
  }

  getFullName(): void {
    this.fullname = this.username;
    if (this.username) {
      this.userAPISvc.getUser(this.username, uuid()).subscribe(userObj => {
        if (userObj.firstName && userObj.lastName) {
          this.fullname = HeaderComponent.formatNameCasing(userObj.firstName) + ' ' + HeaderComponent.formatNameCasing(userObj.lastName);
        }
      });
    }
  }

  endSession(): Subscription {
    return this.workSessionService.endSession().add(() => {
      if (this.router.url.startsWith('/' + documentRepositoryRoutePathRoot + '/' + documentRepositoryRoutePathDocumentDetail)) {
        this.router.navigate([this.workSessionService.redirectTo], {queryParams: this.workSessionService.params}).then();
      }
    });
  }

  navigateTo(destination: string): void {

    let param: NavigationExtras = {};
    this.transferSrv.set('common', undefined);
    this.transferSrv.set('container', undefined);
    if (this.recordInputVal && this.commandInputVal.toUpperCase() === claimProcessingRouteCommandBypass) {
      param = { queryParams: { transid: this.recordInputVal } };
    } else if ((this.commandInputVal.toUpperCase() === claimProcessingRouteCommandHistory
      || this.commandInputVal.toLocaleUpperCase() === checkRecoveryRouteCommandOverPaymentAddOrEdit
      || this.commandInputVal.toLocaleUpperCase() === checkRecoveryRouteCommandOverpaymentSelection
      || this.commandInputVal.toLocaleUpperCase() === checkRecoveryRouteCommandOverpaymentRecovery
      || this.commandInputVal.toLocaleUpperCase() === communicationRouteCommandCommInfo
      || this.commandInputVal.toLocaleUpperCase() === communicationRouteCommandDeleteComm
      || this.commandInputVal.toLocaleUpperCase() === communicationRouteCommandListComm
      || this.commandInputVal.toLocaleUpperCase() === communicationRouteCommandRevComm
      || this.commandInputVal.toLocaleUpperCase() === communicationRouteCommandQualityReviewComm
      || this.commandInputVal.toLocaleUpperCase() === processingRouteCommandIcdTableMaintenance
      || this.commandInputVal.toLocaleUpperCase() === processingRouteCommandlDrugInquiry
      || this.commandInputVal.toLocaleUpperCase() === processingRouteCommandReviewIcdCodes
      || this.commandInputVal.toLocaleUpperCase() === processingRouteCommandReviewMessages
      || this.commandInputVal.toLocaleUpperCase() === qualityReviewRouteCommandRevalidationMenu
      || this.commandInputVal.toLocaleUpperCase() === qualityReviewRouteCommandRevalidationMenuQQ
      || this.commandInputVal.toLocaleUpperCase() === qualityReviewRouteCommandQualityInformation
      || this.commandInputVal.toLocaleUpperCase() === processingRouteCommandReviewCptHpcsCodes
      || this.commandInputVal.toLocaleUpperCase() === dashboardRouteCommandReplaceEob
      || this.commandInputVal.toLocaleUpperCase() === claimProcessingRouteCommandClaimEligibility)
      && (this.recordInputVal || this.memberInputVal || this.commInputVal)) {
      param = {
        queryParams: {
          claimNumid: this.recordInputVal,
          memberid: this.memberInputVal,
          commId: this.commInputVal,
          command: this.commandInputVal,
          eibTrnId: 'RPC1'
        }
      };
    } else if (this.commandInputVal.toLocaleUpperCase() === claimProcessingRouteCommandElectronicClaimSuspension
      || this.commandInputVal.toLocaleUpperCase() === claimProcessingRouteCommandElectronicClaimVerification
      && (this.recordInputVal || this.memberInputVal || this.commInputVal || this.commandInputVal)) {
      param = {
        queryParams: {
          claimNumid: this.recordInputVal,
          memberid: this.memberInputVal,
          commId: this.commInputVal,
          command: this.commandInputVal,
          eibTrnId: 'RPC1'
        }
      };
    }
    this.router.navigate([destination], param).then((val) => {
      if (val == null) {
        this.noAccessError = false;
      } else if (!val && destination !== this.currentPath) {
        this.noAccessError = true;
      } else {
        this.currentPath = destination;
        this.commandInputVal = '';
        this.memberInputVal = '';
        this.recordInputVal = '';
        this.commInputVal = '';
      }
    });
  }

  navigateToRoute(module, page): void {
    this.router.navigate(['/' + module + '/' + page]).then();
    this.showMenu = false;
    this.showMenuChange.emit(this.showMenu);
  }

  menuToggle(): void {
    this.showMenu = !this.showMenu;
    this.showMenuChange.emit(this.showMenu);
  }

  menuToggleFalse(): void {
    this.showMenu = false;
    this.showMenuChange.emit(this.showMenu);
  }

  checkEnableMemberInput(): boolean {
    const commandValue = this.commandInputVal.toUpperCase();
    const enableInput = ((commandValue === memberInformationRouteCommandMemberSearch)
      || (commandValue === claimProcessingRouteCommandHistory)
      || (commandValue === checkRecoveryRouteCommandOverPaymentAddOrEdit)
      || (commandValue === checkRecoveryRouteCommandOverpaymentSelection)
      || (commandValue === checkRecoveryRouteCommandOverpaymentRecovery)
      || (commandValue === communicationRouteCommandListComm)
      || (commandValue === communicationRouteCommandCommInfo)
      || (commandValue === dashboardRouteCommandReplaceEob)
      || (commandValue === communicationRouteCommandCommInfo)
      || (commandValue === claimProcessingRouteCommandElectronicClaimSuspension));
    if (!enableInput) {
      this.memberInputVal = '';
    }

    return enableInput;
  }

  checkEnableRecordInput(): boolean {
    const commandValue = this.commandInputVal.toUpperCase();
    const enableInput = ((commandValue === claimProcessingRouteCommandBypass)
      || (commandValue === claimProcessingRouteCommandHistory)
      || (commandValue === checkRecoveryRouteCommandOverPaymentAddOrEdit)
      || (commandValue === qualityReviewRouteCommandRevalidationMenu)
      || (commandValue === qualityReviewRouteCommandRevalidationMenuQQ)
      || (commandValue === qualityReviewRouteCommandQualityInformation)
      || (commandValue === checkRecoveryRouteCommandOverpaymentSelection)
      || (commandValue === checkRecoveryRouteCommandOverpaymentRecovery)
      || (commandValue === dashboardRouteCommandReplaceEob)
      || (commandValue === checkRecoveryRouteCommandOverpaymentSelection)
      || (commandValue === claimProcessingRouteCommandElectronicClaimSuspension)
      || (commandValue === claimProcessingRouteCommandClaimEligibility)
    );

    if (!enableInput) {
      this.recordInputVal = '';
    }

    return enableInput;
  }

  checkEnableCommInput(): boolean {
    const commandValue = this.commandInputVal.toUpperCase();
    const enableInput = (commandValue === communicationRouteCommandDeleteComm
      || commandValue === communicationRouteCommandRevComm
      || commandValue === communicationRouteCommandQualityReviewComm);

    if (!enableInput) {
      this.commInputVal = '';
    }

    return enableInput;
  }

  onChangePage(): void {
    this.unknownCommandError = false;
    this.noAccessError = false;
  }

  onKeyPress(event: KeyboardEvent): void {
    this.unknownCommandError = false;
    this.noAccessError = false;

    if (event.keyCode && event.keyCode === 13) {
      switch (this.commandInputVal.toUpperCase()) {
        case dashboardRouteCommandCurrentStats: {
          this.navigateTo(dashboardUrlDefault);
          break;
        }
        case dashboardRouteCommandOperatorFile: {
          this.navigateTo(dashboardRoutePathRoot + '/' + dashboardRoutePathOperatorFile);
          break;
        }
        case dashboardRouteCommandDefaultFile: {
          this.navigateTo(dashboardRoutePathRoot + '/' + dashboardRoutePathDefaultFile);
          break;
        }
        case claimProcessingRouteCommandSearch: {
          this.navigateTo(claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathSearch);
          break;
        }
        case claimProcessingRouteCommandHistory: {
          if (this.recordInputVal) {
            this.navigateTo(claimProcessingUrlPrefixClaimDetails + '/' + this.recordInputVal);
          } else {
            this.navigateTo(claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathHistory);
          }
          break;
        }
        case claimProcessingRouteCommandMaintenanceApproval: {
          this.navigateTo(claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathMaintenanceApproval);
          break;
        }
        case claimProcessingRouteCommandDupeClaimCheck: {
          this.navigateTo(claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathDupeClaimCheck);
          break;
        }
        case claimProcessingRouteCommandMemLookup: {
          this.navigateTo(claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathMemLookup);
          break;
        }
        case claimProcessingRouteCommandBypass: {
          this.navigateTo(claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathBypass);
          break;
        }
        case claimProcessingRouteCommandBypassMgmt: {
          this.navigateTo(claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathBypassMgmt);
          break;
        }
        case claimProcessingRouteCommandClaimEligibility: {
          this.navigateTo(claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathClaimEligibility);
          break;
        }
        case claimProcessingRouteCommandManualClaimIntake: {
          this.navigateTo(claimProcessingUrlManualClaimIntake);
          break;
        }
        case checkRecoveryRouteCommandFindCheckRegister: {
          this.navigateTo(checkRecoveryUrlFindCheckRegister);
          break;
        }
        case documentRepositoryRouteCommandDocumentSearch: {
          this.navigateTo(documentRepositoryRoutePathRoot);
          break;
        }
        case documentRepositoryRouteCommandDocumentUpload: {
          this.navigateTo(documentRepositoryRoutePathRoot + '/' + documentRepositoryRoutePathDocumentUpload);
          break;
        }
        case checkRecoveryRouteCommandManualEntry: {
          this.navigateTo(checkRecoveryRoutePathRoot + '/' + checkRecoveryRoutePathManualEntry);
          break;
        }
        case memberInformationRouteCommandMemberSearch: {
          if (this.memberInputVal) {
            this.navigateTo(memberInformationUrlPrefixMemberProfile + '/' + this.memberInputVal);
          } else {
            this.navigateTo(memberInformationRoutePathRoot + '/' + memberInformationRoutePathMemberSearch);
          }
          break;
        }
        case memberInformationRouteCommandProviderSearch: {
          this.navigateTo(memberInformationRoutePathRoot + '/' + memberInformationRoutePathProviderSearch);
          break;
        }
        case memberInformationRouteCommandEobInfo: {
          this.navigateTo(memberInformationRoutePathRoot + '/' + memberInformationRoutePathEobInfo);
          break;
        }
        case checkRecoveryRouteCommandFindDepositTRC: {
          this.navigateTo(checkRecoveryUrlFindDepositTRC);
          break;
        }
        case checkRecoveryRouteCommandDepositFileVerification: {
          this.navigateTo(checkRecoveryUrlDepositFileVerification);
          break;
        }

        case checkRecoveryRouteCommandOverPaymentAddOrEdit: {
          this.navigateTo(checkRecoveryRoutePathRoot + '/' + checkRecoveryRoutePathAddOrEditOverpayment);
          break;
        }

        case checkRecoveryRouteCommandOverpaymentSelection: {
          this.navigateTo(checkRecoveryRoutePathRoot + '/' + checkRecoveryRoutePathOverpaymentSelection);
          break;
        }

        case checkRecoveryRouteCommandOverpaymentRecovery: {
          this.navigateTo(checkRecoveryRoutePathRoot + '/' + checkRecoveryRoutePathOverpaymentRecovery);
          break;
        }

        case communicationRouteCommandQualityReviewComm: {
          this.navigateTo(communicationRoutePathRoot + '/' + communicationRoutePathQualityReviewComm);
          break;
        }

        case communicationRouteCommandRevComm: {
          this.navigateTo(communicationRoutePathRoot + '/' + communicationRoutePathRevComm);
          break;
        }

        case communicationRouteCommandDeleteComm: {
          this.navigateTo(communicationRoutePathRoot + '/' + communicationRoutePathDeleteComm);
          break;
        }

        case communicationRouteCommandCommInfo: {
          this.navigateTo(communicationRoutePathRoot + '/' + communicationRoutePathCommInfo);
          break;
        }

        case communicationRouteCommandListComm: {
          this.navigateTo(communicationRoutePathRoot + '/' + communicationRoutePathListComm);
          break;
        }

        case processingRouteCommandIcdTableMaintenance: {
          this.navigateTo(processingRoutePathRoot + '/' + processingRoutePathIcdTableMaintenance);
          break;
        }

        case processingRouteCommandlDrugInquiry: {
          this.navigateTo(processingRoutePathRoot + '/' + processingRoutePathlDrugInquiry);
          break;
        }

        case processingRouteCommandReviewIcdCodes: {
          this.navigateTo(processingRoutePathRoot + '/' + processingRoutePathReviewIcdCodes);
          break;
        }

        case processingRouteCommandReviewMessages: {
          this.navigateTo(processingRoutePathRoot + '/' + processingRoutePathReviewMessages);
          break;
        }

        case processingRouteCommandReviewCptHpcsCodes: {
          this.navigateTo(processingRoutePathRoot + '/' + processingRoutePathReviewCptHpcsCodes);
          break;
        }

        case fileMaintenanceRouteCommandMessageMaintenance: {
          this.navigateTo(fileMaintenanceRoutePathRoot + '/' + fileMaintenanceRoutePathMessageMaintenance);
          break;
        }

        case fileMaintenanceRouteCommandClaimNumberRangeFileMaintenanceMenu: {
          this.navigateTo(fileMaintenanceRoutePathRoot + '/' + fileMaintenanceRoutePathClaimNumberRangeFileMaintenanceMenu);
          break;
        }

        case securityRouteCommandOperatorStatistics: {
          this.navigateTo(securityRoutePathRoot + '/' + securityRoutePathOperatorStatistics);
          break;
        }

        case securityRouteCommandOperatorStatistics: {
          this.navigateTo(securityRoutePathRoot + '/' + securityRoutePathOperatorStatistics);
          break;
        }

        case qualityReviewRouteCommandRevalidationMenu: {
          this.navigateTo(qualityReviewRoutePathRoot + '/' + qualityReviewRoutePathRevalidationMenu);
          this.transferSrv.set('cmd', 'QR');
          break;
        }

        case qualityReviewRouteCommandRevalidationMenuQQ: {
          this.navigateTo(qualityReviewRoutePathRoot + '/' + qualityReviewRoutePathRevalidationMenu);
          this.transferSrv.set('cmd', 'QQ');
          break;
        }

        case qualityReviewRouteCommandSequenceNumberInquiry: {
          this.navigateTo(qualityReviewRoutePathRoot + '/' + qualityReviewRoutePathSequenceNumberInq);
          break;
        }

        case qualityReviewRouteCommandQualityReviewVolume: {
          this.navigateTo(qualityReviewRoutePathRoot + '/' + qualityReviewRoutePathQualityReviewVolume);
          break;
        }
        case qualityReviewRouteCommandQualityInformation: {
          this.navigateTo(qualityReviewRoutePathRoot + '/' + qualityReviewRoutePathQualityInformation);
          break;
        }

        case qualityReviewRouteCommandRevalidationErrorMenu: {
          this.navigateTo(qualityReviewRoutePathRoot + '/' + qualityReviewRoutePathRevalidationErrorMenu);
          break;
        }

        case claimProcessingRouteCommandElectronicClaimVerification: {
          this.navigateTo(claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathElectronicClaimVerfSuspProcess);
          break;
        }

        case claimProcessingRouteCommandElectronicClaimSuspension: {
          if (this.commandInputVal !== '' && this.recordInputVal !== '') {
            this.navigateTo(claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathTypeOfService);
          } else {
            this.navigateTo(claimProcessingRoutePathRoot + '/' + claimProcessingRoutePathElectronicClaimVerfSuspProcess);
          }
          break;
        }

        case dashboardRouteCommandReplaceEob: {
          this.navigateTo(dashboardRoutePathRoot + '/' + dashboardRoutePathReplaceEob);
          break;
        }

        default: {
          this.unknownCommandError = true;
          break;
        }
      }
    }
  }

  onRefreshCallWqmUserCount(): void {
    this.menuToggleFalse();
    if (this.hasMaintainWorkQueueRole) {
      this.workQueueApi.getWorkbenchCount(this.loginSvc.loginState.username, uuid(), 'response').subscribe(resp => {
        if (resp.status === 200) {
          if (resp.body) {
            if (resp.body.itemCount) {
              this.wqItemCountByUserId = resp.body.itemCount;
            }
          }
        } else {
          this.failedResponse();
        }
      }, (e) => {
        if (e.status === 404) {
          this.wqItemCountByUserId = 0;
        } else {
          this.failedResponse();
        }
      });
      if (this.hasWorkQueueSession) {
        this.workSessionService.getDocNotesCount();
      }

    } else {
      this.failedResponse();
    }
  }

  failedResponse(): void {
    this.wqItemCountByUserId = -1;
  }

  /**
   * fox-claims:
   *
   * event: window:beforeunload
   * it fired when the window, the document, and its resources are about to be unloaded.
   * The document is still visible and the event is still cancelable at this point.
   *
   * We use this event to check if user close the window-tab,
   * if that happens the App is close, the user is logged out
   * and the localStorage is clean.
   */
  @HostListener('window:beforeunload', ['$event'])
  windowClose(e): void {
    this.loginSvc.logout();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any): number {
    if (this.loginSvc.sessionId === localStorage.getItem('sessionId')) {
      localStorage.removeItem('sessionId');
      sessionStorage.removeItem('sessionLock');
    }
    return 0;
  }
}
