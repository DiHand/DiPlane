#pragma strict

var camMarker : GameObject;
var camTarget : GameObject;

function Start () {

}

function Update () {
	transform.position = camMarker.transform.position;
	transform.LookAt(camTarget.transform);
}