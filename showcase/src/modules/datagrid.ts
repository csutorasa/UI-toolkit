import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Utils } from 'wizyx';
import { CreateTesterComponentData } from '../source';

@Component(CreateTesterComponentData('datagrid'))
export class DataGridTesterComponent { }

export interface DataType {
    key: string;
    value: number;
}

@Component({
	selector: 'datagrid-test',
	template: `<wx-datagrid [data]="dataSource">
    <wx-column header="Keys" [sort]="sortByKey">
        <div *template="let data=data">
            {{data.key}}
        </div>
    </wx-column>
    <wx-column header="Values" [sort]="sortByValue">
        <div *template="let data=data">
            {{data.value}}
        </div>
    </wx-column>
</wx-datagrid>`,
})
export class DataGridTestComponent {
    protected dataSource: DataType[] = [];

    constructor(protected http: Http) {
        http.post('/search', {search: '', from: 0, to: 10000}).map(res => res.json()).toPromise().then((colors: string[]) => {
            this.dataSource = colors.map(color => {
                return {
                    key: color,
                    value: color.length
                };
            });
        });
        
    }

    public sortByKey(a: DataType, b: DataType) {
        return Utils.defaultSort(a.key, b.key);
    }

    public sortByValue(a: DataType, b: DataType) {
        return Utils.defaultSort(a.value, b.value);
    }
}
