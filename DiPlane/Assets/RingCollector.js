#pragma strict

var ringPoints : float;
var ringCollectorTip : GameObject;

var RING_SIZE : float;
var MIN_POINTS : float;
var MAX_POINTS : float;

var logSt : Vector3;
var logEd : Vector3;

function Start () {
	ringPoints = 0.0;
	RING_SIZE = 16.86/2.0;
	MIN_POINTS = 10;
	MAX_POINTS = ((100-MIN_POINTS)/Gaussian(0))-MIN_POINTS;
}

function Update () {

}

function Gaussian (dist_from_center : float) {
	var std_dev: float = RING_SIZE/3.0;
	var variance: float = std_dev*std_dev;
	var numerator = (Mathf.Exp(-(Mathf.Pow(dist_from_center, 2))/(2*variance)));
	var denom = Mathf.Sqrt(2*Mathf.PI) * std_dev;
	return numerator/denom;
}

function OnTriggerEnter (collider : Collider) {
    /*for (var contact : ContactPoint in collision.contacts) {
        print(contact.thisCollider.name + " hit " + contact.otherCollider.name);
        // Visualize the contact point
        Debug.DrawRay(contact.point, contact.normal, Color.white);
    }*/
	//ringPoints += (other.gameObject.transform.position - transform.position).magnitude;
    //Destroy(other.gameObject);
    //Debug.Log("OFF");
	var closestPoint : Vector3 = collider.ClosestPointOnBounds(ringCollectorTip.transform.position);
	logSt = closestPoint;
	logEd = collider.transform.position;
	
	var dist_from_center = (closestPoint - collider.transform.position).magnitude;
	dist_from_center = (new Vector2(closestPoint.x,closestPoint.y) - 
		new Vector2(collider.transform.position.x, collider.transform.position.y)).magnitude;
	
    //if (dist_from_center < RING_SIZE) {
    	//ringPoints += RING_SIZE - dist_from_center;

    	ringPoints += Gaussian(dist_from_center)*MAX_POINTS+MIN_POINTS;
    	Debug.Log(Gaussian(dist_from_center)*MAX_POINTS+MIN_POINTS);
    //}
}

function OnDrawGizmos () {
        // Draws a blue line from this transform to the target
        Gizmos.color = Color.blue;
        Gizmos.DrawLine (logSt, logEd);
}