import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { readFileSync } from 'fs';
import { BestGuess, getRemainingWords } from "./helper";


// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check
let word: string = '';
let validAnswers: string[] = [];
let validGuesses: string[] = [];  
//old routes

/**
 * Returns a list of words which are valid guesses
 */
export const guesses = (_: SafeRequest, res: SafeResponse): void => {
    const file = readFileSync('./public/ValidGuesses.txt', 'utf-8');
    validGuesses = file.split('\n');
    for (let i = 0; i < validGuesses.length; i++) {
        validGuesses[i] = validGuesses[i].toUpperCase();
    }
    res.send({words: validGuesses});
}

/**
 * Returns a list of valid first words 
 */
export const answers = (_: SafeRequest, res: SafeResponse): void => {
    const file = readFileSync('./public/ValidAnswers.txt', 'utf-8');
    validAnswers = file.split(' ');
    const index = Math.floor(Math.random() * validAnswers.length);
    word = validAnswers[index];
    res.send({firstWord: word});
}

/**
 * Returns the remaining words that are valid guesses
 */
export const remaining = (req: SafeRequest, res: SafeResponse): void => {
    const guesses = req.body.guesses as string[];
    const remainingWords = getRemainingWords(word, guesses, validAnswers);
    const bestGuess = BestGuess(word, guesses, validAnswers, validGuesses);
    res.send({remainingWords: remainingWords, bestGuess: bestGuess});
}

// /**
//  * reset word list
//  */
// export const resetForTesting = (): void => {
//     words = [];
// }


// let validAnswers: string[] = [];
// let validGuesses: string[] = [];
// let validGuessesSet: Set<string> = new Set();

// /**
//  * get a random word from the list
//  */
// export const word = (_: SafeRequest, res: SafeResponse): void => {
//     if (validAnswers.length === 0) {
//         init();
//     }
//     const index = Math.floor(Math.random() * validAnswers.length);
//     res.send({word: validAnswers[index]});
// }

// /**
//  * check a guess
//  */
// export const check = (req: SafeRequest, res: SafeResponse): void => {
//     if (validGuessesSet.size === 0) {
//         init();
//     }
//     const word = req.query.word as string;
//     res.send({result: validGuessesSet.has(word)});
// }

// /**
//  * initialize word list
//  */
// const init = (): void => {
//     const file = readFileSync('./public/ValidAnswers.txt', 'utf-8');
//     validAnswers = file.split(' ');
//     const file2 = readFileSync('./public/ValidGuesses.txt', 'utf-8');
//     validGuesses = file2.split('\n');
//     for (let i = 0; i < validGuesses.length; i++) {
//         validGuessesSet.add(validGuesses[i].toUpperCase());
//     }
// }













