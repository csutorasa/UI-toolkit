import { Component, ElementRef, ContentChild, AfterContentInit, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'sources',
    template: `<div class="source-container">
    <div class="source-result">
        <div class="source-header">
            {{'result' | localize }}
            <div class="source-show-hide">
                <button [hidden]="showSource" (click)="showSource = true;" class="generalbutton">Show source</button>
            </div>
        </div>
        <ng-content></ng-content>
    </div>
    <div [hidden]="!showSource" class="source-code">
        <div class="source-header">
            {{'source' | localize}}
            <div class="source-show-hide">
                <button (click)="showSource = false;" class="generalbutton">Hide source</button>
            </div>
        </div>
        <h3>HTML</h3>
        <p>{{sourceHTML}}</p>
        <h3>JavaScript</h3>
        <p>{{sourceJS}}</p>
    </div>
</div>`,
})
export class SourceComponent implements AfterContentInit {
    @ContentChild('sources') protected component: any;
    protected sourceHTML: string;
    protected sourceJS: string;
    protected showSource: boolean = false;

    constructor(protected viewContainer: ViewContainerRef) {
    }

    public ngAfterContentInit(): void {
        const type = this.component.constructor;
        const annotations: Component[] = Reflect.getMetadata('annotations', type);
        if (annotations != null) {
            this.sourceHTML = annotations.find(a => a.template != null).template.replace(/^\t/, '');
            this.sourceJS = this.getSource(type);
        }
        else {
            const elementRef = <ElementRef>this.component;
            this.sourceHTML = elementRef.nativeElement.outerHTML;
        }
    }

    protected getSource(type: any): string {
        let source: string = '';
        const indent: string = '    ';

        source += 'class ' + type.name + ' {\n';
        source += indent + 'constructor' + (<string>type.toString()).substring((<string>type.toString()).indexOf('(')) + '\n';
        for(let key in type.prototype) {
            source += indent + type.prototype[key].toString().replace('function ', key) + '\n';
        }
        source += '}';
        return source;
    }
}

export function CreateTesterComponentData(component: string): Component {
    return {
        selector: component + '-tester',
        template: '<sources><' + component  + '-test #sources></' + component + '-test></sources>'
    };
}
