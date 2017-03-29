import { ContentChild, Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: 'uilistelement'
})
export class ListElement {
    @ContentChild(TemplateRef) public template: TemplateRef<any>;
}