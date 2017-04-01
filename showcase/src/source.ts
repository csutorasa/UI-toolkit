import { Component, ElementRef, ContentChild, AfterContentInit, ViewContainerRef } from '@angular/core';

@Component({
	selector: 'sources',
	template: `
    <table class="source-table">
        <tr class="source-table-header">
            <th>
                {{'result' | localize }}
                <div style="float: right;">
                    <button [hidden]="showSource" (click)="showSource = true;" buttonstyle="info">Show source</button>
                </div>
            </th>
            <th [hidden]="!showSource">
                {{'source' | localize}}
                <div style="float: right;">
                    <button (click)="showSource = false;" buttonstyle="info">Hide source</button>
                </div>
            </th>
        </tr>
        <tr>
            <td class="source-table-result-cell">
                <ng-content></ng-content>
            </td>
            <td class="source-table-source-cell" [hidden]="!showSource">
                <a *ngFor="let line of lines">
                    {{line}}<br/>
                </a>
            </td>
        </tr>
    </table>`,
})
export class SourceComponent implements AfterContentInit {
    @ContentChild('sources') component: any;
    lines: string[];
    showSource: boolean = false;

    constructor(protected viewContainer: ViewContainerRef) {
    }

    ngAfterContentInit() {
        const type = this.component.constructor;
        const annotations: Component[] = Reflect.getMetadata('annotations', type);
        let source: string;
        if(annotations != null) {
            source = annotations.find(a => a.template != null).template;
        }
        else {
            const elementRef = <ElementRef>this.component;
            source = elementRef.nativeElement.outerHTML;
        }
        this.lines = source.replace('\t', '').split('\n').filter(line => line !== '');
    }

}