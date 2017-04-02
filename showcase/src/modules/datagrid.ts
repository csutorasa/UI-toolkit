import { Component } from '@angular/core';
import { Utils } from 'uitoolkit/utils/Utils';
import { CreateTesterComponentData } from '../source';

@Component(CreateTesterComponentData('datagrid'))
export class DataGridTesterComponent { }

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
    dataSource = [
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

    sortByKey(a, b) {
        return Utils.DefaultSort(a, b, x => x.key);
    }

    sortByValue(a, b) {
        return Utils.DefaultSort(a, b, x => x.value);
    }
}
