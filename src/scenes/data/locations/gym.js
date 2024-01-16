
module.exports = {
	"id": "gym",
	"x": 288, "y":  75,
	"x1":252, "y1": 45,
	"x2":312, "y2": 82,
	"image": function(scene,location) { //this is one of the rare places where the image depends on the circumstances
		return "place_gym";
},
	"buttons": function(scene,location) {
			return [
			{	
				"image": "btn-lift",
				"onclick": function(scene,location) {
					if(scene.player.time>0) {
						scene.subtract_time(6);
						scene.player.stress -=5;
						scene.player.ate = false;
						
					}
				}
			}]
		}
	}

