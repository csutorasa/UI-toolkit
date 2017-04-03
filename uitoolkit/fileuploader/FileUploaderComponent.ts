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
	selector: 'uifileuploader',
	template: `<div>
	<div class="fileuploader-spacing">
		<input type="file" (change)="onFileSelected($event)" *ngIf="!multiple"/>
		<input type="file" (change)="onFileSelected($event)" multiple *ngIf="multiple"/>
	</div>
	<div class="fileuploader-drop-zone" (uidrop)="onDrop($event)">
		<div *ngFor="let f of files;let last=last;">
			<template [templatecreator]="listElement.template" [data]="f"></template>
			<template [templatecreator]="listElementSeparator.template" *ngIf="!last && listElementSeparator"></template>
		</div>
	</div>
	<div class="fileuploader-spacing">
		<uiprogressbar [min]="0" [max]="files.length" [value]="doneCount"></uiprogressbar>
	</div>
	<button (click)="upload()" buttonstyle="success">Upload</button>
</div>`,
})
export class FileUploaderComponent extends List {
	@Input('multiple') protected multiple = true;
	@Output('uploaded') protected uploaded: EventEmitter<File[]> = new EventEmitter();

	public static SIZE_LIMIT = 100000000;

	protected files: FileUploaderListItem[] = [];
	protected doneCount: number;
	protected uploading: boolean = false;

	constructor(private http: Http) {
		super();
	}

	protected onFileSelected(event: Event): void {
		this.addFiles(<FileList>(<any>event.srcElement).files);
	}

	protected onDrop(transfer: DataTransfer): void {
		this.addFiles(transfer.files);
	}

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

	public remove(index: number): void {
		console.log(this);
		if (this.uploading) {
			return;
		}
		this.files.splice(index, 1);
		this.refreshIndices();
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
			}, content => this.http.post('/upload', { filename: file.file.name, size: file.file.size, content: content }).toPromise(), () => {
				file.progress = UploadProgress.Done;
				this.doneCount++;
			});
		});
		promise = promise.then(() => {
			this.uploading = false;
			this.uploaded.emit(this.files.map(f => f.file));
		}, err => {
			this.uploading = false;
		});
		return promise;
	}
}