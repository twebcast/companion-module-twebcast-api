const { eventIdRegExp, apiKeyRegExp } = require('./utils')




function configFields() {
    return [
        {
            type: 'static-text',
            width: 12,
            id: 'info',
            label: 'Information',
            value: `
            Remote control your <a href="https://twebcast.com" target="_blank">Twebcast</a> event using Companion.<br><br>
            Requires a Twebcast.com account. <br>
            Enter the API key and event id from your API Explorer found in advanced settings on the event dashboard. 
            `
        },
        {
            type: 'textinput',
            width: 4,
            id: 'eventId',
            label: 'Event ID',
            regex: eventIdRegExp.toString(),
            required: true,
            default: 'YOUR-EVENT-ID',
        },
        {
            type: 'textinput',
            width: 8,
            id: 'apiKey',
            label: 'API Key',
            regex: apiKeyRegExp.toString(),
            required: true,
            default: 'YOUR-API-KEY',
        },
        {
            id: 'apiUrl',
            type: 'dropdown',
            label: 'Select host',
            choices: [
                { id: 'https://live.twebcast.com', label: 'Live' },
                { id: 'https://stage.twebcast.com', label: 'Stage' },
                { id: 'https://localhost', label: 'Development' },
            ],
            default: 'https://live.twebcast.com',
            width: 12
        },
        {
            id: 'devApiUrl',
            type: 'textinput',
            label: 'Development host',
            isVisible: (options, data) => options.apiUrl == 'https://localhost',
            default: 'https://localhost',
            width: 12
        }
    ]
}

module.exports = {
    configFields,
} 