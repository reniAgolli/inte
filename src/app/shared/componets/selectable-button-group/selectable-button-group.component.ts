import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {map, tap} from 'rxjs/operators';
import {CustomFormGroupValidators} from '../../../helpers/custom-validators/CustomFormGroupValidators';

@Component({
  selector: 'app-selectable-button-group',
  templateUrl: './selectable-button-group.component.html',
  styleUrls: ['./selectable-button-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectableButtonGroupComponent implements OnInit {

  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Input() elements: { name: string, value: string }[];
  @Input() selectedFilters = [];
  @Input() multiple = false;
  @Input() maximumSelections = 0;

  control: FormControl = new FormControl([]);
  selected: string[] = [];
  private _oldValue;

  constructor() {
  }

  ngOnInit(): void {

    if (this.selectedFilters) {
      console.log('M', this.selectedFilters);
      this.selected = this.selectedFilters;
      this.control.setValue(this.selectedFilters, {emitEvent: true});
    }

    this.control.setValidators(CustomFormGroupValidators.MinimumCheckboxesChecked(this.maximumSelections));

    this.control.valueChanges.pipe(
      map(value => this._removeIfRequiredNotMultiple(value)),
      tap(e => this.selected = e),
      tap(e => console.log(this.control.valid))
    ).subscribe(e => this.valueChange.next(e));
  }

  private _removeIfRequiredNotMultiple(value: string[]) {
    if (!this.multiple) {
      if (value.length > 1) {
        value.splice(value.indexOf(this._oldValue), 1);
        this.control.setValue(value, {emitEvent: false});
      }
      this._oldValue = value[0];
    }
    return value;
  }
}
