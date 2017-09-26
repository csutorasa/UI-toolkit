import { Directive, Input } from '@angular/core';
import { TemplateHolder } from '../template/TemplateHolder';

@Directive({
    selector: 'wx-column'
})
export class ColumnDirective extends TemplateHolder {
    /**
     * Header text of the column
     */
    @Input('header') public header: string;
    /**
     * Sort function of the column
     */
    @Input('sort') public sort: (a, b) => number;
}