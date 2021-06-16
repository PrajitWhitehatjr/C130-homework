scoreLeftWrist=0;
scoreRightWrist=0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
song1="";
song2="";
song1s="";
song2s="";

function preload() {
    song1= loadSound("music.mp3");
    song2= loadSound("Spiderman.mp3");
}
function setup() {
    canvas=createCanvas(360,350);
    canvas.position(600,300)
    video=createCapture(VIDEO);
    video.hide();
    classifier=ml5.poseNet(video,modelLoaded);
    classifier.on('pose',gotResults);
}

function modelLoaded() {
    window.alert("Model is loaded!");
}

function draw() {
    image(video,0,0,360,350);

   song1s= song1.isPlaying();
   song2s= song2.isPlaying();


    if (scoreLeftWrist >= 0.2) {
        fill(255,0,0);
        stroke(255,0,0);
        circle(leftWristX,leftWristY,20);
        song2.stop();

        if (song1s == false) {
            song1.play();
            document.getElementById("song_name").innerHTML="Harry potter song";
        }
    }

    if (scoreRightWrist >= 0.2) {
        fill(255,0,0);
        stroke(255,0,0);
        circle(rightWristX,rightWristY,20);
        song1.stop();

        if (song2s == false) {
            song2.play();
            document.getElementById("song_name").innerHTML="Spiderman song";
        }
    }
}

function gotResults(results) {
    if (results.length>0) {
       console.log(results) 
       scoreLeftWrist=results[0].pose.keypoints[9].score;
       console.log("scoreLeftWrist = "+scoreLeftWrist);
       
       scoreRightWrist=results[0].pose.keypoints[10].score;
       console.log("scoreRightWrist = "+scoreRightWrist);

       leftWristX=results[0].pose.leftWrist.x;
       leftWristY=results[0].pose.leftWrist.y;
       rightWristX=results[0].pose.rightWrist.x;
       rightWristY=results[0].pose.rightWrist.y;
       console.log("left wrist x= "+leftWristX+" left wrist y= "+leftWristY+" right wrist x= "+rightWristX+" right wrist y= "+rightWristY);
    }
}


