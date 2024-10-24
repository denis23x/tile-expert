/** @format */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	standalone: true,
	selector: 'app-svg-icon, [appSvgIcon]',
	templateUrl: './svg-icon.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent {
	@Input()
	set appSvgIconSquare(square: string) {
		this.square = square;
	}

	@Input()
	set appSvgIconViewBox(viewBox: string) {
		this.viewBox = viewBox;
	}

	@Input()
	set appSvgIconWidth(width: string) {
		this.width = width;
	}

	@Input()
	set appSvgIconHeight(height: string) {
		this.height = height;
	}

	@Input({ required: true })
	set appSvgIconName(name: string) {
		this.name = '#' + name;
	}

	square: string | undefined;
	viewBox: string = '0 0 24 24';

	width: string = '1.5em';
	height: string = '1.5em';

	name: string | undefined;
}
