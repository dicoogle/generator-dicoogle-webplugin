import * as React from 'react';
<% if (dicoogle.slotId === 'result') { %>import type {DicoogleAccess, SearchPatientResult} from 'dicoogle-client';<% } else { %>import type {DicoogleAccess} from 'dicoogle-client';<% } %>
import {Webcore, SlotHTMLElement, PluginData} from './webcore';

// global Dicoogle access instance
declare const Dicoogle: DicoogleAccess & Webcore;

interface Props {
    // TODO define props here
}

interface State {
    // TODO define state shere
}

class PluginComponent extends React.Component<Props, State> {

    constructor(props) {
        super(props);<% if (dicoogle.slotId === 'query') { %>
        this.handleQueryRequest = this.handleQueryRequest.bind(this);<% } %>
    }
    <% if (dicoogle.slotId === 'query') { %>

    handleQueryRequest(queryText, queryProviders) {
        // dispatch a query with `Dicoogle.issueQuery`:
        //   Dicoogle.issueQuery(queryText);
    }
<% } %>

    render() {
        return (<div>Hello, Dicoogle!</div>);
    }
}

export default class MyPlugin {
    
    constructor() {
        // TODO initialize plugin here
    }
    
    render(parent: HTMLElement, slot: SlotHTMLElement): typeof PluginComponent {
        return PluginComponent;
    }
<% if (dicoogle.slotId === 'result') { %>    onResult(results: SearchPatientResult[]) {
        // TODO show results here
    }<% } %>

    onReceiveData(data: PluginData) {
        // retrieve data here
    }
}
