img = "";
statuss = "";
object = [];

function preload(){
    img = loadImage("3.jpg");
}
function setup(){
    canvas = createCanvas(650, 500);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "How many images are in the photo compared to how many are detected?";
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
            document.getElementById("status").innerHTML = "There is 2 big objects in the image and the cocossd model has detected 1 object";

            fill('#000000');
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x - 430 , object[i].y - 430);
            noFill();
            stroke('#33609c');
            rect(object[i].x - 440, object[i].y - 540, object[i].width - 1500, object[i].height - 300);
        }
    }
}

function back()
{
    window.location = "index.html";
}