private readonly _aggregateMaintAvailable$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


setAggregateMaintenance(isAvailable: boolean): void {
    this._aggregateMaintAvailable$.next(isAvailable);
  }

  get aggregateMaintAvailable$(): Observable<boolean> {
    return this._aggregateMaintAvailable$.asObservable();
  }

  ngOnChanges(): void {
    this.memberInfoSvc.aggregateMaintAvailable$.pipe(
    takeUntil(this._destroyed$))
    .subscribe(am => {
      console.log('MemberAggregateByYearComponent::: maintenance:::', am)
      if (am) {
        this.openYearSelectionModal(true);
      }
    })
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }