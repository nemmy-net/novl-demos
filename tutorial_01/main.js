say("This is the tutorial level!")
pause()
more("\nMost of the code is inside functions\nbut you can write plain code like this.")
pause()

function basicTutorial() {
    say("This is the most basic game. \nIt puts words on the screen.")
    pause()

    say("You can color the text.", { color: "#ff0000" })
    more("and add more text...")
    more("\nbut be mindful of the spacing!")
    wait(0.2) // This waits for 0.2 seconds

    more("\n\nYou can use \\n to write on a new line.")
    pause()

    game.dialog.sound("sound/blip.wav")
    say("You can choose a typing sound with")
    more("\ngame.dialog.sound()", { color: "#ff0" })
    pause()

    say("Set a background with")
    more("\ngame.background()", { color: "#ff0" })
    pause()
    game.background("img/mit.png")
    pause()

    say("Volume warning:", {color: "#f00"})
    more("\nSet music with game.bgm()")
    pause()

    game.bgm("sound/dos1.mp3")
    more("\nStop music with game.bgm() again")
    pause()

    game.bgm()
    say("That's all!")
    pause()
}

function spriteTutorial() {
    game.background("img/mit.png")
    
    let dude = game.sprite({ image: "img/dude.png" })
    dude.show()

    say("Create sprites with")
    more("\nlet x = game.sprite()", { color: "#ff0" })
    more(" and")
    more("\nx.show()", { color: "#ff0" })
    pause()

    say("Let's move the sprite.")
    pause()

    dude.xalign = 1
    more("\nxalign will move a sprite to the right.")
    pause()
    more("\nResize the window. It will stick to the right.")
    pause()

    say("This is what happens when xalign\ngoes from 0 to 1.")
    dude.xalign = 0
    wait(game.tween(dude, { xalign: 1 }, 2))
    more("\n0.5 puts it in the center.")
    wait(game.tween(dude, { xalign: 0.5 }, 1))
    pause()

    say("You can set x and y to get a specific position.")
    pause()

    dude.y = 100
    more("\ny will move things down.")
    pause()

    dude.y = -100
    more("\nA negative number does the opposite.")
    pause()

    let grass = game.sprite({ image: "img/grass.png", xalign: 0.5, yalign: 0.5 })
    grass.show()
    say("Let's add another sprite.")
    pause()

    more("\nNow what if we want it behind the other?")
    pause()

    grass.show("back")
    more('\nUse .show("back")')
    game.tween(grass, { xalign: 0.3 }, 1)
    game.tween(dude, { xalign: 0.7 }, 1)
    wait(1)
    game.tween(grass, { xalign: 0.7 }, 2)
    game.tween(dude, { xalign: 0.3, y: 0 }, 2)
    wait(1)
    more('\n"front" does what you\'d expect\n.hide() will hide it.', {color: "#888"})
    pause()
}

// Run the chapter select forever
while (true) {
    say("Select a chapter")
    add("\nPress R to reload\nHold SHIFT to speed up dialog", {color: "#888"})
    let choice = game.dialog.choice({
        "Basics": basicTutorial,
        "Sprites": spriteTutorial,
    })
    choice()
    game.clear() // Reset the screen back to normal
}