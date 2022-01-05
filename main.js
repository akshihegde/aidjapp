song="";
scoreleftwrist=0;
LeftWristX=0;
LeftWristY=0;
RightWristX=0;
RightWristY=0;
function preload(){
song=loadSound("music.mp3");
}
function setup(){
canvas= createCanvas(600,500);
canvas.center();
video= createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video,modelLoaded);
posenet.on('pose',gotPoses);
}
function modelLoaded(){
console.log("model loaded");
}
function gotPoses(results){
if (results.length>0){
console.log(results);
scoreleftwrist=results[0].pose.keypoints[9].score;
console.log("score left wrist=" + scoreleftwrist);

LeftWristX= results[0].pose.leftWrist.x;
LeftWristY= results[0].pose.leftWrist.y;
RightWristX= results[0].pose.rightWrist.x;
RightWristY= results[0].pose.rightWrist.y;
console.log("Left wrist x =" + LeftWristX + "Left wrist y=" + LeftWristY );
console.log("Right wrist x =" + RightWristX + "Right wrist y=" + RightWristY );

}
}
function draw(){
image(video,0,0,600,500);
fill("#fc0303");
stroke("#fc0303");
if(scoreleftwrist>0.2){
circle(LeftWristX,LeftWristY,20);
Innumber= Number(LeftWristY);
remove_decimals= floor(Innumber);
volume= remove_decimals/500;
document.getElementById("volume").innerHTML="volume= " + volume;
song.setVolume(volume);
}
}
function play(){
song.play();
song.setVolume(1);
song.rate(1);
}