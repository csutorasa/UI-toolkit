import { Component } from '@angular/core';
import { Utils } from 'uitoolkit/utils/Utils';
import { CreateTesterComponentData } from '../source';

@Component(CreateTesterComponentData('datagrid'))
export class DataGridTesterComponent { }

export interface DataType {
    key: string;
    value: string;
}

@Component({
	selector: 'datagrid-test',
	template: `<uidatagrid [data]="dataSource">
    <column header="Keys" [sort]="sortByKey">
        <div template="let data=data">
            {{data.key}}
        </div>
    </column>
    <column header="Values" [sort]="sortByValue">
        <div template="let data=data">
            {{data.value}}
        </div>
    </column>
</uidatagrid>`,
})
export class DataGridTestComponent {
    protected dataSource: DataType[] = [
        {
            key: 'bb',
            value: 'cda'
        },
        {
            key: 'aa',
            value: 'ab'
        },
        {
            key: 'cc',
            value: 'bbb'
        }
    ];

    public sortByKey(a: DataType, b: DataType) {
        return Utils.defaultSort(a.key, b.key);
    }

    public sortByValue(a: DataType, b: DataType) {
        return Utils.defaultSort(a.value, b.value);
    }
}
