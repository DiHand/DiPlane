#pragma strict

public var speed : float;
public var horizSpeed : float;
public var lrRot : float;
public var speedRange : float[];

function Start () {

}

function Update () {
	rigidbody.velocity = transform.up * speed; // + new Vector3(2*horizSpeed,0,0);
}

function FixedUpdate () {
	//rigidbody.AddTorque(0, lrRot*100, 0);
	//rigidbody.AddForce(new Vector3(horizSpeed,speed,0));
}