#pragma strict

var camTarget : GameObject;

function Start () {

}

function Update () {
	transform.position = camTarget.transform.position;
}