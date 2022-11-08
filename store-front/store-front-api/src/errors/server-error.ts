import { CustomError } from './custom-error'

export default class ServerError extends CustomError {
    statusCode = 500

    constructor() {
        super('Server error')

        Object.setPrototypeOf(this, ServerError.prototype)
    }

    serializeErrors() {
        return [{ message: 'Something went wrong' }]
    }
}
