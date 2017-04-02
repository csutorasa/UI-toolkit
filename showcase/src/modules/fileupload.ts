import { Component } from '@angular/core';

@Component({
	selector: 'fileupload-tester',
	template: `<sources>
    <fileupload-test #sources></fileupload-test>
</sources>`,
})
export class FileUploadTesterComponent { }

@Component({
	selector: 'fileupload-test',
	template: `<uifileuploader [multiple]="false" (uploaded)="log($event)">
	<uilistelement>
		<div template="let file=file;let progress=progress;let index= index;">
			{{ file.name }}
			{{ progress === 0 ? '' : (progress === 1 ? 'Waiting' : (progress === 2 ? 'Reading' : (progress === 3 ? 'Uploading' : 'Done')))}}
			<button (click)="remove(index)" buttonstyle="danger" *ngIf="!uploading">X</button>
		</div>
	</uilistelement>
</uifileuploader>
<uifileuploader (uploaded)="log($event)">
	<uilistelement>
		<div template="let file=file;let progress=progress;let remove=remove;" class="file-list-element-container">
			<div class="file-list-element">{{ file.name }}</div>
			<div class="file-list-element">{{ progress === 0 ? '' : (progress === 1 ? 'Waiting' : (progress === 2 ? 'Reading' : (progress === 3 ? 'Uploading' : 'Done')))}}</div>
			<div class="file-list-element"><button (click)="remove()" buttonstyle="danger">X</button></div>
		</div>
	</uilistelement>
	<uilistelementseparator>
		<div template class="list-element-separator"></div>
	</uilistelementseparator>
</uifileuploader>`,
})
export class FileUploadTestComponent {
	protected log(files: File[]): void {
		console.log(files.length + ' files have been uploaded!');
	}
}