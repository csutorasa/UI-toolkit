import { Component } from '@angular/core';

@Component({
	selector: 'button-test',
	template: `
    <button>Basic</button>
    <button buttonstyle="default">Default</button>
    <button buttonstyle="primary">Primary</button>
    <button buttonstyle="success">Success</button>
    <button buttonstyle="info">Info</button>
    <button buttonstyle="warning">Warning</button>
    <button buttonstyle="danger">Danger</button>
    <button buttonstyle="link">Link</button>`,
})
export class ButtonTestComponent {
    
}