song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
peter_pan_song = "";


function preload()
{
    peter_pan_song = loadSound("music2.mp3");
    Harry_potter_song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    song_peter_pan = peter_pan_song.isPlaying();
    console.log(peter_pan_song);
   
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY,20);
        peter_pan_song.stop();
        if(Harry_potter_song == "false")
        {
            Harry_potter_song.play();
        }
    }
}

function play()
{
    peter_pan_song.play();   
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {


        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " +rightWristX + "rightWristY = " + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);
    }
}