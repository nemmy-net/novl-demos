// This file provides documentation and auto-complete in IDEs like VSCode.
// Editing this file has no effect.

declare interface Game {
    dialog: {
        /** Slowly write text to screen */
        write(text: string): void;
        /** Writing sound */
        sound(path: string): void;
    },
    /** Background image */
    background(path: string): void;
    /** Background music */
    bgm(path: string): void;
}

export declare const game: Game;