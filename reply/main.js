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
game.texture("img/awesome.png")
game.texture("img/awesome_talk.png")
const orc = game.sound("sound/orc.wav")

const me = game.character("", {image: "img/smile.png", voice: "sound/huh.wav"})
function emote(name) {
    me.blab() // This is a workaround to clear the active blab, otherwise the next call to blab() will trample our changes.
    me.image = "img/" + name + ".png"
    me.blab("img/" + name + "_talk.png", me.image)
}

me.show()
emote("awesome")
me.say("This is super impressive!")
wait(0.2)
more("\nYou nailed it first try.")
pause()
emote("happy")
me.say("I fixed that pesky xalign\nissue for you.<> </>It's in the\nlatest version now.", {cps: 2})
pause()
emote("neutral")
more("\n\nYou'll have to re-download\nthe editor...<> </>I need to make an\nauto-updater.", {cps: 2})
wait(1)
orc.replay()
add("\n\nhmm.")