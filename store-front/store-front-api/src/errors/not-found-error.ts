import { CustomError } from './custom-error'

export default class NotFoundError extends CustomError {
    statusCode = 404

    constructor(public message = 'Not found') {
        super(message)

        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors() {
        return [{ message: this.message }]
    }
}
