import { Component, Input, Output, EventEmitter, ContentChild, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { InputTemplate } from '../template/InputTemplate';
import { List } from '../list/List';
import { ListItem } from '../list/ListItem';

export type SearchBoxDataSource = { value: string }[];

export interface InputTemplateData {
	data: { value: string };
	events: {
		onChange: (value: string) => void,
		onKeydown: (event: KeyboardEvent) => void
	};
}

export interface ElementDataInput {
	selectedIndex: number;
};

export class SearchBoxListItem extends ListItem {
	constructor(private input: ElementDataInput, public value: string, index: number, count: number) {
		super(index, count);
	}

	public get selected(): boolean {
		return this.index === this.input.selectedIndex;
	}
}

@Component({
	selector: 'uisearchbox',
	template: `<div (focusout)="lostFocus($event)">
	<ng-template [templatecreator]="inputTemplate.template" [data]="inputTemplateData"></ng-template>
	<div class="searchbox-element-list" tabindex="0" #searchBoxList (keydown)="keydown($event)">
		<div [hidden]="!isOpen" class="searchbox-list-elements" #elementContainer>
			<div *ngFor="let d of dataSource;let last=last;" (click)="selectValue(d.value)" class="searchbox-list-element">
				<ng-template [templatecreator]="listElement.template" [data]="d"></ng-template>
				<ng-template [templatecreator]="listElementSeparator.template" *ngIf="!last && listElementSeparator"></ng-template>
			</div>
		</div>
	</div>
</div>`,
})
export class SearchboxComponent extends List {
	@ContentChild(InputTemplate) public inputTemplate: InputTemplate;
	@Output('valueChange') public readonly valueChange: EventEmitter<string> = new EventEmitter<string>();
	@Input('dataSource') protected dataSourceFactory: (text: string) => Promise<string[]>;
	@ViewChild('searchBoxList') protected searchBoxList: ElementRef;
	@ViewChild('elementContainer') protected elementContainer: ElementRef;

	protected inputTemplateData: InputTemplateData = { data: { value: '' }, events: { onChange: (value) => this.onChange(value), onKeydown: (event) => this.keydown(event) } };
	protected dataSource: SearchBoxListItem[] = [];
	protected isOpen: boolean = false;
	protected elementDataInput: ElementDataInput = {
		selectedIndex: 0
	};

	public ngAfterContentInit(): void {
		super.ngAfterContentInit();
		if (this.inputTemplate == null) {
			throw 'Invalid Searchbox component!\nInputTemplate is a mandatory template.';
		}
	}

	/**
	 * Sets the value
	 */
	@Input('value')
	public set setValue(value: string) {
		if (this.inputTemplateData.data.value !== value) {
			this.inputTemplateData.data.value = value;
			this.valueChange.emit(value);
		}
	}

	protected selectValue(value: string): void {
		this.setValue = value;
		this.isOpen = false;
	}

	protected lostFocus(event: MouseEvent): void {
		if (event.relatedTarget === this.searchBoxList.nativeElement) {
			if (!this.isOpen) {
				this.refreshList();
			}
		} else {
			this.isOpen = false;
		}
	}

	protected keydown(event: KeyboardEvent): void {
		if (!this.isOpen) {
			return;
		}
		if (event.keyCode === 13) { // Enter
			this.selectValue(this.dataSource[this.elementDataInput.selectedIndex].value);
		} else if (event.keyCode === 38) { // Up
			if (this.elementDataInput.selectedIndex > 0) {
				this.elementDataInput.selectedIndex--;
				const container = <HTMLScriptElement>this.elementContainer.nativeElement;
				const div = container.children[this.elementDataInput.selectedIndex];
				if ((<any>div).offsetTop < container.scrollTop) {
					container.scrollTop -= container.scrollTop - (<any>div).offsetTop;
				}
			}
		} else if (event.keyCode === 40) { // Down
			if (this.elementDataInput.selectedIndex + 1 < this.dataSource.length) {
				this.elementDataInput.selectedIndex++;
				const container = <HTMLScriptElement>this.elementContainer.nativeElement;
				const div = container.children[this.elementDataInput.selectedIndex];
				const offsetBottom = (<any>div).offsetTop + div.getBoundingClientRect().height;
				const scrollBottom = container.scrollTop + container.getBoundingClientRect().height;
				if (offsetBottom > scrollBottom) {
					container.scrollTop += offsetBottom - scrollBottom;
				}
			}
		}
	}

	protected onChange(value: string): void {
		this.inputTemplateData.data.value = value;
		this.valueChange.emit(value);
		this.refreshList();
	}

	protected refreshList(): void {
		this.dataSourceFactory(this.inputTemplateData.data.value).then(items => {
			this.dataSource = items.map((item, index) => { return new SearchBoxListItem(this.elementDataInput, item, index, items.length); });
			this.isOpen = true;
			this.elementDataInput.selectedIndex = 0;
			const container = <HTMLScriptElement>this.elementContainer.nativeElement;
			container.scrollTop = 0;
		});
	}
}
