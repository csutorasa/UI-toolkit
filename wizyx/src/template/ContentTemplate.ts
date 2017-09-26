import { Directive } from '@angular/core';
import { TemplateHolder } from './TemplateHolder';

@Directive({
    selector: 'wx-content'
})
export class ContentTemplate extends TemplateHolder {
}