#pragma strict

var customSkin : GUISkin;
var scorer : RingCollector;

function OnGUI(){
   GUI.skin = customSkin;
   GUI.Label (Rect (25, 25, 5000, 100), "Score: "+scorer.ringPoints);
}