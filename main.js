objects = [];
statuss = "";
video = "";

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function setup(){
    video.hide();
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(statuss != ""){
        objectDetecter.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects are " + objects.length;
            fill('red');
            persent = Math.floor(objects[i].confidence*100);
            text(objects[i].label + " " + persent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start(){
    objectDetecter = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
console.log("Model Loaded!");
statuss = true;
video.loop();
video.speed (1);
video.volume(0);
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