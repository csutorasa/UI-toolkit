import { Component } from '@angular/core';
import { Utils, DragEventContext } from 'wizyx';
import { CreateTesterComponentData } from '../source';

@Component(CreateTesterComponentData('draganddrop'))
export class DragAndDropTesterComponent { }

@Component({
	selector: 'draganddrop-test',
	template: `<table>
	<tr>
		<td>
			<div class="drop-zone" (wx-drop-success)="drop($event)" [wx-accept-drop]="canDropFirst" wx-drop-data="1">
				Can drop here!
				<div class="draggable" [wx-draggable]="true" [hidden]="selected != 1" wx-drag-data="1"></div>
			</div>
		</td>
		<td>
			<div class="drop-zone" (wx-drop-success)="drop($event)" [wx-accept-drop]="cantDropFirst" wx-drop-data="2">
				Cannot drop here!
				<div class="draggable" [wx-draggable]="true" [hidden]="selected != 2" wx-drag-data="1"></div>
			</div>
		</td>
		<td>
			<div class="drop-zone" (wx-drop-success)="drop($event)" [wx-accept-drop]="canDropFirst" wx-drop-data="3">
				Can drop here!
				<div class="draggable" [wx-draggable]="true" [hidden]="selected != 3" wx-drag-data="1"></div>
			</div>
		<td>
	</tr>
</table>
<div class="outer-drop-zone" (wx-drop-success)="setInner($event)" [wx-accept-drop]="canDropSecond" [wx-drop-data]="false">
	Outer
	<div class="outer-drag-warpper">
		<div class="draggable" [wx-draggable]="true" [hidden]="inner" wx-drag-data="2"></div>
	</div>
	<div class="drop-zone" (wx-drop-success)="setInner($event)" [wx-accept-drop]="canDropSecond" [wx-drop-data]="true">
		Inner
		<div class="draggable" [wx-draggable]="true" [hidden]="!inner" wx-drag-data="2"></div>
	</div>
</div>`,
})
export class DragAndDropTestComponent {
	protected text: string;
	protected selected: number = 1;
	protected inner: boolean = false;

	protected drop(context: DragEventContext): void {
		this.selected = context.dropData;
	}
	
	protected setInner(context: DragEventContext): void {
		this.inner = context.dropData;
	}

	protected canDropFirst(context: DragEventContext): boolean {
		return context.dragData == 1;
	}
	protected cantDropFirst(context: DragEventContext): boolean {
		return false;
	}

	protected canDropSecond(context: DragEventContext): boolean {
		return context.dragData == 2;
	}
}