# perception_miniProject

This project is a short interactive and visual
timeline about the developments in data
collection and facial recognition. I have been
introduced properly into this topic by the
book ‘Atlas of AI’ by Kate Crawfordi, who goes
into depth about the ways in which technology
companies operate and the direction of travel
for AI across the globe. She is thorough in
her critique of this rapidly expanding industry from environmental, human rights and ideological standpoints. My mini project has massively reduced her points down focusing on one concept that she goes into in her chapter ‘Affect’, and I’m not even too interested in it being a particularly educational project but am more wanting to look at different ways information can be put across and visualised in a sort of website/game style format. Reece Griffiths, in their article ‘Cognitive
Sensations’, speaks about digital art having the potential for consciousness raising and ‘real life’ action and change. They go into how digital space can be occupied by art and political thought. The article references blacktransarchive.comii which I think is an amazingly put together narrative/educational interactive project. If I were to further develop my piece, I would want to recreate the immersive
feeling that you get from the work by Brathwaite-Shirley.
The main infrastructure for my code is based on using the position of your face in order to interact with images on the screen. I wanted to use an external dataset in this code since I have been doing research into the history of data collection and machine learning. I have coded this project on p5.js, and the facial recognition element is done by linking my code to ml5.jsiii which is some easily accessible machine learning for use on the web. I was able to attach ml5.js to my sketch with a video from Dan Schiffman’s ‘the Coding Train’iv. Initially I was interested in a concept where the user would upload or insert given images to my code, and it would manipulate them using pixel processing. However, since I’d not worked with a live feed before in JavaScript and wanted to know more about the options that there is regarding the webcam. I decided to implement a facial recognition tool, where you would be able to interact with images on the screen using your face. To hook up the webcam feed to the datasets on ml5.js, I used the tutorial by Kazuki Umedav, who explains in detail how to do this with the faceapi.js tool which detects faces in images or videos that you feed it.
     If the x and y positions of the face are within distance of certain
image locations on the screen, then something will happen: either new
images will be shown on or text will appear revealing information about
that develop the concept. This, combined with incrementing the
‘gamestate’, meant that I would be able to build up a short interactive
narrative.
 
I think my project gives some degree of a feeling of
disorder and confusion. When we look at digital systems
in place that we interact with, I think we assume that
the research and planning in place has been organised
and well thought through – since the final product of a
company website or an app on your phone is often sleek
and neutral looking giving the impression of
objectivity making you feel like you can trust itvi.
When design is plain and antiinvasive there is a
feeling that it is in your best interest and can be
relied on. I wanted to move away from this by giving
the user a kind of unclear task to complete and
information that Is presented in not necessarily the
most accessible or obvious way. This combined with the
layering between the live feed creates a stressful
experience where you are unclear what is accidental and
what has been designed that way on purpose. I have also
implemented some of the techniques used in the Easing topic. I wanted there to be more movement besides just the motion of the face on the screen. I opted for the sinusoidal easing since it becomes continuous as it loops around a curve, I think this has worked particularly well layered over the background of the webcam and there is a sense of generative drawing as the image leaves a trail behind itself.
Improvements I have made since trailing it with some people included
adding a brief instruction at the beginning as they didn’t sus out that
the project needed you to use your face to control it. Aesthetically I
am pleased with the result, I think it is interesting to interact with
even though the development is quite short. One person who tested my
program said the glitch style effects gives the feeling that “I am
inside a computer”. I am also happy I was able to implement the facial
recognition element with the specific points referencing to parts of the
user’s face. The user is sort of self-conscious and feels they are being
watched as they go through.
     There were more ideas that I was not able to put into the project.
I would have liked a more varying range of outcomes that user could
explore as well as a progressive breakdown and deterioration of the
imagery used. Since the project is controlled by the face of the user, I
would have liked expression detection to have been a part of the
controls, where they could ‘smile’ or ‘frown’ for different things to
happen. I have created a function for the face.api and left it in the
code since I hope to come back to it and solve the issue. it would
hopefully see when the user is happy or angry, and different outcomes
could be based on these results. This is also the type of project that
lends itself to being very long and developmental, however due to time
constraints this is not possible; I feel like it serves more as a
prototype for something larger.

References
i Crawford, Kate. The Atlas of AI: Power, Politics, and the Planetary Costs of Artificial Intelligence, Yale University Press, 2021.
ii https://blacktransarchive.com/
iii https://learn.ml5js.org/#/
iv https://www.youtube.com/watch?v=yNkAuWz5lnY
v https://www.youtube.com/watch?v=3yqANLRWGLo
vi https://www.creativealif.com/blog/best-mobile-app-trends/
