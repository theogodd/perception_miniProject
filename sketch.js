let faceapi;
let detections = [];

let video;
let amim;
let canvas;

// variable used to divide up the sections in this simple interactive story
var gamestate = 0;

let facePosx;
let facePosy;

var isHappy = false;
var boxDrawn = false;
var paulEkman_boolean = false;
var imageNetLogo_boolean = false;
var imageNetCollage_boolean = false;

var crawfordText1;
var crawfordText2;
var crawfordText3;

var textScroll = 720;

function preload()
{
    //preload assets used throughout
    gaze = loadImage('assets/columbiaGaze.jpg');
    dataSetFace = loadImage('assets/dataSetFace.jpg');
    hooligan = loadImage("assets/hooligan.jpg");
    mugShot1 = loadImage('assets/mugShot1.jpg');
    mugShot2 = loadImage('assets/mugShot2.jpg');
    imageNetCollage = loadImage('assets/imageNetCollage.jpg');
    dortmund1 = loadImage('assets/dortmund1.jpg');
    dortmund2 = loadImage('assets/dortmund2.jpg');
    dortmund3 = loadImage('assets/dortmund3.jpg');
    imageNetBiasText = loadImage('assets/ImageNetBiasText.jpg');
    imageNetLogo = loadImage('assets/ImageNetLogo.jpg');
    
    crawfordText1 = loadImage('assets/crawfordText1.jpg');
    crawfordText2 = loadImage('assets/crawfordText2.jpg');
    crawfordText3 = loadImage('assets/crawfordText3.jpg');
}

function setup()
{
    canvas = createCanvas(1080, 720);
    canvas.id('canvas');
    
    //attempt to reduce buffer
    pixelDensity(0.5)
    if(gamestate < 6)
    {   
        frameRate(10);
    }
    else
    {
    frameRate(20)
    }
    
    video = createCapture(VIDEO);
    video.id('video');
    video.size(width, height);
    video.hide();
    
    // faceOptions objects used for face.api
    const faceOptions = 
    {
        withLandmarks: true, 
        withExpressions: true, 
        withDescriptors: true, 
        minConfidence: 0.3
    };
     
    // detects a face in the input which in this case is the webcam video
    faceapi = ml5.faceApi(video, faceOptions, faceReady);
}

function faceReady()
{
    // start detecting the face
    faceapi.detect(gotFaces);
}

function gotFaces(error, result)
{
    // error handling
    if(error)
    {
        console.log(error);
        return;
    }
    
    detections = result;
    
    //console.log(detections);
    faceapi.detect(gotFaces);
}

function draw()
{
    mirror();
    if(gamestate < 6)
    {    
        image(video, 0, 0, width, height);
    }
    else
    {
        image(gaze, 0, 0, width, height);
    }
        
    // call the functions that are used to draw images and fopr interactions
    userInstruction();
    mugShot2_function();
    dataSetFace_function();
    paulEkmanText_function()
    imageNetLogo_function();
    imageNetCollage_function();
    lastSection();
    
    // draw the box and the landmarks at the location of the face
    drawBox(); 
    drawLandmarks(detections);
    // function to get the faceapi to detect the expression of the user that i can't get to work
//    expressionDetection(detections);
    
    // text scrolls up each frame like credits
    if(imageNetCollage_boolean == true)
    {
        textScroll -= 3;
    }
    console.log(gamestate);
}

function drawBox()
{
    // if at least one face is detected
    if(detections.length > 0)
    {
        for(f=0; f < detections.length; f++)
        {
            let x = detections[0].alignedRect._box._x;
            let y = detections[0].alignedRect._box._y;
            let rectWidth = detections[0].alignedRect._box._width;
            let rectHeight = detections[0].alignedRect._box._height;
            
            // properties of the box
            stroke(44, 169, 255);
            strokeWeight(3);
            
            // fill if its a specific part of the narrative
            if(imageNetCollage_boolean == true && gamestate < 6)
            {
                fill(150);
            }
            else
            {
                noFill();   
            }
            
            rect(x + 20, y, rectWidth - 40, rectHeight - 40);
            
            //CALL THIS FUNCTION HERE SO YOU CAN SEE THE TEXT INFRONT OF THE TEXTBOX WHEN YOU HOVER YOU FACE OVER IT
            blendMode(HARD_LIGHT);
            imageNetText_function();
            
            blendMode(DIFFERENCE);
            //global variables to determine where the face is on the screen
            facePosx = x + rectWidth/2;
            facePosy = y + rectHeight/2;
            
            boxDrawn = true;
        }
    }
}

// function to draw the landmark dots on the face of the user
function drawLandmarks(detections)
{
    if(detections.length > 0)
    {
        for(var f=0; f < detections.length; f++)
        {
            let points = detections[f].landmarks.positions;
            for(let i=0; i < points.length; i++)
            {
                stroke(44, 169, 225);
                strokeWeight(3);
                point(points[i]._x, points[i]._y);
            }
        }
    }
}

function expressionDetection(detections)
{
    // "cannot destructure property of neutral as it is undefined"
    // ie. not working
    
    textFont('Helvetica');
    textSize(50);
    noStroke(); 
    fill(44, 169, 255);
    mirror();
    
    if(detections.length > 0)
    {
        let {neutral, happy, angry, sad, disgusted, surprised, fearful} = detections[0].expressions;

        text("neutral: " + nf(neutral * 100, 2, 2) + "%", 500, 500);
        text("happy: " + nf(happy * 100, 2, 2) + "%", 500, 520);
        text("angry: " + nf(angry * 100, 2, 2) + "%", 500, 540);
        text("sad: " + nf(sad * 100, 2, 2) + "%", 500, 560);
        text("disgusted: " + nf(disgusted * 100, 2, 2) + "%", 500, 580);
        text("surprised: " + nf(surprised * 100, 2, 2) + "%", 500, 600);
        text("fearful: " + nf(fearful * 100, 2, 2) + "%", 500, 620);
        ellipse(100, 500, 500);

        if(nf(happy * 100, 2, 2) > 50)
        {
            isHappy = true;
        }
        else
        {
            isHappy = false;
        }
    }
    mirror();
}

function userInstruction()
{
    // instruction to the user to come up before the face detection starts
    if(frameCount < 50 && boxDrawn == false && gamestate < 6)
    {
        let y = 680
        mirror();
        textSize(50);
        textAlign(CENTER);
        text("USE YOUR FACE TO CONTROL", width/2, y);
        mirror();
        y -=1;
    }
}

function mugShot2_function()
{
    // this image should only show up once the face has been detected
    if(boxDrawn == true && gamestate < 6)
    {
        image(mugShot2, 50, 50, width/6, width/6);
        
        // so the user can interact if within distance
        let mugShot2_Dist = dist(140, 140, facePosx, facePosy);
        if(mugShot2_Dist < 200)
        {
            mirror();
            textSize(50)
            textAlign(CENTER);    
            text("TECHNOLOGY IS NEVER APOLITICAL", 740, 140, 50);
            mirror();
        }   
    }
}

function dataSetFace_function()
{
    if(boxDrawn == true && gamestate < 2 && gamestate < 6)
    {
        mirror();
        image(dataSetFace, 100, 400, width/3, width/5);
        mirror();
    }
    
    // so the user can interact if within distance
    let dataSetFace_Dist = dist(950, 550, facePosx, facePosy);
    if(dataSetFace_Dist < 200)
    {
        //activate the image net logo
        paulEkman_boolean = true;
    }   
}

function paulEkmanText_function()
{
    if(paulEkman_boolean == true && gamestate < 6)
    {
        mirror();
        fill(200);
        rect(width/7, 20, 400, 300);
        fill(50);
        textSize(20);
        text("FACIAL EXPRESSION SYSTEMS PICKED UP IN THE 70s WITH PAUL EKMAN WHO PUBLISHED FACIAL ACTION CODING SYSTEM (FACS) IN '78. AND UP UNTIL THE INTERNET, DATASETS WERE USED FROM SPECIFIC LIBRARIES LIKE A 'DATABASE OF KNOWN FOOTBALL HOOLIGANS' WHICH TRAINED TECHNOLOGIES FOR CRIMINAL DETECTION", width/7, 40, 400, 300);
            
        // use the same techniques as in the last slide to draw an image that bounces between two locations using sin for a nice effect
        var progress = (frameCount % 1000) / 250;
        var sinInterp = sin(progress * (PI / 1));
        var y = lerp(290, 575, sinInterp);
        image(hooligan, 20, y, 100, 100);
        
        mirror();
        
        // to allow the user to interact
        let paulEkmanText_Dist = dist(750, height/5.75, facePosx, facePosy);
        if(paulEkmanText_Dist < 100)
        {
            imageNetLogo_boolean = true;
        }
        gamestate = 3;
    }
}

function imageNetLogo_function()
{
    if(imageNetLogo_boolean == true && boxDrawn == true && gamestate < 6) 
    {
        mirror();
        image(imageNetLogo, 600, 500, width/4, height/5);
        mirror();
    }
    
    let imageNetLogo_Dist = dist(250, 600, facePosx, facePosy);
    
    if(imageNetLogo_Dist < 100)
    {
        imageNetCollage_boolean = true;
    }
}

function imageNetCollage_function()
{
    if(imageNetCollage_boolean == true && textScroll > -2500 && gamestate < 6)
    {    
        blendMode(NORMAL);
        // image to take up the whole screen
        image(imageNetCollage, 0, 0, width, height);
    }
    
    // this initiates the final gamestate to show the summarising pieces of text written by kate Crawford
    if(textScroll < -2500)
    {
        gamestate = 6;
    }
}

function imageNetText_function()
{
    if(imageNetCollage_boolean == true && gamestate < 6)
    {
        mirror();   
        textSize(30)
        textAlign(CENTER); 
        
        text("ImageNet was set up in the 2000s aiming to expand the data available to AI algorithms. Over 20 000 categories are used to classify images pulled from various locations. some are objective CAR, SPANNER, while others are subjective and lead to ambiguity causing a deep rooted bias that is then entrenched into all machine learning systems that derive from it.      'ImageNet Roulette' revealed the extent to this problem when people could upload selfies to be categorised by the program. Several players on the Borussia Dortmund football squad were entered in: some came back categorised as things like 'NONSMOKER' while serious claims were made on others, like 'RAPE SUSPECT'. The internalised racism in this system is obvious. Dan-Axel Zagadou was hightlighted as a 'WRONGDOER [and] OFFENDER'. This Bias should not just be seen as an error within imageNet but rather a fault in the way we think about classification and the training of AI systems. Within the tech industry there is a disregard for ethics as a trade-off for simplifying developments and rushing processes in order to please shareholders and consumers.", width/1.5, textScroll, width/4);

        // draw the images so they scroll up at the right time to fit with what the text is saying
        blendMode(NORMAL);
        if(textScroll < -500)
        {
            image(dortmund1, 100, textScroll + 500 + height, 200, 300);
        }
        if(textScroll < -900)
        {
            image(dortmund3, 30, textScroll + 900 + height, 600, 200);
        }
        if(textScroll < -1200)
        {
            image(dortmund2, 400, textScroll + 1200 + height, 200, 200);
        }
        
        mirror();
        gamestate += 1;
    }
}

function lastSection()
{
    // only drawn if in the final gamestate
    if(gamestate == 6)
    {
        // no overlay so you can actually read the text
        blendMode(BLEND);
        
        // using the sinosoidal method do implement the movement of the kate crawford text - each move at a different speed related to the division of PI
        var progress = (frameCount % 1000) / 250
        var sinInterp1 = sin(progress * (PI / 1));
        var sinInterp2 = sin(progress * (PI / 2)); 
        var sinInterp3 = sin(progress * (PI / 4));    

        // they each take a different x position according to the speed they will move 
        var x1 = lerp(290, 575, sinInterp1);
        var x2 = lerp(290, 575, sinInterp2);
        var x3 = lerp(290, 575, sinInterp3);    

        // draw the pieces of text arranged vertically    
        mirror();    
        image(crawfordText1, x1, 25, 500, 200);
        image(crawfordText2, x2, 250, 500, 200);
        image(crawfordText3, x3, 475, 500, 200);    
        mirror();            
    }
}

// created the mirror function since the webcam translate the life feed in a reversed position
function mirror()
{
        translate(width,0);
        scale(-1, 1);
}
