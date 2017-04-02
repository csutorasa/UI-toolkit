import { Directive, Input } from '@angular/core';
import { TemplateHolder } from '../template/TemplateHolder';

@Directive({
    selector: 'column'
})
export class ColumnDirective extends TemplateHolder {
    @Input('header') public header: string;
    @Input('sort') public sort: (a, b) => number;
}