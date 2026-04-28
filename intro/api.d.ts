// This optional file provides documentation and auto-complete for IDEs like VSCode.
// Editing this file has no effect.

export type Color = string | number[]

export interface Frame {
    /** Seconds since game began */
    time: number
    /** Seconds since last frame */
    deltaTime: number
}

export interface LetterFrameData {
    x: number
    y: number
    color: Color
}

export interface SoundOptions {
    volume?: number
    loop?: boolean
}

export interface Sound {
    id: number
    /**
     * Get or set the volume
     * @returns The new volume
     */
    volume(x?: number): number
    pause(): void
    resume(): void
    /** Play from the start */
    replay(): void
}

/**
 * Unlike Sound, a Voice can be played multiple times without interrupting itself and it's necessary for typing sounds in games.
 * This behaves the same as using multiple copies of a Sound.
 */
export interface Voice {
    id: number
    /**
     * Get or set the volume
     * @returns The new volume
     */
    volume(x?: number): number
    play(): void
}

export interface Texture {
    path: string
    w: number
    h: number
}

export type TextureSource = Texture | string

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
    /** Time when the animation started playing. This is controlled by the game engine and it will be set/unset. */
    time?: number,

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

export interface CharacterOptions extends SpriteProperties {
    /** The writing sound. This will be converted to a Voice if it isn't already */
    voice?: string|Voice
}

/** This the actual image used in a sprite. This can be an image path or another sprite. */
export type SpriteSource = TextureSource | SpriteProperties

export type Layer = "back" | "front"

/** A visible object that can be shown and hidden. It cannot appear multiple times at once unless you make copies of it. */
export interface Sprite extends SpriteProperties {
    show(layer?: Layer): void
    hide(): void
}

export type TextRender = (frame: LetterFrameData) => void

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
    /** The writing sound */
    voice?: Voice|null
    /** Behaves like `game.dialog.say` and shows the character's name */
    say(text: string, ...fx: TextEffects[]): void
    /** Set the image or animation that displays while the character is talking.
     * You can provide FPS as the last argument:
     * ```
     *  blab("img1.png", "img2.png", 6)
     * ```
     * FPS is optional and the default is 6.
     */
    blab(...frames: (string | number)[]): void
    blab(frames: string[], fps?: number): void
    blab(image?: string): void
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
        /** Set the default writing sound. WARNING: This will be removed in a future version. Use `voice` instead. */
        sound(path?: string): void
        /** Set the default writing sound */
        voice(source?: string|Voice, volume?: number): void
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
        /** Default text color */
        color: Color,
    },
    /** Background image */
    background(path: TextureSource): void
    /** Set the background music. It behaves the same as a looping `Sound` object. */
    bgm(path?: string, volume?: number): void
    /** Temporary hack to make colors, because arrays aren't supported yet :) */
    rgba(r: number, g: number, b: number, a?: number): Color
    /** Wait for a number of seconds. If no seconds are given then wait for any user input. */
    wait(seconds?: number): void
    character(name: string, options?: CharacterOptions): Character
    sprite(options?: SpriteProperties): Sprite
    event(name: "say", callback: () => void): void
    event(name: "frame", callback: (frame: Frame) => void): void
    /** The character currently speaking. This is null while the character isn't writing or playing a voice track. */
    getSpeaker(): Character | null
    screenSize: { w: number, h: number }
    /** @returns The number of seconds given */
    tween(target: any, newValues: object, seconds: number, easing?: string): number
    /** Clear the scene. This removes any dialog, sprites, background, and music. */
    clear(): void
    sound(path: string, volume?: number): Sound
    sound(path: string, options: SoundOptions): Sound
    voice(path: string, volume?: number): Voice|null
    texture(path: string, pixelate?: boolean): Texture
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
