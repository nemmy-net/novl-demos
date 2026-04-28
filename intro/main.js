import { game, say, more, add, wait, pause } from "./api.d.ts";

game.pixelate = true
// Fill the screen with the textbox, then push it to the right to make space for a sprite
game.dialog.textBox.y = 0
game.dialog.textBox.h = game.screenSize.h
game.dialog.textBox.x += 200
game.dialog.textBox.w -= 200
game.dialog.nameBox.visible = false
// Pre-load some textures so they don't flicker
game.texture("img/neutral.png")
game.texture("img/neutral_talk.png")
game.texture("img/smile.png")
game.texture("img/smile_talk.png")
game.texture("img/happy.png")
game.texture("img/happy_talk.png")

function wave(frame) {
    frame.color = game.rgba(
        Math.sin(frame.time * 3 + frame.x/50 + frame.cy) / 2 + 0.5,
        Math.sin(frame.time * 3 + frame.x/50 + frame.cy + Math.PI * 2/3) / 2 + 0.5,
        Math.sin(frame.time * 3 + frame.x/50 + frame.cy + Math.PI * 4/3) / 2 + 0.5,
    )
    frame.y += Math.cos(frame.time * 5 + frame.x/20 + frame.cy) * 6
}

const me = game.character("", {image: "img/smile.png", voice: "sound/huh.wav"})
function emote(name) {
    me.blab() // This is a workaround to clear the active blab, otherwise the next call to blab() will trample our changes.
    me.image = "img/" + name + ".png"
    me.blab("img/" + name + "_talk.png", me.image)
}

me.show()
emote("happy")
let attempts = 0

function start() {
    emote("smile")
    me.say("This is what a novl game\nlooks like.")
    pause()
    // Heheh, this is broken. I had to add another style at the end. Awkwardddd....!
    more(" It has <>cool</> <>text\neffects</><> (and such...)</>", {render: wave}, {color: "#ff0"}, {})
    pause()
    return showChoices
}

function showChoices() {
    game.dialog.clear()
    if (attempts == 3) {
        emote("happy")
        me.say("Now go and make some games!")
        console.log("scope 1")
    } else {
        console.log("scope 2")
        return game.dialog.choice(options)
    }
    // If there's no code here then execution somehow restarts from the beginnig of the game
    //console.log("scope 3")
}

function tryIt() {
    attempts += 1
    options["Can I try?"] = undefined

    emote("happy")
    me.say("Yeah bro!\n")
    wait(0.3)
    more("Check out the content below!\n")
    wait(0.3)
    more("I made tutorials!")
    pause()
    return showChoices
}

function how() {
    attempts += 1
    options["How did you do that with the text?"] = undefined
    
    emote("smile")
    me.say("I used the sine and cosine\nfunctions to make <>waves</>.", {render: wave})
    pause()
    emote("neutral")
    more("\n\nYeah, it's a little\ncomplicated.")
    pause()
    emote("happy")
    more("\n\nThe code is available for you\nto look at tho!")
    pause()
    return showChoices
}

function hard() {
    attempts += 1
    options["Is it hard?"] = undefined

    emote("happy")
    me.say("A simple game only takes a\nfew clicks to make.")
    pause()
    emote("neutral")
    more("\n\nIt does get complicated")
    wait(0.3)
    more(" if\nyou want to stylize things\nwithout code.")
    pause()
    more("\n\nI'm working on it.")
    pause()
    return showChoices
}

options = {
    "Can I try?": tryIt,
    "How did you do that with the text?": how,
    "Is it hard?": hard,
}

nextBlock = start
console.log("fallthrough")
while (nextBlock = nextBlock()) {}