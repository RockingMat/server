export const getPattern = (guess: string, word: string): number => {
    let ret = 0;
    let occ1 = new Array(26).fill(0);
    let occ2 = new Array(26).fill(0);
    for(let i = 0; i < 5; i++){
        if(word.charAt(i) !== guess.charAt(i)){
            occ1[word.charCodeAt(i)-'A'.charCodeAt(0)]++;
            occ2[guess.charCodeAt(i)-'A'.charCodeAt(0)]++;
        }
    }
    for(let i = 0; i < 5; i++){
        if(word.charAt(i) === guess.charAt(i)){
            ret += Math.pow(3, i) * 2;
        }else if(occ1[guess.charCodeAt(i)-'A'.charCodeAt(0)] > 0n){
            occ1[guess.charCodeAt(i)-'A'.charCodeAt(0)]--;
            ret += Math.pow(3, i) * 1;
        }else{
            ret += Math.pow(3, i) * 0;
        }
    }
    return ret;
}

export const BestGuess = (word: string, guesses: string[], validAnswers: string[], validGuesses: string[]): string => {
    const remainingWords = getRemainingWords(word, guesses, validAnswers);
    let bestWord = '';
    let minEntropy = 1000000;
    for(let i = 0; i < validGuesses.length; i++){
        const ent = entropy(remainingWords, validGuesses[i]);
        if(ent < minEntropy){
            minEntropy = ent;
            bestWord = validGuesses[i];
        }
    }
    for(let i = 0; i < remainingWords.length; i++){
        const ent = entropy(remainingWords, remainingWords[i]);
        if(ent <= minEntropy){
            minEntropy = ent;
            bestWord = remainingWords[i];
        }
    }
    return bestWord;
}

export const entropy = (remainingWords: string[], word: string): number => {
    let ret = 0;
    const patterns = new Array(243).fill(0);
    for (let i = 0; i < remainingWords.length; i++) {
        patterns[getPattern(remainingWords[i], word)]++;
    }
    for(let i = 0; i < 243; i++){
        if(patterns[i] !== 0){
            ret += Math.log2(patterns[i]) * patterns[i];
        } 
    }
    return ret;
}

export const getRemainingWords = (correctWord: string, guesses: string[], validGuesses: string[]): string[] => {
    let remainingWords = [];
    for(let i = 0; i < validGuesses.length; i++){
        if(check(validGuesses[i], guesses, correctWord)){
            remainingWords.push(validGuesses[i]);
        }
        
    }
    return remainingWords;
}

export const check = (potential: string, guesses: string[], target: string): boolean => {
    for(let i = 0; i < guesses.length; i++){

        if(getPattern(guesses[i], potential) !== getPattern(guesses[i], target)){
            return false;
        }
    }
    return true;
}