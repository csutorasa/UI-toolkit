import { Component } from '@angular/core';
import { CreateTesterComponentData } from '../source';

@Component(CreateTesterComponentData('fileupload'))
export class FileUploadTesterComponent { }

@Component({
	selector: 'fileupload-test',
	template: `<wx-fileuploader [multiple]="false" (uploaded)="log($event)">
	<wx-listelement>
		<div *template="let file=file;let progress=progress;let index= index;">
			{{ file.name }}
			{{ progress === 0 ? '' : (progress === 1 ? 'Waiting' : (progress === 2 ? 'Reading' : (progress === 3 ? 'Uploading' : 'Done')))}}
			<button (click)="remove(index)" buttonstyle="danger" *ngIf="!uploading">X</button>
		</div>
	</wx-listelement>
</wx-fileuploader>
<wx-fileuploader (uploaded)="log($event)">
	<wx-listelement>
		<div *template="let file=file;let progress=progress;let remove=remove;" class="file-list-element-container">
			<div class="file-list-element">{{ file.name }}</div>
			<div class="file-list-element">{{ progress === 0 ? '' : (progress === 1 ? 'Waiting' : (progress === 2 ? 'Reading' : (progress === 3 ? 'Uploading' : 'Done')))}}</div>
			<div class="file-list-element"><button (click)="remove()" buttonstyle="danger">X</button></div>
		</div>
	</wx-listelement>
	<wx-listelementseparator>
		<div *template class="list-element-separator"></div>
	</wx-listelementseparator>
</wx-fileuploader>`,
})
export class FileUploadTestComponent {
	protected log(files: File[]): void {
		console.log(files.length + ' files have been uploaded!');
	}
}