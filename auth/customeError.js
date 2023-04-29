class customeError extends Error {
    constructor(msg,statusCode){
        super(msg);
        this.statusCode = statusCode;
    }
}

module.exports = customeError;