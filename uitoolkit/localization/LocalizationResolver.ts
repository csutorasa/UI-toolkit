import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { LocalizationService, Translation } from './LocalizationService';

@Injectable()
export class LocalizationResolver implements Resolve<any> {
    constructor(private localizationService: LocalizationService) {

    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Translation> {
        return Observable.fromPromise(this.localizationService.getLocalization());
    }
}
