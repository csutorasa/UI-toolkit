import { Directive } from '@angular/core';
import { TemplateHolder } from '../template/TemplateHolder';

@Directive({
    selector: 'ui-listelement'
})
export class ListElementDirective extends TemplateHolder {
}