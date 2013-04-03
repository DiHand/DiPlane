#pragma strict

public var speed : float;
public var horizSpeed : float;
public var speedRange : float[];

function Start () {

}

function Update () {
	rigidbody.velocity = Vector3.forward * speed;// + new Vector3(2*horizSpeed,0,0);
}

function FixedUpdate () {
	//rigidbody.AddForce(new Vector3(horizSpeed,speed,0));
}