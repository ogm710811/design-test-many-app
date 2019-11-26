lockAccount(): void {
    if (this.memberProfile && this.memberProfile.memberDetails && this.memberProfile.memberDetails.aarpMembershipNumber && this.memberProfile.memberDetails.householdId && this.memberProfile.memberDetails.householdId.length > 0) {
      const membershipNumber = (this.memberProfile.memberDetails.aarpMembershipNumber.membershipNumber + '' + this.memberProfile.memberDetails.aarpMembershipNumber.associationId + '' + this.memberProfile.memberDetails.householdId[0].insuredCode);

      // save membershipNumber in localStore
      localStorage.setItem('memberNumber', membershipNumber);

      this.accountLock.lockAccount(membershipNumber, uuid()).subscribe(res => {
        if (res.lockStatus === 'LOCKED') {
          this.getAggregateYears();
          this.yearSelectionModal.openModal();
        }
      }, err => {
        if (err.status === 400) {
          this.messageBoxService.addMessageBox('Error', 'error', 'Member is currently locked and maintenance cannot be performed.');
        } else {
          this.messageBoxService.addMessageBox('Error', 'error', 'The account has not been locked. Please close out and try again.');
        }
      });
    }
  }