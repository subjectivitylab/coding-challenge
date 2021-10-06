# Online Experiments Coding Challenge — The Subjectivity Lab

Here you'll find 3 challenges for you to solve using HTML/CSS/JavaScript (not to be confused with Java — that's a completely different programming language!). They’re very close to what you will have to do in the lab on a day to day basis, if you’re going to lead your own projects. If you already know HTML/CSS/JavaScript, skip ahead to the next section.

I have found this the best way for one to learn HTML/CSS/JS, i.e. to learn by actually using it. There are courses and introductory books, but most of us learned how to use it by just using the help functions, googling, online tutorials, figuring out what other people’s codes do, etc. So I suggest you try this route. You can ask friends or other lab members for the occasional odd technical questions, but you really should try to figure it out yourself. Taking courses is of course good too, they are more systematic and they can give you more theoretical knowledge about programming languages, which can be useful. That said, courses will teach you more than what you need for working in the lab (which is good, but time consuming) and they may not teach you everything you'll need (which requires that you figure things on your own anyway). But even if you take a course, or already have some experience in programming before, to run projects in the lab you need to complete these challenges first. 

## Prep work

HTML is the most basic building block of the Web. It defines the meaning and structure of web content. Other languages besides HTML are generally used to describe a web page's appearance/presentation (CSS) or functionality/behavior (JavaScript). To code in HTML/CSS/JS you'll need a code editor. The code editor we recommend in the lab is [Visual Studio Code](http://code.visualstudio.com). It allows for seamless GitHub integration and you can preview HTML/CSS/JS code. For the same reason I recommend you the download GitHub desktop app. If you are familiar with coding already or you know how to use GitHub and have a different code editor or GitHub workflow preferences, you are welcome to use that. Otherwise, use Visual Studio Code. 

If this is your very first encounter with HTML/CSS/JS, you read [this](https://developer.mozilla.org/en-US/docs/Web/HTML) to familiarize yourself with the very basics of these languages. Even though they are different languages, you'll need to integrate the three of them for making beautiful, functional, dynamic websites — which is basically what we use for running online experiments. There are tens if not hundreds of tutorials out there that you can rely on (but do let me konw if you find one that you particularly like so that we can add it to our resources section). So, just pick one and start learning the basics. It probably makes sense to start with HTML, then move onto CSS, and finally incorporate JS. 

If you want to get a sense of what a full experiment looks like, dive into the Examples folder. There you'll find source code for some experiments that I (Jorge) have used in the past. The first thing you should know is that... I'm not a great programmer! I hope this is somewhat encouraging especially if you're just learning (and hopefully it's not too embarrassing if you're already an expert coder). The most important thing about code is that it works as it is intended (e.g. stimuli are presented correctly, data is saved adequately). Other things can be secondary to these. 

## Instructions

Create the following three experiments and upload them to the Lab's GitHub. You should create a private folder with your name (LAST-FIRST), with subfolders for each challenge. Each challenge should contain an .html, .css, .js file and, if applicable, a folder with images. You can alert Jorge after finishing each challenge or you can wait until you finish all of them.

To finish this challenges you should download Visual Code Studio

### Challenge 1: Where is the white square?

Design an experiment where subjects determine whether a white square appeared on the left or the right side of the screen. 

1.1 In each trial, subjects see a 100x100px white square 200px to the left or to the right of the center of the screen (the side is randomly determined). In each trial, on the other side of the screen, a green or red 100x100px square appears too (the color is randomly determined). Subjects press a key ("L" or "R") to select the white square side. The next trial begins after 500ms. The experiment consists in 8 trials. 

1.2 The squares appear only for 250ms and after they disappear subjects have no more than 1500ms to respond. Otherwise, a message appears on the screen for 1000ms saying they were too slow and the next trial begins.

1.3 Counterbalance the presentation side of the white square (i.e. make it appear, in a random order, the same number of times on the left and the right). Think why this is better than mere randomization.

1.4 Counterbalance the distractors: On half of the trials in which the square appears on the left, the right square is red and on the other half it's green. Same applies when the white square appears on the right.

1.5 For each trial, record in a dictionary called "expData" arrays with the most relevant information about each trial, including on which side the white square appeared, what color was the other square, what key they pressed, reaction time (i.e. how long it took subjects to responde—from the instant the stimuli appear on the screen to when they press a key), whether the subject's response was correct, incorrect, or if they were too slow.

### Challenge 2: 


### Challenge 3: 