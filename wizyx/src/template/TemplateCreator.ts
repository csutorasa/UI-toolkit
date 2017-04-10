import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[templatecreator]'
})
export class TemplateCreator {
    @Input('data') public data: any;

    constructor(protected viewContainer: ViewContainerRef) { }

    @Input('templatecreator')
    public set templateWrapper(templateRef: TemplateRef<any>) {
        this.viewContainer.createEmbeddedView(templateRef, this.data);
    }
}