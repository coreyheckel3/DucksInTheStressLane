
/* 
 * The park in the lower-right is a non-clickable, non-interactable area. 
 * Its x and y is just a waypoint that the player dot passes through.
 */
module.exports = {
	"id": "park_lower_right",
	"x": 299, "y": 136,
    "x1":252, "y1": 122,
	"x2":312, "y2": 153,
    "image": function(scene,location) { //this is one of the rare places where the image depends on the circumstances
		return "place_piera";
},
	"buttons": function(scene,location) {
			return [
			{	
				"image": "btn-relax",
				"onclick": function(scene,location) {
					if(scene.player.time>0) {
						scene.subtract_time(6);
						scene.player.stress -=5;
						scene.player.happiness += 5;
						
					}
				}
			}]
		}
	
}