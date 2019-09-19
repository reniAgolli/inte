import {Injectable} from '@angular/core';
import {FuseSidebarService} from '@theme/components/sidebar/sidebar.service';
import {ShiftDetails} from '../models/ShiftDetails';
import {Subject} from 'rxjs';
import {StaffMember} from '../models/StaffMember';

@Injectable({
  providedIn: 'root'
})
export class ShiftManagementService {

  public shiftChange: Subject<{ shiftDetails: ShiftDetails, staffMember?: StaffMember }> = new Subject();
  private _sidebarName = 'shiftManagement';

  constructor(private _sidebareService: FuseSidebarService) {
  }

  openShiftDetailsPanel(shiftDetails: ShiftDetails, staffMember: StaffMember) {
    const sidebar = this._sidebareService.getSidebar(this._sidebarName);
    if (!sidebar.opened) {
      sidebar.toggleOpen();
    }
    this.shiftChange.next({shiftDetails, staffMember});
  }

  openFillShiftPanel(shiftDetails: ShiftDetails) {
    const sidebar = this._sidebareService.getSidebar(this._sidebarName);
    if (!sidebar.opened) {
      sidebar.toggleOpen();
    }
    this.shiftChange.next({shiftDetails});
  }

  closePanel() {
    this._sidebareService.getSidebar(this._sidebarName).toggleOpen();
    this.shiftChange.next(null);
  }
}
