// This file provides documentation and auto-complete for IDEs like VSCode.
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

/**
 * One or more images wrapped into an object with parameters for color, position, and more.
 * 
 * It's important to provide the width (`w`) and height (`h`) when multiple images or nested images are used.
 * The width and height are necessary for positioning and hitboxes, among other things.
 */
export interface SpriteProperties {
    /** One image. If this is a file path then the width and height are the file's width and height by default. */
    image?: SpriteSource,
    /**
     * Many images drawn on top of each other from first to last.
     * Each value can have any name and its image can be swapped out. You might use this to change faces or clothes on a character.
     */
    images?: {
        [key: string]: SpriteSource
    }

    /** An animation where each sprite is one frame */
    frames?: SpriteSource[],
    /** Animation frames per second. (12 by default) */
    fps?: number,

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
    /** Only draw part of the image inside the rectangle (x,y,w,h) */
    clip?: boolean
}

/** This the actual image used in a sprite. This can be an image path or another sprite. */
export type SpriteSource = string | SpriteProperties

export type Layer = "back" | "front"

/** A visible object that can be shown and hidden. It cannot appear multiple times at once unless you make copies of it. */
export interface Sprite extends SpriteProperties {
    show(layer?: Layer): void
    hide(): void
}

export type TextRender = (frame: Frame, letter: Letter) => void

export interface TextEffects {
    /** Text characters per second */
    cps?: number
    color?: Color
    render?: TextRender
}

export interface ChoiceMap {
    [answer: string]: any
}

export interface Character extends Sprite {
    name?: string
    /** Behaves like `game.dialog.say` and shows the character's name */
    say(text: string, options?: TextEffects): void
}

export type EventName = "say" | "frame"

export interface Game {
    dialog: {
        /** Write new text and replace any old text */
        say(text: string, ...fx: TextEffects[]): void
        /** Write more text next to the old text */
        more(text: string, ...fx: TextEffects[]): void
        /** Add text. It is written immediately and silently. */
        add(text: string, ...fx: TextEffects[]): void
        /** Remove the last N characters */
        removeLast(n: number): void
        /** Erase all text and remove the current speaker */
        clear(): void
        /** Writing sound */
        sound(path: string): void
        /** Multiply the dialog speed */
        speedMultiply(factor: number): void
        /** Display choices on screen and wait for an answer */
        choice(choices: ChoiceMap): any
        /** Pause the dialog and wait for user input */
        pause(): void

        textBox: {
            visible: boolean,
            x: number, y: number, w: number, h: number
        }
        nameBox: {
            visible: boolean,
            x: number, y: number, w: number, h: number
        }
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
    sprite(options?: SpriteProperties): Sprite
    event(name: EventName, callback: () => void): void
    /** The character currently speaking. This is null while the character isn't writing or playing a voice track. */
    getSpeaker(): Character|null
    screenSize: { w: number, h: number }
    /** @returns The number of seconds given */
    tween(target: any, newValues: object, seconds: number, easing?: string): number
    /** Clear the scene. This removes any dialog, sprites, background, and music. */
    clear(): void
    /** Load all textures with pixelation by default */
    pixelate: boolean
    /** Number of seconds since the game started */
    time: number
}

export declare const game: Game
export declare const wait: typeof game.wait
export declare const pause: typeof game.dialog.pause
export declare const say: typeof game.dialog.say
export declare const more: typeof game.dialog.more
export declare const add: typeof game.dialog.add
