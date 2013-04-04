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

private var cumulativeLRRot : float;

var lrRotInfluence : float;
var lrRotDamping : float;
var lrPosDamping : float;


private var flightController : FlightController;

function Start () {
	flightController = gameObject.GetComponent(FlightController) as FlightController;
	controller = new Controller();
	lastFrame = null;
}

function Update () {
	var newFrame : Frame = controller.Frame();
	var pointableControllers;
	
	if (lastFrame != null) {
		for (var h : Hand in newFrame.Hands) {
			// Get Data from the Leap. Ignore it for the most part.
			var palmDir = h.PalmNormal;			
			var handDir = h.Direction;
			palmVector = new Vector3(palmDir.x, palmDir.y, 0);
			handVector = new Vector3(handDir.x, handDir.y, -handDir.z).normalized;
			var handVectorYZ = new Vector3(0, handDir.y, -handDir.z).normalized;
			var handVectorXZ = new Vector3(handDir.x, 0, -handDir.z)*10;
			var palmVectorXY = new Vector3(palmDir.x, palmDir.y, 0).normalized;
			crossVector = Vector3.Cross(palmVector, handVector);
			var sideAngle : float = Vector3.Angle(palmVector, Vector3.up*1.0);
			// End Get Data from the Leap.
			
			/*avatar.transform.rotation = Quaternion.AngleAxis(Mathf.Atan2(-handVector.x, handVector.z)*180/Mathf.PI, -Vector3.up)
									*   Quaternion.LookRotation(-Vector3.up, Vector3.forward)
									*	Quaternion.AngleAxis(Mathf.Atan2(crossVector.y, -crossVector.x)*180/Mathf.PI, -Vector3.up)
									*	Quaternion.AngleAxis(Mathf.Atan2(handVector.y, handVector.z)*180/Mathf.PI, Vector3.left);*/


			var sYaw : float = Mathf.Atan2(-handVector.x, handVector.z)*180/Mathf.PI;
			var sRoll : float = Mathf.Atan2(crossVector.y, -crossVector.x)*180/Mathf.PI;
			var sPitch : float = Mathf.Atan2(handVector.y, handVector.z)*180/Mathf.PI*3;

			avatar.transform.rotation = Quaternion.AngleAxis(cumulativeLRRot, -Vector3.up) // Left/Right rotation (Yaw)
									*   Quaternion.LookRotation(-Vector3.up, Vector3.forward) // Orient ship correclty
									*	Quaternion.AngleAxis(sRoll, -Vector3.up) // Roll
									*	Quaternion.AngleAxis(sPitch, Vector3.left); // Pitch (up/down)

			//Debug.Log(sYaw);
			//Debug.Log(sRoll);
			//Debug.Log(sPitch);

			//Debug.Log(h.PalmPosition.x);
			//flightController.horizSpeed = Mathf.Lerp(-flightController.speedRange[1], flightController.speedRange[1], ((Mathf.Clamp(h.PalmPosition.x, -100.0, 100.0)+100.0)/200.0));

			//transform.position.x = h.PalmPosition.x*scaleFactor*scaleFactor;
			//transform.position.x = transform.position.x + h.PalmPosition.x;
			//transform.Translate(h.PalmPosition.x*lrPosDamping,0,0);
			
			// Move Up and Down Directly
			//transform.position.y = (h.PalmPosition.y*scaleFactor - 130);

			// Control Speed by moving hand forward and back
			var temp : float = Mathf.Lerp(flightController.speedRange[0], // Min speed
				                          flightController.speedRange[1], // Max Speed
				                          1.0 - ((Mathf.Clamp(h.PalmPosition.z, -100.0, 100.0)+100.0)/200.0));
			flightController.speed = temp;
			//

			cumulativeLRRot += sYaw*lrRotInfluence; //lrRotInfluence;//(sYaw*lrRotInfluence)*Mathf.Abs(sYaw*lrRotInfluence);

			flightController.lrRot = cumulativeLRRot;

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
	Gizmos.color = Color.blue;
	Gizmos.DrawLine(transform.position, transform.position + transform.forward*100);
}
