class handleError extends Error {
    statusCode: number;
    success: boolean;

    constructor(message: string) {
        super(message);
        this.statusCode = 400;
        this.success = false;
        Object.setPrototypeOf(this, handleError.prototype);
    }
}
