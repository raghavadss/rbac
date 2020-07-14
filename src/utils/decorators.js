const incrementId = (object) => {
    if (!object.latestId) object.latestId = 1
    else object.latestId++
    return object.latestId;
}

module.exports = {
    incrementId
}