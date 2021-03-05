export default function handleError(error) {
    let statusCode;
    let errMessage;
    if (error.name === "ValidationError") {
        let errors = {};
        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
        statusCode = 400;
        errMessage = errors;
    }
    return {
        statusCode: statusCode || 500,
        errMessage: errMessage || `Something went wrong. Error: ${error}`
    }
}