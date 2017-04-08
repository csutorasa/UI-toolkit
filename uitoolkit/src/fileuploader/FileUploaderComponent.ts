import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { List } from '../list/List';
import { ListItem } from '../list/ListItem';
import { Utils } from '../utils/Utils';

export enum UploadProgress {
	None = 0,
	Waiting = 1,
	Reading = 2,
	Uploading = 3,
	Done = 4
}

export class FileUploaderListItem extends ListItem {
	public remove: () => void;

	constructor(public file: File, public progress: UploadProgress, remove: (index: number) => void, index: number, count: number) {
		super(index, count);
		this.remove = () => remove(this.index);
	}
}

@Component({
	selector: 'ui-fileuploader',
	template: `<div>
	<div class="ui-fileuploader-spacing">
		<input type="file" (change)="onFileSelected($event)" *ngIf="!multiple"/>
		<input type="file" (change)="onFileSelected($event)" multiple *ngIf="multiple"/>
	</div>
	<div class="ui-fileuploader-drop-zone" (ui-drop)="onDrop($event)">
		<div *ngFor="let f of files;let last=last;">
			<ng-template [templatecreator]="listElement.template" [data]="f"></ng-template>
			<ng-template [templatecreator]="listElementSeparator.template" *ngIf="!last && listElementSeparator"></ng-template>
		</div>
	</div>
	<div class="ui-fileuploader-spacing">
		<ui-progressbar [min]="0" [max]="files.length" [value]="doneCount"></ui-progressbar>
	</div>
	<button (click)="upload()" buttonstyle="success">Upload</button>
</div>`,
})
export class FileUploaderComponent extends List {
	public static readonly SIZE_LIMIT = 100000000;

	/**
	 * Event that fired when the upload has finished
	 */
	@Output('uploaded') public readonly uploaded: EventEmitter<File[]> = new EventEmitter();
	@Input('multiple') protected multiple = true;

	protected files: FileUploaderListItem[] = [];
	protected doneCount: number;
	protected uploading: boolean = false;

	constructor(private http: Http) {
		super();
	}

	/**
	 * Adds new files to upload.
	 * @param fileList New files to add
	 */
	public addFiles(fileList: FileList): void {
		if (this.uploading) {
			return;
		}
		this.files = this.files.concat(Utils.collectionToArray(fileList).filter(f => f.size <= FileUploaderComponent.SIZE_LIMIT).map(f => new FileUploaderListItem(f, UploadProgress.None, (index: number) => this.remove(index), 0, 0)));
		if (!this.multiple) {
			this.files.splice(0, this.files.length - 1);
		}
		this.refreshIndices();
	}

	/**
	 * Removes a file from upload files.
	 * @param index Index of the file
	 */
	public remove(index: number): void {
		if (this.uploading) {
			return;
		}
		this.files.splice(index, 1);
		this.refreshIndices();
	}

	/**
	 * Uploads the added files
	 */
	public upload(): Promise<void> {
		let promise: Promise<any> = Promise.resolve();
		if (this.files.length === 0) {
			return promise;
		}
		this.doneCount = 0;
		this.uploading = true;
		this.files.forEach(file => {
			file.progress = UploadProgress.Waiting;
			promise = Utils.waterFall(promise, () => {
				file.progress = UploadProgress.Reading;
			}, () => this.readFile(file.file), content => {
				file.progress = UploadProgress.Uploading;
				return content;
			}, content => this.http.post('/upload', { filename: file.file.name, size: file.file.size, content: content }).forEach(() => {
				file.progress = UploadProgress.Done;
				this.doneCount++;
			}));
		});
		promise = promise.then(() => {
			this.uploading = false;
			this.uploaded.emit(this.files.map(f => f.file));
		}, err => {
			this.uploading = false;
		});
		return promise;
	}

	protected onFileSelected(event: Event): void {
		this.addFiles(<FileList>(<any>event.srcElement).files);
	}

	protected onDrop(transfer: DataTransfer): void {
		this.addFiles(transfer.files);
	}

	protected refreshIndices(): void {
		this.files.forEach((f, index) => {
			f.count = this.files.length;
			f.index = index;
		});
	}

	protected readFile(file: File): Promise<any> {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = (event: ProgressEvent) => {
				resolve(reader.result);
			};
			reader.readAsBinaryString(file);
		});
	}
}