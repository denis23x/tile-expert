/** @format */

import { ChangeDetectionStrategy, Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DOCUMENT, isPlatformBrowser, NgClass } from '@angular/common';
import { filter, fromEvent, Subscription } from 'rxjs';
import { HeaderExtraComponent } from '../header-extra/header-extra.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
	standalone: true,
	selector: 'app-header, [appHeader]',
	templateUrl: './header.component.html',
	imports: [RouterLink, NgClass, HeaderExtraComponent, SvgIconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
	private readonly document: Document = inject(DOCUMENT);
	private readonly platformId: object = inject(PLATFORM_ID);

	searchIsVisible: WritableSignal<boolean> = signal<boolean>(false);
	extrasIsVisible: WritableSignal<boolean> = signal<boolean>(false);

	searchToggle(mouseEvent: MouseEvent): void {
		if (isPlatformBrowser(this.platformId)) {
			mouseEvent.stopPropagation();

			this.searchIsVisible.set(!this.searchIsVisible());

			const searchForm: HTMLElement | null = this.document.getElementById('header-search-form');
			const searchFormClose: HTMLElement | null = this.document.getElementById('header-search-form-close');

			if (searchForm && searchFormClose) {
				const search$: Subscription = fromEvent(window, 'click')
					.pipe(filter((event: Event) => !!event.target))
					.subscribe({
						next: (event: Event) => {
							const clickOutside: boolean = !searchForm.contains(event.target as Node);
							const clickClose: boolean = searchFormClose.contains(event.target as Node);

							if (clickOutside || clickClose) {
								this.searchIsVisible.set(false);
								this.extrasIsVisible.set(false);

								search$.unsubscribe();
							}
						}
					});
			}
		}
	}
}
