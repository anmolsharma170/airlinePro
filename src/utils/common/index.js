module.exports = {
    ErrorResponse: require('./error-response'),
    SuccessResponse: require('./success-response')
}

// we made a common folder inside utils and we have created two files error-response and success-response and we are exporting those two files in index.js file of common folder so that we can use those two files in other places by importing from common folder.