song = "";
status = "";
objects = [];

function preload(){
    song = loadSound("old_telephone.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status != ""){
        objectDetector.detect(video, gotResult);
        
        r =random(255);
        g =random(255);
        b =random(255);
        
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            percent = floor(objects[i].confidence * 100);

            fill(r, g, b);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "Person"){
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
            }
            else{
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                song.play();
                song.setVolume(2.5);
            }
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}