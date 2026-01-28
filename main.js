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

//const composite = Composite(
//    [300, 600],
//    [0, 0], "body.png",
//    [0, 0], "clothes.png",
//    [0, 0], ImageSequence(0.1, [
//        "grass1.png", "grass2.png", "grass3.png"
//    ])
//)
const me = game.character("Grass", { image: "img/grass.png", yalign: 0.5, w: 64, h: 64 })

me.show()
me.say("Hello!")
more(" Please fill out my simple survey")

let answer = null
while (answer == null) {
    say("minion or da bob fo today")
    answer = game.dialog.choice({
        "Minion plz": "minion!!!",
        "Bob! bob!": "bob???",
        neither: null,
    })
    if (answer == null) {
        say("no!!!")
        rest()
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