var TechnoBabble = function(opts){

    var dictionary = require('./dictionary.json');

    /**
     * Generate a specified number of sentences.
     * @public
     */
    function generateSentence() {
        var sentenceResult = '',
            sentencePattern = getRandom(dictionary.template);

        // Loop through template and grab respective random word
        for (var i = 0, max = sentencePattern.length; i < max; i ++) {
            sentenceResult += getRandom(dictionary[sentencePattern[i]]);
            if (i === max - 1) {
                sentenceResult += '.';
            }
        }

        return lintSentence(sentenceResult);
    }

    /**
     * Generate a specified number of paragraphs.
     * @public
     */
    function generateParagraph() {
        var numParagraphs = opts.length || 1;
        var paragraph;

        for (var i = 0; i < numParagraphs; i++) {
            paragraph += ' ' + generateSentence();
        }

        return paragraph.trim();
    }

    /**
     * Randomly grab a word from a collection.
     * @param {array} arr - Collection of words to randomly extract from
     * @private
     */
    function getRandom(arr) {
        return arr[~~(Math.random()*arr.length)];
    }

    /**
     * Take generated sentence and lint/fix grammatical issues
     * @param {string} sentence - Sentence to be linted and fixed
     * @returns {string}
     * @private
     */
    function lintSentence(sentence) {
        return sentence.toLowerCase()
            .replace(/a(?= [aeiouAEIOU])/g, 'an') //change appropriate a's to an's
            .replace(/^./, function(char) { return char.toUpperCase() }); //capitalize the first letter of every sentence
    }

    /**
     * Return public methods to technobabble
     */
    return generateParagraph;

};

module.exports = TechnoBabble;
