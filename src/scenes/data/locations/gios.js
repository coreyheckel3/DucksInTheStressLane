
/* 
 * The fast food restaurant (and only restaurant in the original game).
 * 
 * It is not that remarkable as a location, and as such is probably a good place to start when 
 * thinking about how the locations objects work. It has several possible welcome messages, 
 * and it has several possible jobs the player can have.
 *
 * When the player buys food, it sets various properties, like the "ate" flag and sometimes
 * the happiness flag. You could imagine having other flags, like health or something like that,
 * which might be affected if you ate a week's worth of french fries.
 * 
 */
module.exports = {
			"id": "gios",
			"name": "Giovannis",
			
			"x":  97, "y": 183,
			"x1": 69, "y1": 156,
			"x2":128, "y2": 193,
			"image": "place_gios",
			"item_image_x": 0,
			"item_image_y": 57,
			"speech": {
				"image": "speech_bubble_r_t",
				"image_x": 14,
				"image_y": 26,
				"text_x": 55,
				"text_y": 41,
				"mouth": "nariman_jaw",
				"mouth_x": 142,
				"mouth_y": 33,		
			},
			"welcomes": [
				"Welcome to Gios, can I get you something?",
				"Welcome to Giovannis, what can I get for you?",
				
			],
			"item_color": 0x652327,
			"item_hover": 0xb00036,
			"item_spacing": 13,
			"jobs": [
				{
					"name": "Cook",
					"wage": 5,
					"experience": 0,
					"dependability": 10,
					"degrees": [],
					
				}
			],
			"items": [
				{
					"name": "Pizza Slice",
					"image": "item_burger",
					"x": 5,
					"price": 45,
					"use": function(scene) {
						scene.player.happiness+=1;
						scene.player.ate = true;
					},
					"message": "Here's your pizza"
				},
				{
					"name": "Chicken Parm",
					"image": "item_cheeseburger",
					"price": 80,
					"use": function(scene) {
						scene.player.ate = true;
						scene.player.happiness+=4;
					},
					"message": "Here's your meal"
				},
				{
					"name": "Pasta",
					"image": "item_chicken",
					"price": 45,
					"x": 70,
					"use": function(scene,item) {
						scene.player.ate = true;
						scene.player.happiness+=2;
					},
					"message": "Here ya go"
				},
				{
					"name": "Pizza Pie",
					"image": "item_fries",
					"price": 70,
					"use": function(scene,item) {
						scene.player.ate = true;
						scene.player.happiness+=4;
					},
					"message": "That'll fill you up"
				},
				{
					"name": "Soda",
					"image": "item_shake",
					"price": 10,
					"use": function(scene,item) {
						scene.player.happiness+=2;
					},
					"message": "That wont do you any good"
				},
				
			]
		}