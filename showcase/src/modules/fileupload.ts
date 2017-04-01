import { Component } from '@angular/core';

@Component({
	selector: 'fileupload-tester',
	template: `<sources>
    <fileupload-test #sources></fileupload-test>
</sources>`,
})
export class FileUploadTesterComponent {}

@Component({
	selector: 'fileupload-test',
	template: `<uifileuploader></uifileuploader>`,
})
export class FileUploadTestComponent {
    
}