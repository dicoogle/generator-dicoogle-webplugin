// TypeScript declarations for the Dicoogle webcore
import type {SearchPatientResult} from 'dicoogle-client';

export type WebPluginType = 'menu' | 'result-options' | 'result-batch' | 'settings' | string;

export type WebcoreEvent = 'load' | 'result' | 'result-selection-ready' | string;

export interface WebPlugin {
    name: string,
    slotId: WebPluginType,
    caption?: string,
}

export interface IssueQueryOptions {
    override?: string,
    [key: string]: any,
}

export interface Webcore {
    issueQuery(query: string, options: IssueQueryOptions, callback: (error: any, result: any) => void): void;
    issueQuery(query: string, callback: (error: any, result: any) => void): void;

    addEventListener(eventName: WebcoreEvent, fn: (...args: any[]) => void): void;
    addResultListener(fn: (result: any, requestTime: number, options: any) => void): void;
    addPluginLoadListener(fn: (plugin: WebPlugin) => void): void;

    emit(eventName: WebcoreEvent, ...args: any[]): void;
    
    emitSlotSignal(slotDOM: HTMLElement, eventName: WebcoreEvent, data: any): void;
}

export interface PluginData {
    query?: string;
    queryProvider?: string[];
    results?: SearchPatientResult[];
    [att: string]: any;
}

export interface ResultSelectionReadyEvent {
    detail: ResultSelectionData;
}

export type ResultSelectionData = {search: {data: SearchDetails}, selected: ResultSelection};

export interface SearchDetails {
    results: SearchPatientResult[],
    elapsedTime: number,
    numResults: number,
}

export interface ResultSelection {
    contents: object[],
    level: string,
}

export interface SlotHTMLElement extends HTMLElement {
    slotId: string;
    pluginName: string;
    data?: PluginData;

    addEventListener(eventName: 'result-selection-ready', listener: (ev: ResultSelectionReadyEvent) => void): void;
    addEventListener(eventName: string, listener: (ev: Event) => void): void;
}
