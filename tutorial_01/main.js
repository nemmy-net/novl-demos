say("This is the tutorial level!")
pause()
more("\nMost of the code is inside functions\nbut you can write plain code like this.")
pause()

function basicTutorial() {
    say("This is the most basic game. \nIt puts words on the screen.")
    pause()

    say("<>You can color the text.</>", { color: "#f00" })
    more("and add more text...")
    more("\nbut be mindful of the spacing!")
    pause()

    more("\n\nYou can type <>\\n</> to write on a new line.", {color: "#ff0"})
    pause()

    game.dialog.sound("sound/blip.wav")
    
    say("You can choose a typing sound with\n<>game.dialog.sound()</>", { color: "#ff0" })
    pause()
    more("\nTurn up your volume to hear it!")
    pause()

    say("Set a background with\n<>game.background()</>", { color: "#ff0" })
    pause()
    game.background("img/mit.png")
    pause()

    say("<>Volume warning:</>\nSet music with <>game.bgm()</>", { color: "#f00" }, { color:"#ff0" })
    pause()

    // 0.5 sets it at half volume, but the volume setting is optional. The default is 1.0
    game.bgm("sound/dos1.mp3", 0.5)
    more("\nStop music with <>game.bgm()</> again", { color: "#ff0" })
    pause()

    game.bgm()
    say("That's all!")
    pause()
}

function spriteTutorial() {
    game.background("img/mit.png")
    
    let dude = game.sprite({ image: "img/dude.png" })
    dude.show()

    say("Create sprites with\n<>let x = game.sprite()</> and <>x.show()</>", { color: "#ff0" })
    pause()

    say("Let's move the sprite.")
    pause()

    dude.xalign = 1
    more("\nxalign will move a sprite to the right.")
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
    more('<>\n"front" does what you\'d expect\n.hide() will hide it.</>', {color: "#888"})
    pause()
}

function characterTutorial() {
    game.background("img/mit.png")

    cade = game.character("Cade", { image: "img/dude.png" })
    cade.show()
    cade.say("My name is Cade, I'm a character.")
    pause()
    more("\nA character is a sprite with more abilities.")
    pause()
    more("\nDon't forget to use <>.show()</> and <>.say()</>", {color: "#ff0"})
    pause()

    cade.say("My name appears on screen while talking.")
    pause()
    cade.blab("img/dude2.png", "img/dude.png") // This plays at 6 FPS by default
    // You can play it at 12 FPS:
    //   cade.blab("img/dude2.png", "img/dude.png", 12)
    // You can also use a list of frames:
    //   frames = ["img/dude2.png", "img/dude.png"]
    //   cade.blab(frames, 12) 
    // Or use a GIF or a still image:
    //   cade.blab("img/dude2.png")
    more("\nUse <>.blab()</> to create a talking animation\nfrom 2 images.", {color: "#ff0"})
    pause()
    more("\nThat's all you need to know, really.")
    pause()
}

function choiceTutorial() {
    game.background("img/mit.png")
    
    say("You know how to use say()\n")
    pause()
    more("That is a shortcut for game.dialog.say()\n")
    pause()
    more("<>game.dialog.choice()</> will show choices.\n", {color: "#ff0" })
    pause()
    more("It has no shortcut (but you can make one).")

    game.dialog.choice({ "Okay": "" })

    say(
        'You can write\n' +
        '<>x = game.dialog.choice({"Fruit #1": "apple"})</>\n' +
        'to show "Fruit #1" on screen.\n',
        { color: "#ff0" }
    )
    pause()
    more('When clicked, x will be "apple"')
    pause()

    say("Try it:")
    let x = game.dialog.choice({
        "Fruit #1": "apple",
        "Fruit #2": "lemon",
    })
    say("You chose " + x)
    pause()

    say("You can learn about JavaScript loops to\ncreate a chapter select or other features.\n")
    pause()
    
    say("Have fun!")
    pause()
}

// Run the chapter select forever
while (true) {
    say("Select a chapter")
    add("<>\nPress R to reload\nHold SHIFT to speed up dialog</>", {color: "#888"})
    let choice = game.dialog.choice({
        "Basics": basicTutorial,
        "Sprites": spriteTutorial,
        "Characters": characterTutorial,
        "Choices": choiceTutorial,
    })
    choice()
    game.clear() // Reset the screen back to normal
}