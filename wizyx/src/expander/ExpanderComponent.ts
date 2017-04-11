import { Component, Input, Output, EventEmitter, ContentChild, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { InputTemplate } from '../template/InputTemplate';
import { ContentTemplate } from '../template/ContentTemplate';

@Component({
	selector: 'ui-expander',
	template: `<div>
    <ng-template [templatecreator]="inputTemplate.template"></ng-template>
    <div [ngClass]="{'open': isOpen, 'display': display}" class="ui-expander-content" #expandercontent>
        <ng-template [templatecreator]="contentTemplate.template"></ng-template>
    </div>
</div>`,
})
export class ExpanderComponent implements AfterViewInit {
    @Output('isopenChange') public readonly isOpenChange: EventEmitter<boolean> = new EventEmitter();
	@ContentChild(ContentTemplate) protected contentTemplate: ContentTemplate;
	@ContentChild(InputTemplate) protected inputTemplate: ContentTemplate;
	@ViewChild('expandercontent') protected expanderContent: ElementRef;

    protected display: boolean = false;
    protected isOpen: boolean = false;

    public ngAfterViewInit(): void {
        const expanderElement = <HTMLScriptElement>this.expanderContent.nativeElement;
        expanderElement.addEventListener('transitionend', () => {
            if(!this.isOpen) {
                this.display = false;
            }
        });
        expanderElement.addEventListener('transitioncancel', () => {
            if(!this.isOpen) {
                this.display = false;
            }
        });
    }
    
    @Input('isopen')
    public set open(isOpen: boolean) {
        setTimeout(() => {
            this.isOpen = isOpen;
        }, 0);
        if(isOpen) {
            this.display = true;
        } 
    }
}