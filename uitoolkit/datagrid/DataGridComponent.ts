import { ContentChild, ContentChildren, Component, Directive, Input, QueryList, TemplateRef } from '@angular/core';
import { ListItem } from '../list/ListItem';
import { ColumnDirective } from './ColumnDirective';

export interface Sort {
    compare: (a, b) => number;
    ascending: boolean;
};

export class DataGridListItem extends ListItem {
    constructor(public data: any, index: number, count: number) {
        super(index, count);
    }
}

@Component({
    selector: 'uidatagrid',
    template: `<table>
    <thead>
        <tr>
            <th *ngFor="let column of columns" (click)="setSort(column)">
                {{column.header}}{{ sortData && sortData.compare === column.sort ? (sortData.ascending ? '(asc)' : '(desc)' ) : ''}}
            </th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let row of rows">
            <td *ngFor="let column of columns">
                <template [templatecreator]="column.template" [data]="row"></template>
            </td>
        </tr>
    </tbody>
</table>`
})
export class DataGridComponent {
    /**
     * Columns definitions
     */
    @ContentChildren(ColumnDirective) public columns: QueryList<ColumnDirective>;
    protected rows: DataGridListItem[];
    protected sortData: Sort;

    /**
     * Sets the data source
     */
    @Input('data')
    public set setData(data: any[]) {
        if (data) {
            this.rows = data.map((d, index) => new DataGridListItem(d, index, data.length));
            this.sort();
        } else {
            this.rows = [];
        }
    }

    protected setSort(column: ColumnDirective): void {
        if (!column.sort) {
            return;
        }
        if (!this.sortData || this.sortData.compare !== column.sort) {
            this.sortData = {
                compare: column.sort,
                ascending: true
            };
        } else {
            this.sortData.ascending = !this.sortData.ascending;
        }
        this.sort();
    }

    protected sort(): void {
        if (this.sortData) {
            if(this.sortData.ascending) {
                this.rows.sort((a, b) => this.sortData.compare(a.data, b.data));
            } else {
                this.rows.sort((a, b) => -1 * this.sortData.compare(a.data, b.data));
            }
            this.rows.forEach((r, index) => {
                r.index = index;
            });
        }
    }
}