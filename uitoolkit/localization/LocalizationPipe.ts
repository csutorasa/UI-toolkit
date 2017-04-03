import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from './LocalizationService';

/**
 * A pipe that translates text.
 */
@Pipe({ name: 'localize' })
export class LocalizationPipe implements PipeTransform {
    constructor(private localizationService: LocalizationService) {

    }

    /**
     * Localizes a string synchronously.
     * @param text text to localize
     * @param params localization parameters
     */
    public transform(text: string, params: Object = {}): string {
        return this.localizationService.translate(text, params);
    }
}
