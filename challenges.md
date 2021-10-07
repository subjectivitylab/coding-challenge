# Online Experiments Coding Challenge — The Subjectivity Lab

Here you'll find 3 challenges for you to solve using HTML/CSS/JavaScript (not to be confused with Java — that's a completely different programming language!). They’re very close to what you will have to do in the lab on a day to day basis, if you’re going to lead your own projects. 

I have found this the best way for one to learn HTML/CSS/JS, i.e. to learn by actually using it. There are courses and introductory books, but most of us learned how to use it by just using the help functions, googling, online tutorials, figuring out what other people’s codes do, etc. So I suggest you try this route. You can ask friends or other lab members for help—this is not a test! Of course, on a daily basis you wouldn't be able to ask friends or labmates how to do things all the time, so for cracking these challenges you should take a similar approach. If I get stuck, after trying to figure something out, should I ask for help? Absolutely! If I were in the lab, would I ask a labmate how to do everything? Probably not. So you should try to understand how things work now so that you can do more things on your own later on. Taking courses is of course good too, they are more systematic and they can give you more theoretical knowledge about programming languages, which can be useful. That said, courses will teach you more than what you need for working in the lab (which is good, but time consuming) and they may not teach you everything you'll need (which requires that you figure things on your own anyway). But even if you take a course, or already have some experience in programming before, to run projects in the lab you need to complete these challenges first. 

## Prep work

HTML is the most basic building block of the Web. It defines the meaning and structure of web content. Other languages besides HTML are generally used to describe a web page's appearance/presentation (CSS) or functionality/behavior (JavaScript). To code in HTML/CSS/JS you'll need a code editor. The code editor we recommend in the lab is [Visual Studio Code](http://code.visualstudio.com). It allows for seamless GitHub integration and you can preview HTML/CSS/JS code nicely. 

If this is your very first encounter with HTML/CSS/JS, you can read [this](https://developer.mozilla.org/en-US/docs/Web/HTML) to familiarize yourself with the very basics of these languages. Even though they are different languages, you'll need to integrate the three of them for making beautiful, functional, dynamic websites — which is basically what we use for running our online experiments. There are tens if not hundreds of tutorials out there that you can rely on, so just pick one, start learning the basics, and see if it works for you. (Do let me konw if you find one that you particularly like so that we can share it with future RAs). It probably makes sense to start with HTML, then move onto CSS, and finally incorporate JS (although you'll probably very quickly start mixing the three of them).

If you want to get a sense of what a full experiment looks like, dive into the Examples folder. There you'll find source code for an experiment that I (Jorge) designed. The first thing you should know is that... I'm not a great programmer! I hope this is somewhat encouraging especially if you just started learning (and hopefully I won't embarrass myself too much if you're already an expert coder). The most important thing about code is that it works as it is intended (e.g. stimuli are presented correctly, data is saved adequately). Other things can be secondary to these. So, go and try make your code work!

## Instructions

To complete these challenges you'll need to download Visual Studio Code to write up your code (or use your preferred editor, if you have one). 

### Challenge 1: Where is the white square?

Design a very simple task where subjects just determine whether a white square appeared on the left or the right side of the screen. 

1.1 Create an instructions page where you explain the task to the subject. At the bottom have a button that, when clicked, hides the instructions and begins presenting the trials after a 2000ms delay. 

1.2 Add format! Make the instructions appear in black font, text center-aligned, on a white background. Make the button dark blue (rgb values (0, 140, 186)), with white text and somewhat large font. Make the instructions page background color white.

1.3 Create the experiment. In each trial, subjects see a 100x100px white square 200px to the left or to the right of the center of the screen (the side is randomly determined). In each trial, on the other side of the screen, a green or red 100x100px square appears too (the color is randomly determined). Subjects press a key ("L" or "R") to select the white square side. The next trial begins after 500ms. The experiment consists in 8 trials. The background color when trials are on display should be gray.

1.4 After the final trial, hide the squares and show a message thanking the subject for their participation. Make the message appear on a white background, centered at the top of the screen in a big, bold, red font.

1.5 Make the squares appear only for 250ms.

1.6 Counterbalance the presentation side of the white square (i.e. make it appear, in a random order, the same number of times on the left and the right). Think why this is better than mere randomization.

1.7 Counterbalance the distractors: On half of the trials in which the square appears on the left, the right square is red and on the other half it's green. Same applies when the white square appears on the right.

1.8 Record all the data from each trial in a dictionary called "expData" with arrays containing the most relevant information, including on which side the white square appeared, what color was the other square, what key they pressed, reaction time (i.e. how long it took subjects to respond—from the instant the stimuli appear on the screen to when they press a key), and whether the subject's response was correct or incorrect.

==BONUS==

1.9 Substitute the squares with pictures. Instead of a white square, the new target should be a picture of a puppy. The green and red distractors should now be pictures of a kitten and a baby bear. Make sure the images are still 100x100px and that they are not distorted (i.e. they shouldn't look squeezed or stretched). Change the instructions accordingly.

### Challenge 2: What color is it? The Stroop Effect

Program a simple experiment to test the famous [Stroop Effect](https://en.wikipedia.org/wiki/Stroop_effect). The Stroop effect demonstrates that it is difficult to name the ink color of a color word if there is a mismatch between ink color and word. For example, it takes longer to identify the color of the ink when the word GREEN is printed in an incongruent ink (e.g. red) than when it is printed in a congruent (green). Code an experiment where participants see words of the following colors: RED, GREEN, BLUE, BROWN, PURPLE. In the version of the experiment that you'll program, subjects see a congruent or incongruent word in every trial. At the bottom of the screen, there are several squares whose color is one of the possible font colors of the words. Subjects' task in each trial is to click on the square that matches the color of the font of the word that appears on the center of the screen. 

2.1 Create an instructions page where you explain the task to the subject. At the bottom have a button that says "next" and that, when clicked, hides the instructions and presents a few demos (examlpes) of the task. You can do this in several ways (e.g. by embedding an animation —e.g. video, gif) showing a few trials. By simulating a few trials and mimicking the mouse clicks in some way (e.g. maybe the selected square glows, maybe the other colors get dimmer, etc.)

2.2 Add format! Make the instructions appear in black font, in a serif font, with justified text. Make the button dark blue (rgb values (0, 140, 186)), with white text and somewhat large font. Make the instructions and demo page backgrounds light gray.

2.3 Create the trial structure. Create trials such that in half of them the words are congruent with one of five font colors (RED, GREEN, BLUE, BROWN, PURPLE), and in half it is incongruent. Now, you need to have all the possible combinations for the incongruent trials, and a matching number of trials for the congruent ones. (e.g. for incongruent trials, RED needs to appear in blue, green, brown and purple colors, so you need 4 trials with RED in red font to make sure there are the same number of congruent and incongruent trials for each color word). Present in random order.

2.4 Create the experiment. In each trial, subjects see a color word in capital letters, sans-serif font, that is 20pt in size, exactly in the middle of the screen (both vertically and horizontally). The word remains on screen until subjects respond. At the bottom of the screen there are five 100x100px circles evenly distributed each with a matching color for each font color used in the words. To select the font color, subjects use their mouse to click on the circle. Once they click on a circle, they advance to the next trial, which starts 500ms afterwards.

2.5 Make sure the order of the response circles at the bottom is randomized across subjects (but is kept fixed for the duration of the experiment for each subject).

2.6 Record all the data from each trial in a dictionary called "expData" with arrays containing the most relevant information, including word color, font color, their response (which circle they picked), reaction time (i.e. how long it took subjects to respond—from the instant the word appears on the screen to when they click on a circle).

==BONUS==

2.7 Prevent subjects from moving to the next trial unless they select the correct answer. Reaction time is now set from stimulus presentation to until they select the correct response, not their first response (in case they are different). Add to expData an array with information about which circles subjects clicked on before giving a correct answer as well as the RT for each click.

### Challenge 3: Coming soon!


## What do I do when I'm done?

To share your code, create a repository in your Github account (something like "Subjectivity-Lab-Challenges" or some such). Create a folder for each Challenge, and make sure to include the .html, .css, and .js files as well as a folder with any required images. Then, give me access to the repository. (If this sounds like rocket science or gibberish right now, don't worry, you'll probably know what it means after spending some time learning how to code and how to navigate Github—it's a great collaboration platform for working with code. You can learn the basics of how to use GitHub [here](https://guides.github.com/activities/hello-world/)).
