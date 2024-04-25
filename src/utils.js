// Regular Expressions for validation
const eventIdRegExp = /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZ]{5}$/
const apiKeyRegExp = /^(?:[\w-]*\.){2}[\w-]*$/


module.exports = {
    eventIdRegExp,
    apiKeyRegExp
}