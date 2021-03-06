import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
	selector: 'button',
})
export class ButtonDirective {
	/**
	 * Bootstrap 4 button styles
	 */
	public static readonly BOOTSTRAP_STYLES = [
		'default',
		'primary',
		'success',
		'info',
		'warning',
		'danger',
		'link'
	]

	constructor(protected element: ElementRef) {
		const classList = this.getClassList();
		if (!classList.contains('btn')) {
			classList.add('btn');
		}
	}
	
	/**
	 * Style of the button
	 */
	@Input('buttonstyle')
	public set style(style: string) {
		if (style && !ButtonDirective.BOOTSTRAP_STYLES.some(s => s === style)) {
			throw 'Invalid Button Style!';
		}
		const classList = this.getClassList();
		ButtonDirective.BOOTSTRAP_STYLES.forEach(s => {
			if (classList.contains('btn-' + s)) {
				classList.remove('btn-' + s);
			}
		});
		if (style) {
			classList.add('btn-' + style);
		}
	}

	protected getClassList(): DOMTokenList {
		return (<HTMLScriptElement>this.element.nativeElement).classList;
	}
}