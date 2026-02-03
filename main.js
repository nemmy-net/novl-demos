import { game, say, more, add } from "./api.d.ts";

//game.bgm("sound/dos1.mp3")
function wave(frame, letter) {
    letter.color = game.rgba(
        Math.sin(frame.time * 3 + letter.x/50 + letter.y) / 2 + 0.5,
        Math.sin(frame.time * 3 + letter.x/50 + letter.y + Math.PI * 2/3) / 2 + 0.5,
        Math.sin(frame.time * 3 + letter.x/50 + letter.y + Math.PI * 4/3) / 2 + 0.5,
    )
    letter.y += Math.cos(frame.time * 5 + letter.x/20 + letter.y) * 6
}

function shake(frame, letter) {
    letter.x += Math.random() * 4 - 2
    letter.y += Math.random() * 4 - 2
}

function bobLeft(frame, letter) {
    letter.x -= Math.cos(frame.time * 1.5) * 16 / 2
}

function rest() {
    add("  >", { render: bobLeft, color: "#0f08" })
    game.wait()
    game.dialog.removeLast(3)
}

// Start new dialog with *
function undertale() {
    game.dialog.clear()
    add("* ")
}

const textEffects = {render: wave}

game.background("img/bedroom.jpg")
game.dialog.sound("sound/squeek.wav")

let mouthClosed = "img/dude/mouth_closed.png"
const mouthYapping = {
    fps: 6,
    frames: [
        "img/dude/mouth_open.png",
        mouthClosed,
    ]
}
const composite = {
    w: 480, h: 480,
    yalign: 1,
    images: {
        base: "img/dude/base.png",
        eyes: "img/dude/eyes.png",
        mouth: mouthClosed,
    }
}

function setMouth(image) {
    mouthClosed = image
    mouthYapping.frames[1] = image
    composite.images.mouth = image
}

const me = game.character("Grass", { image: composite })
game.event("say", function() {
    if (game.getSpeaker() == me)
        composite.images.mouth = mouthYapping
    else
        composite.images.mouth = mouthClosed
})

rest()
me.show()

// TODO: Automatic delays for punctuation, newlines, and other user-defined patterns.
me.say("This game engine feels so nice to use\nalready.")
rest()
me.say("\nI'm a huge yapper. I like to talk.")
rest()
more("\nBut nobody wants to read a block of text.")
game.wait(0.4)
more("\nThat's boring!")
rest()
composite.images.eyes = "img/dude/eyes_up.png"
setMouth("img/dude/mouth_grin.png")
me.say("I'm starting to think ")
game.wait(0.2)
more("visual novels can be a\nbetter outlet for my rants.", {color: "#ff0"})
rest()
setMouth("img/dude/mouth_closed.png")
composite.images.eyes = "img/dude/eyes_evil.png"
me.say("I still have lots of work to do first.")
rest()
more("\n\n  Proper scaling for web browsers.", { color: "#f0f" })
game.wait(0.4)
more("\nThumbnail support for the site.", { color: "#ef0" })
game.wait(0.4)
more("\n  Load engines by version for compatibility.", { color: "#0f0" })
game.wait(0.4)
more("\nA tween system for animations.", { color: "#0ef" })
game.wait(0.4)
more("\nAnd it all has to be wrapped in a good API.", { color: "#f44" })
rest()

me.say("Please fill out my simple survey")
rest()

let answer = null
while (answer == null) {
    say("minion or da bob fo today")
    answer = game.dialog.choice({
        "Minion plz": "minion!!!",
        "Bob! bob!": "bob???",
        neither: null,
    })
    if (answer == null) {
        composite.images.eyes = "img/dude/eyes_evil.png"
        say("no!!!")
        rest()
        composite.images.eyes = "img/dude/eyes.png"
    }
}

say(answer)
rest()

me.hide()

undertale()
more("hallo!")
rest()

undertale()
more("what's\ngoin\n", {speedMultiply: 0.5})
game.wait(0.1)
more("oooonnnnn???!!!??????????????????\n", textEffects)
rest()

more("... ", { speedMultiply: 0.2 })
game.wait(0.5)
more("Let's change the effects\n", {color: "#ff0"})
game.wait(1)
// Cool trick: We can edit textEffects later whenever we wish
textEffects.color = "#0f0"
textEffects.render = shake
game.wait()