
/* The discount store (Z-mart) is a shop, whose main unique quality is that it 
 * has a large inventory of potential items to sell each week, from which it 
 * select 6 the first time the player visited it. It then stores those objects
 * in scene.player.turn_flags.zmart_items, so that they are persistent for that week.
 * 
 * In the original game, certain objects could break and require a repair bill, and
 * the discount items were more likely to do this than ones bought from Socket City.
 * I didn't implement the repair system, so none of the items below are any different
 * than the Socket City ones except for their price. Obviously that could be changed if
 * one wanted to implement the other system.
*/
module.exports = {
	"id": "ucc",
	"name": "UCC",
	"x": 144, "y":  35,
	"x1":131, "y1":  9,
	"x2":190, "y2": 44,
	"image": "place_ucc",
	"item_image_x": 0,
	"item_image_y": 57,
	"speech": {
		"image": "speech_bubble_r_t",
		"image_x": 14,
		"image_y": 24,
		"text_x": 55,
		"text_y": 41,
		"mouth": "nariman_jaw",
		"mouth_x": 142,
		"mouth_y": 33,		
	},
	"welcomes": [
		"Welcome to the UCC, a place for student activities. Would you like to make plans?",
	],
	"item_color": 0x0f4a37,
	"item_spacing": 13,
	"item_offset_x": 125,
	"item_offset_y": 25,
	"jobs": [
		{
			"name": "Clerk",
			"wage": 5,
			"experience": 10,
			"dependability": 10,
			"degrees": [],
			"uniform": "casual"
		}
	],
	"items": function(scene,location) {
		//this is the array of all possible items that could be sold each week.
		//note that these are standard item objects, more or less. 
		var z_items = [
						
			{
				"name": "Concert Tickets",
				"price": 40,
				"message": "Enjoy the show, man!",
				"use": function(scene,item) {
					if(typeof scene.player.turn_flags.ticket_bought !="undefined") {
						scene.player.turn_flags.ticket_bought = true;
						scene.player.happiness+=2
					}
					scene.inventory_add_item(item.name);
				}
			},
			{
				"name": "Theatre Tickets",
				"price": 30,
				"message": "Enjoy the show, man!",
				"use": function(scene,item) {
					if(typeof scene.player.turn_flags.ticket_bought !="undefined") {
						scene.player.turn_flags.ticket_bought = true;
						scene.player.happiness+=2
					}
					scene.inventory_add_item(item.name);
				}
			},
			{
				"name": "Baseball Tickets",
				"price": 45,
				"message": "Enjoy the game, man!",
				"use": function(scene,item) {
					if(typeof scene.player.turn_flags.ticket_bought !="undefined") {
						scene.player.turn_flags.ticket_bought = true;
						scene.player.happiness+=2
					}
					scene.inventory_add_item(item.name);
				}
			},	
			
		]

		//if we haven't created the item list for this week, create it
		if(typeof scene.player.turn_flags.zmart_items == "undefined") {
			//simple way to shuffle an array of items
			var shuffled = z_items
				.map(value => ({ value, sort: Math.random() }))
				.sort((a, b) => a.sort - b.sort)
				.map(({ value }) => value)
			//pick the first 6 and store them
			scene.player.turn_flags.zmart_items = [];
			for(var i = 0; i<6; i++) {
				//depending on the order, we set the x and y flags to make them
				//display in the right place
				if(i<2) {
					var z = {x: 74}
				} else if(i==2) {
					var z = {x: 74,y:2}
				} else {
					var z = {x: 74}
				}
				scene.player.turn_flags.zmart_items.push({...z,...shuffled[i]});
			}
		}
		return scene.player.turn_flags.zmart_items;
	}
}