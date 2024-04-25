
// Custom error objects 
class NetworkError extends Error {
    get name () {
      return this.constructor.name
    }
}

class HttpError extends Error {
    constructor (response) {
        super(`${response.status} ${response.statusText}`)
    }

    get name () {
    return this.constructor.name
    }
}
 
class ApiError extends Error {
    get name () {
        return this.constructor.name
    }
}

class ApiClient {
    
    constructor (config) {
      this.apiUrl = config.devApiUrl || config.apiUrl
      this.apiKey = config.apiKey
      this.eventId = config.eventId
      return this
    }
    async send ({ method, path, body}) {
        try {
    
            const fullUri = this.apiUrl + path
            
            const response = await fetch(fullUri, {
                method: 'POST',
                signal: AbortSignal.timeout(4900),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                },
                body: JSON.stringify(body)
            })
        

            // // Handle errors, both JSON and non-JSON response body
            if (!response.ok) {
                const maybeJSON = await response.json().catch(() => {
                    throw new HttpError(response)
                })
        
                throw new ApiError(maybeJSON.message)
            }
    
            return await response.json()
    
        } catch (error) {
            if (!(error instanceof Error)) { 
                throw new Error 
            }
            switch (error.name) {
                // Handle the timeout with a friendly message
                case 'TimeoutError':
                    throw new NetworkError('Request took longer than 5s and timed out')

                // fetch() throws TypeError on network problems
                case 'TypeError':
                    throw new NetworkError('There is a problem with the connection')

                // Pass errors through
                default:
                    throw error
            }
        }
    }
}

module.exports = {
    ApiClient
}