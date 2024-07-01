const checkingFirstLetterCapitalized = (words) => {
    const regex = /^[A-Z]/;
    return regex.test(words)
}

module.exports = checkingFirstLetterCapitalized