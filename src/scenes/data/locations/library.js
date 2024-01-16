/* 
 * The park in the upper-left is a non-clickable, non-interactable area. 
 * Its x and y is just a waypoint that the player dot passes through.
 * 
 * I've made it do a little stuff below, just as an example...
 * 
 */
module.exports = {
	"id": "library",
	"x": 40, "y": 63,
	"x1": 40-30, "y1": 63-15,
	"x2": 40+25, "y2": 63+15,
	"image": "place_library_study",

	"buttons": function(scene,location) {
        return [
        {	
            "image": "btn-study",
            "onclick": function(scene,location) {
                if(scene.player.time>0) {
                    scene.subtract_time(8);
                    scene.player.intelligence += 7;
                    
                    
                }
            }
        }]
    }
}
