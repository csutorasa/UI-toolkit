import { Directive } from '@angular/core';
import { TemplateHolder } from './TemplateHolder';

@Directive({
    selector: 'ui-content'
})
export class ContentTemplate extends TemplateHolder {
}