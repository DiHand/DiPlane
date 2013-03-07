#pragma strict

import Leap;

public var avatar : GameObject;

private var controller : Controller;
private var lastFrame : Frame;

var scaleFactor : float = 0.2;

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
			avatar.transform.rotation = Quaternion.FromToRotation(Vector3.forward*-1, new Vector3(-palmDir.x, palmDir.y, palmDir.z));
		}
	}

	lastFrame = newFrame;
}