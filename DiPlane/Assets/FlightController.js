#pragma strict

public var speed : float;

function Start () {

}

function Update () {
	rigidbody.velocity = Vector3.forward * speed;
}