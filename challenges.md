# Online Experiments Coding Challenge — The Subjectivity Lab

Here I describe 3 challenges for you to solve using HTML/CSS/JavaScript (not to be confused with Java—that's a completely different programming language!). They’re very close to what you will have to do in the lab on a day to day basis, if you’re going to lead your own projects. If you already know HTML/CSS/JavaScript, skip ahead to the next section.

I have found this the best way for one to learn HTML/CSS/JS, i.e. to learn by actually using it. There are courses and introductory books, but most of us learned how to use it by just using the help functions, online tutorials, figuring out what other people’s codes do, etc. So I suggest you try this route. You can ask friends or other lab members for the occasional odd technical questions, but you really should try to figure it out yourself. Taking courses is of course good too, they are more systematic and they can give you more theoretical knowledge about programming languages, which can be useful. That said, courses will teach you more than what you need for working in the lab (which is good, but time consuming) and they may not teach you everything you'll need (which requires that you figure things on your own anyway). But even if you take a course, or already have some experience in programming before, to run projects in the lab you need to complete these challenges first. 

## Prep work

HTML is the most basic building block of the Web. It defines the meaning and structure of web content. Other technologies besides HTML are generally used to describe a web page's appearance/presentation (CSS) or functionality/behavior (JavaScript). To code in HTML/CSS/JavaScript you'll need a code editor. There are many out there, and you should use the one that makes you feel more comfrotable. However, I think open-source editors with good GitHub integration that allows you to preview HTML/CSS/JavaScript code is what you need. [Atom](http://atom.io) and [Visual Studio Code](http://code.visualstudio.com) are good editors that meet these requirements (especially the first two). 

If this is your very first encounter with HTML/CSS/JS, you can start reading [here](https://developer.mozilla.org/en-US/docs/Web/HTML) to familiarize yourself with these languages. Even though they are different languages, you'll need to integrate the three of them for making beautiful, functional, dynamic websites—which is basically what we use for running online experiments. There are (probably literally) a million tutorials out there that you can rely on (but do let me konw if you find one that you particularly like so that we can add it to our resources section). So, just pick one and start learning the basics of the syntax. It probably makes sense to start with HTML, then move onto CSS, and finally incorporate JS. 

If you want to get a sense of what a full experiment that we've used in the past, dive into the Examples folder. There's some source code for experiments that I (Jorge) have used in the past. The first thing you should know is that... I'm not a great programmer! I hope this is somewhat encouraging especially if you're just learning (and hopefully it's not to embarrassing if you're already an expert programer). I do think that the most important thing about code is that it works as it is intended (e.g. stimuli are presented correctly, data is saved adequately). Other things can be secondary to these. 

## Challenge 1: Design a functional website



Problem 1 - Analyzing a behavioral dataset. 
On this link

https://dl.dropbox.com/u/24886318/grating2AFC%20S11.mat

there is a data file. The file is also in the Dropbox installed on the lab computers in the folder Public. Use Matlab to open it. The data file is from a simple psychophysics experiment. Subjects saw two circles of visual noise on the left and right sides of the screen, and one of the patches contained a sinusoidal visual grating. Subjects had to say which stimulus had the grating (left or right) and rate how confident they were that their answer was correct, on a scale of 1 to 4. 

The format of the data file is as follows. “data” is the main variable of interest. It is a “struct” variable, which means it is basically a package that holds a bundle of variables inside of it. “data” holds several arrays with 1 row and 1000 columns. In these arrays, the i’th column contains information pertaining to the i’th trial of the experiment. The main variables of interest inside “data” are

data.stimID : codes what type of stimulus was shown. 0 = grating was on the left, 1 = grating was on the right.
data.response : codes subject’s stimulus classification. 0 = responded that grating was on the left, 1 = responded that grating was on the right. Negative values indicate trials where the subject didn’t enter this information within the given time limit.
data.rating : codes the subject’s confidence rating, 1 through 4. 1 is lowest confidence, 4 is highest. Negative values indicate trials where the subject didn’t enter this information within the given time limit.
data.responseRT : codes the time between stimulus offset and the subject’s response.

1.1. Plot the mean reaction times for the first half of the experiment and the 2nd half of the experiment respectively. Put error bars (standard error of mean) on the two bars representing the reaction times. Put labels and everything to make it look nice. Make the graph black and white only and print it out. 

1.2 Run a t-test to see if the RTs for the first and second half of the experiment differed significantly. If you don’t know what a t-test is, try wikipedia or any elementary statistics book.

1.3 Plot the median reaction times for the 4 confidence levels respectively. (You don’t need error bars for this one or the following ones).

1.4 Calculate and plot d’ for the 4 confidence levels respectively. If you don’t know what d’ is, check it out here http://www.cns.nyu.edu/~david/handouts/sdt/sdt.html. We use SDT a lot in the lab. Be familiar with it. (Something to think about: now that you have calculated the 4 d’ values for each confidence level, do you think this is theoretically a correct thing to do? Answer: according to SDT, not really. Think about why not.)

1.5.- Calculate and plot meta-d’ for the first half and 2nd half of the experiment respectively, using our in-house toolbox (http://www.columbia.edu/~bsm2105/type2sdt/). Read through the relevant documentation on that website to get at least a conceptual understanding of what meta-d’ measures. 

Problem 2 - Programming your own experiment
Some example codes of other experiments we run may help you get started.

https://dl.dropbox.com/u/24886318/grating2AFC.zip

As above, this file is also in the Dropbox installed on the lab computers in the folder Public. You can use them as templates, but they are typically much more complicated than what we ask you to do below.

2.1. Set up an experiment using Psychtoolbox that does the following: Display a screen to ask the subject to get ready. When they are, they press the space bar to start the experiment. In each trial, you present a white square on either the right side or the left side of the screen. If the square is on the right, the subject has to press the M key as quickly as possible. If the square is on the left, the subject has to press the Z key. If the subject presses the wrong key, make a beep sound, and flash the word error on top of the square. After the subject presses the key, clear the screen, wait for 1.5 seconds, and start a new trial. If the subject presses Q, the experiment terminates. 

2.2. Set the white square to be exactly 3 degree visual angle wide. To figure out visual angle you need to do some calculations based on the distance from the subject to the screen (which we usually just assume to be a certain constant even though the subject moves a bit), and the size of the screen etc. Figure out how to do it.

2.3 Change to flash the white square for only 50 ms no matter when the subject presses the key. 

2.4. Replace the white square with a Gabor patch (figure out what it is). In every trial, the Gabor patch is gonna be presented in a random orientation. Set the luminance contrast of the Gabor to be exactly 50%. You need to understand something about Gamma correction (this one you can ask other lab members) and figure out how to calculate contrast for the Gabor.

2.5 Now, randomly interleave the Gabor trials and white square trials. Specify and display the following instruction on the beginning screen: If it is a Gabor, the subject have to press the left key when the Gabor is on the right, and vice versa. If it is a white square, they press the key on the same side as the white square. (Left key = Z, right key = M). 

2.6 Record the data for an experiment of 100 trials (*exactly* 50 Gabor and 50 white square, in random order; in general, always randomize the order the a list of trials, rather then randomly decide what each trial is - think about why the former is better than the latter). Easiest would be to use yourself as a subject. Then plot the RTs and error rates for the two conditions (Gabor with reverse left-right responding vs white square with straightforward responding).

Problem 3 - Running some simulations 
Make sure you’re familiar with SDT. If http://www.cns.nyu.edu/~david/handouts/sdt/sdt.html is not sufficient, try Macmillan and Creelman’s User’s Guide book, especially the first few chapters. There should be a few lab copies of the book.

3.1 Simulate an experiment in which the “subject” (i.e. a simulated agent) detects a target. In every trial, there’s a 50% chance that the subject will receive a sensory input (a value) from the Target distribution (randomly sampled from a Gaussian distribution), and a 50% chance that the subject will receive a sensory input from the Non-Target distribution (another Gaussian of equal variance but lower mean). The subject sets a certain criterion (midpoint between the two means of the Gaussians), such that a “Yes” output is generated if the sensory input crosses this criterion, and “No” if it is below. Run it for 50 trials, count the proportions of Ys and Ns generated. 

3.2 Set d’ = 1.5. Run the simulation for 30 trials. From the simulated data, calculate d’ as if they are real data, as in problem 1.4. Repeat this simulation several times to get a feel of how d’ behaves with only 30 trials. Now run the simulation again for 200 trials, and calculate d’ again. 

3.3. Change the criterion c such that it is 1 (conservative). Simulate 200 trials, and calculate from the simulated data to make sure you changed the criterion by the right amount (i.e. the empirically estimated c should be close to 1). Calculate d’ too. Now lower the criterion to -1. Calculate d’ again. d’ should be relatively stable at different levels of c. 

3.3 Increase the variance of the Target distribution by 50%, but keep the Non-Target distribution the same. Simulate 200 trials, and see the effect on d’. Now simulate  200 trials for c = 1 and c = -1 respectively. Note how d’ is no longer constant when you change c. Try to think about why if you don’t already understand.

3.4 Run the simulation, 200 trials each, at 5 different levels of c, so as to construct an ROC plot. Now run the simulation again, with only 30 trials each, also at the same 5 levels of c, and construct an ROC plot and compare. 

