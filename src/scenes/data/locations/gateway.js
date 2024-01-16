
/* 
 * The Factory is a place that offers jobs and nothing else. I have not implemented it here yet.
 */
module.exports = {
	"id": "gateway",
	"name": "Gateway",
	"x":  49, "y": 181,
	"x1":  8, "y1": 156,
	"x2": 67, "y2": 193,
	"image": "place_gateway",
	"buttons": function(scene,location) {
		return [
		{	
			"image": "btn-study",
			"onclick": function(scene,location) {
				if(scene.player.time>0) {
					scene.subtract_time(8);
					scene.player.intelligence +=6;
					scene.player.happiness += 5;
					
				}
			}
		}]
	}
}
	
