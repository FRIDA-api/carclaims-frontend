/* tslint:disable */
/* eslint-disable */
/**
 * FRIDA Car Claims Data Schema
 * Die FRIDA Schaden API - ermöglicht es Nutzer:innen im Schadenfall die wichtigsten Versicherungs- und Unfalldaten über eine Schadenplattform direkt an den Versicherer zu übertragen und den Schaden damit offiziel zu melden.
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: floneuss99@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface VehicleDriverDamagedWindowImagesInner
 */
export interface VehicleDriverDamagedWindowImagesInner {
    /**
     * Bild vom Glasschaden || native FileAPI des Clients (Dunkelverarbeitung)
     * @type {string}
     * @memberof VehicleDriverDamagedWindowImagesInner
     */
    file?: string;
    /**
     * Pfad zum Bild
     * @type {string}
     * @memberof VehicleDriverDamagedWindowImagesInner
     */
    path?: string;
}

/**
 * Check if a given object implements the VehicleDriverDamagedWindowImagesInner interface.
 */
export function instanceOfVehicleDriverDamagedWindowImagesInner(value: object): value is VehicleDriverDamagedWindowImagesInner {
    return true;
}

export function VehicleDriverDamagedWindowImagesInnerFromJSON(json: any): VehicleDriverDamagedWindowImagesInner {
    return VehicleDriverDamagedWindowImagesInnerFromJSONTyped(json, false);
}

export function VehicleDriverDamagedWindowImagesInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): VehicleDriverDamagedWindowImagesInner {
    if (json == null) {
        return json;
    }
    return {
        
        'file': json['file'] == null ? undefined : json['file'],
        'path': json['path'] == null ? undefined : json['path'],
    };
}

export function VehicleDriverDamagedWindowImagesInnerToJSON(value?: VehicleDriverDamagedWindowImagesInner | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'file': value['file'],
        'path': value['path'],
    };
}

