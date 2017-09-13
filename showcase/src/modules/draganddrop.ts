import { Component } from '@angular/core';
import { Utils, DragEventContext } from 'wizyx';
import { CreateTesterComponentData } from '../source';

@Component(CreateTesterComponentData('draganddrop'))
export class DragAndDropTesterComponent { }

@Component({
	selector: 'draganddrop-test',
	template: `<div class="drop-zone" (ui-drop)="drop($event)" [ui-candrop]="canDrop" ui-drop-data="1">
	Can drop here!
	<div class="draggable" ui-drag [hidden]="selected != 1"></div>
</div>
<div class="drop-zone" (ui-drop)="drop($event)" [ui-candrop]="cantDrop" ui-drop-data="2">
	Cannot drop here!
	<div class="draggable" ui-drag [hidden]="selected != 2"></div>
</div>
<div class="drop-zone" (ui-drop)="drop($event)" [ui-candrop]="canDrop" ui-drop-data="3">
	Can drop here!
	<div class="draggable" ui-drag [hidden]="selected != 3"></div>
</div>`,
})
export class DragAndDropTestComponent {
	protected text: string;
	protected selected: number = 1;

	protected drop(context: DragEventContext): void {
		this.selected = context.dropData;
	}

	protected canDrop(context: DragEventContext): boolean {
		return true;
	}
	protected cantDrop(context: DragEventContext): boolean {
		return false;
	}
}