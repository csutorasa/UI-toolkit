import { ContentChild, TemplateRef } from '@angular/core';

export abstract class TemplateHolder {
    @ContentChild(TemplateRef) public template: TemplateRef<any>;
}