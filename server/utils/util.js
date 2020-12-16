'use strict'

const IsJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        console.warn(err)
        return false;
    }
    return true;
}

module.exports = {
    IsJsonString: IsJsonString
}