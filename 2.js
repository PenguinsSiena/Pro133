img = "";
statuss = "";
object = [];

function preload(){
    img = loadImage("2.jpg");
}
function setup(){
    canvas = createCanvas(650, 500);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = " How many images are in the photo compared to how many are detected?";
}
function modelLoaded(){
    console.log("modelLoaded!");
    statuss = true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results)
{
    if(error) {
        console.log(error);
    } 
     console.log(results);
     object = results;
}
function draw(){
    image(img, 0, 0, 650, 500);
    if(statuss != "")
    {
        for(i = 0; i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "There is 1 big object in the image and the cocossd model has detected 1 object";

            fill('#000000');
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x - 990, object[i].y - 1670);
            noFill();
            stroke('#33609c');
            rect(object[i].x - 1000, object[i].y - 1700, object[i].width - 400, object[i].height - 400);
        }
    }
}

function back()
{
    window.location = "index.html";
}