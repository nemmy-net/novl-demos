// This file provides documentation and auto-complete in IDEs like VSCode.
// Editing this file has no effect.

export type Color = string | number[]

export interface Frame {
    /** Seconds since game began */
    time: number
    /** Seconds since last frame */
    deltaTime: number
}

export interface Letter {
    x: number
    y: number
    color: Color
}

export interface SpriteProperties {
    image?: SpriteSource,
    color?: Color
    x?: number
    y?: number
    w?: number
    h?: number
    /** 0 and 1 align this to the left and right of the screen, respectively */
    xalign?: number
    /** 0 and 1 align this to the top and bottom of the screen, respectively */
    yalign?: number
    xscale?: number
    yscale?: number
}

export interface Sprite implements SpriteProperties {
    show(): void
    hide(): void
}

/** This the actual image used in a sprite. This can be an image path or another sprite. */
export type SpriteSource = string | SpriteProperties;

export type TextRender = (frame: Frame, letter: Letter) => void

export interface TextEffects {
    speedMultiply?: number
    color?: Color
    render?: TextRender
}

export interface ChoiceMap {
    [answer: string]: any
}

export interface Character implements Sprite {
    name?: string
    image?: SpriteSource
    /** Show character in scene */
    show(): void
    /** Hide character */
    hide(): void
    /** Behaves like `game.dialog.say` and shows the character's name */
    say(text: string, options?: TextEffects): void
}

export interface Game {
    dialog: {
        /** Write new text and replace any old text */
        say(text: string, options?: TextEffects): void
        /** Write more text next to the old text */
        more(text: string, options?: TextEffects): void
        /** Add text. It is written immediately and silently. */
        add(text: string, options?: TextEffects): void
        /** Remove the last N characters */
        removeLast(n: number): void
        /** Erase all text */
        clear(): void
        /** Writing sound */
        sound(path: string): void
        /** Multiply the dialog speed */
        speedMultiply(factor: number): void
        /** Display choices on screen and wait for an answer */
        choice(choices: ChoiceMap): any
    },
    /** Background image */
    background(path: string): void
    /** Background music */
    bgm(path: string): void
    /** Temporary hack to make colors, because arrays aren't supported yet :) */
    rgba(r: number, g: number, b: number, a?: number): Color
    /** Wait for a number of seconds. If no seconds are given then wait for any user input. */
    wait(seconds?: number): void
    character(name: string, options?: SpriteProperties): Character
}

export declare const game: Game
export declare const say = game.dialog.say
export declare const more = game.dialog.more
export declare const add = game.dialog.add