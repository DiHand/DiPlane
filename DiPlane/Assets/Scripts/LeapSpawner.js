#pragma strict

//4.488155 130.633 -52.75388

import Leap;

public var avatar : GameObject;

private var controller : Controller;
private var lastFrame : Frame;

var scaleFactor : float = 0.2;
var orienter : Vector3;

private var palmVector : Vector3;
private var handVector : Vector3;
private var crossVector : Vector3;

function Start () {
	controller = new Controller();
	lastFrame = null;
}

function Update () {
	var newFrame : Frame = controller.Frame();
	var pointableControllers;
	
	if (lastFrame != null) {
		for (var h : Hand in newFrame.Hands) {
			var palmDir = h.PalmNormal;			
			var handDir = h.Direction;
			palmVector = new Vector3(palmDir.x, palmDir.y, 0);//new Vector3(-palmDir.x, palmDir.y, palmDir.z);
			handVector = new Vector3(handDir.x, handDir.y, -handDir.z).normalized;//new Vector3(-palmDir.x, palmDir.y, palmDir.z);
			var handVectorYZ = new Vector3(0, handDir.y, handDir.z).normalized;//new Vector3(-palmDir.x, palmDir.y, palmDir.z);
			var handVectorXZ = new Vector3(handDir.x, 0, -handDir.z)*10;
			var palmVectorXY = new Vector3(palmDir.x, palmDir.y, 0).normalized;
			crossVector = Vector3.Cross(palmVector, handVector);
			var sideAngle : float = Vector3.Angle(palmVector, Vector3.up*1.0);
			
			// Kind of works (without left/right)
			avatar.transform.rotation = Quaternion.LookRotation(Vector3.forward, palmVectorXY) * // Tilt sideways
										Quaternion.FromToRotation(Vector3.forward, Vector3.up * -1) *
										Quaternion.LookRotation(Vector3.right, handVectorYZ) * // Up/down
										Quaternion.FromToRotation(Vector3.up, Vector3.forward * -1) *
										Quaternion.FromToRotation(Vector3.up, Vector3.right * -1);

			//avatar.transform.rotation = Quaternion.LookRotation(Vector3.up, Vector3.forward) *
			//							Quaternion.LookRotation(Vector3.forward, palmVectorXY); // Tilt sideways
										//Quaternion.FromToRotation(Vector3.forward, Vector3.up * -1) *
										//Quaternion.LookRotation(Vector3.right, handVectorYZ) * // Up/down
										//Quaternion.FromToRotation(Vector3.up, Vector3.forward * -1) *
										//Quaternion.FromToRotation(Vector3.up, Vector3.right * -1);

										//Quaternion.FromToRotation( Vector3.right * -1, handVectorXZ);// * // Left/Right
										//Quaternion.FromToRotation(Vector3.up * -1, Vector3.forward * -1);
										
										//Quaternion.LookRotation(Vector3.up, handVectorXZ);
										//Quaternion.LookRotation(Vector3.right, handVectorYZ) *
										//Quaternion.LookRotation(Vector3.forward, palmVectorXY);
										//yaw roll pitch
										//Quaternion.LookRotation(Vector3.right, handVectorYZ); // Y - Z axis

			transform.position.x = h.PalmPosition.x;
			transform.position.y = h.PalmPosition.y - 130;
		}
	}



	lastFrame = newFrame;
}

function OnDrawGizmos() {
	Gizmos.color = Color.red;
	Gizmos.DrawLine(transform.position, transform.position + palmVector*100);
	Gizmos.color = Color.green;
	Gizmos.DrawLine(transform.position, transform.position + handVector*100);
	Gizmos.color = Color.white;
	Gizmos.DrawLine(transform.position, transform.position + crossVector*100);
}
