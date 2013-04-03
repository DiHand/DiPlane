#pragma strict

public var speed : float;
public var speedRange : float[];

function Start () {

}

function Update () {
	rigidbody.velocity = Vector3.forward * speed;
}