import { game, say, more, add, wait, pause } from "./api.d.ts";

game.pixelate = true
console.log("log")
console.warn("warning")
console.error("error")

function wave(frame) {
    frame.color = game.rgba(
        Math.sin(frame.time * 3 + frame.x/50 + frame.cy) / 2 + 0.5,
        Math.sin(frame.time * 3 + frame.x/50 + frame.cy + Math.PI * 2/3) / 2 + 0.5,
        Math.sin(frame.time * 3 + frame.x/50 + frame.cy + Math.PI * 4/3) / 2 + 0.5,
    )
    frame.y += Math.cos(frame.time * 5 + frame.x/20 + frame.cy) * 6
}

function shake(frame) {
    frame.x += Math.random() * 4 - 2
    frame.y += Math.random() * 4 - 2
}

// Start new dialog with *
function undertale() {
    game.dialog.clear()
    add("* ")
}

const textEffects = {render: wave}

game.background("img/mit.jpg")
game.dialog.voice("sound/squeek.wav")

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

const gradient = game.sprite({ image: "img/gradient.png", w: 640, h: 640, color: [0,0,0] })

game.dialog.textBox.visible = false

const zig = game.sprite({
    xalign: 0.5, yalign: 0.5,
    color: [1,1,1],
    x: -8, y: -2,
    w: 67, h: 23,
    images: {
        name: { image: "img/zig_name_xs.png", color: [1,1,1] },
        logo: { image: "img/zig_logo_xs.png", color: "#f7a41d" },
    },
    xscale: 1,
    yscale: 1,
})
zig.show()
gradient.show("back")
game.tween(gradient.color, [0.4, 0.4, 0.4], 3)
game.tween(zig, { xscale: 4, yscale: 4, x: -100, y: -30 }, 3, 'outExpo')
wait(3)

game.tween(gradient.color, [0,0,0], 1)
game.tween(zig.color, [0,0,0], 1)
wait(1)
zig.hide()
gradient.hide()

// Make the textbox larger
game.dialog.textBox.visible = true
game.dialog.nameBox.y -= 25
game.dialog.textBox.y -= 25
game.dialog.textBox.h += 25

const me = game.character("Cade", { image: composite, yalign: 1, x: -100, })
const grass = game.sprite({ image: "img/cortana.gif", yalign: 3/4, y: -64 * 1/4, xalign: 1 })

game.event("say", function() {
    if (game.getSpeaker() == me)
        composite.images.mouth = mouthYapping
    else
        composite.images.mouth = mouthClosed
})

me.show()
grass.show("front")
// TODO: Automatic delays for punctuation and other user-defined patterns.
pause()
me.say("This is the engine playground.\n<>It's got cool text effects!</>", { render: wave })
pause()
me.say("Here are some of the tasks I need to finish:")
pause()
more("<>\n\n  Proper scaling for web browsers.</>", { color: "#f0f" })
wait(0.4)
more("<>\nThumbnail support for the site.</>", { color: "#ef0" })
wait(0.4)
more("<>\n  Multi-version loader for compatibility.</>", { color: "#0f0" })
wait(0.4)
more("\nAnd it all has to be wrapped in a good API.")
pause()

composite.images.eyes = "img/dude/eyes.png"
me.say("Please fill out my simple survey")
pause()

let answer = null
while (answer == null) {
    me.say("minion or da bob fo today")
    answer = game.dialog.choice({
        "Minion plz": "minion!!!",
        "Bob! bob!": "bob???",
        neither: null,
    })
    if (answer == null) {
        composite.images.eyes = "img/dude/eyes_evil.png"
        me.say("no!!!")
        pause()
        composite.images.eyes = "img/dude/eyes.png"
    }
}

me.say(answer)
pause()

me.hide()

undertale()
more("hallo!")
pause()

undertale()
more("what's\ngoin\n<>oooonnnnn???!!!??????????????????\n</>", textEffects)
pause()

more("<>...</> ", { cps: 3 })
wait(0.5)
more("<>Let's change the effects</>\n", {color: "#ff0"})
wait(1)
// Cool trick: We can edit textEffects later whenever we wish
textEffects.color = "#0f0"
textEffects.render = shake
wait()