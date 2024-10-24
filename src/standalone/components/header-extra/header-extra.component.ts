/** @format */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
	standalone: true,
	selector: 'app-header-extra, [appHeaderExtra]',
	templateUrl: './header-extra.component.html',
	imports: [CheckboxComponent, SvgIconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderExtraComponent {
	history: string[] = [
		'закрепить теги',
		'кнопка',
		'приложение',
		'форма',
		'закрепить теги',
		'кнопка',
		'приложение',
		'форма',
		'закрепить теги',
		'кнопка',
		'приложение',
		'форма'
	];
}
