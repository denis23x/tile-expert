/** @format */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
	standalone: true,
	selector: 'app-checkbox, [appCheckbox]',
	templateUrl: './checkbox.component.html',
	imports: [SvgIconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {}
