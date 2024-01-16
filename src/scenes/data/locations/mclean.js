module.exports = {
	"id": "mclean",
	"name": "McLean Labs",
	"x":  45, "y": 105,
	"x1": 8, "y1": 83,
	"x2": 67, "y2": 119,
	"image": "place_university",
	"item_image_x": 0,
	"item_image_y": 57,
	"speech": {
		"image": "speech_bubble_l_t",
		"image_x": 49,
		"image_y": 20,
		"text_x": 71,
		"text_y": 41,
		"mouth": "nariman_jaw",
		"mouth_x": 28,
		"mouth_y": 36,
	},
	"jobs": [
		{
			"name": "Lab Assistant",
			"wage": 5,
			"experience": 10,
			"dependability": 10,
			"degrees": ["L1"],
		
		},
		
	],
	"welcomes": [
		"Welcome to Innovation Institute, where innovation was invented!",
		"Welcome to Innovation Institute, where the Innovation Burger was invented!",
		"Welcome to Innovation Institute! Inspired by innovation, powered by money!",
		"Welcome to Innovation Institute! Will you be paying with cash or credit?",
		"Welcome to Innovation Institute! Nevermind your grades, how high is your credit score?",
	],
	"degrees": [ //this has no intrinsic meaning, but is used by items functions below
		{name:"L1", longname:"Lab 1", requires:false, credits: 4},
		{name:"L2", longname:"Lab 2", requires: "L1", credits: 4},
		{name:"L3", longname:"Lab 3",requires:"L2", credits: 4},
		{name:"L4", longname:"Lab 4",requires:"L3", credits: 4},
		{name:"L5",longname:"Lab 5", requires:"L4", credits: 4},
		
		
	],
	"items": function(scene,location) {
		//create the degree list -- heavily customized from default behavior!
		var degrees = location.degrees;
		var items = [];

		//textures of book image
		var book_imgs = ["book_green","book_blue","book_red","book_gray"];
		var cur_book = 0;

		//for each degree
		for(var i in degrees) {
			var degree = degrees[i];
			if(
				//check if the degree should be displayed 
				((degree.requires == false) || 
				scene.player.degrees.includes(degree.requires)) &&
				(!scene.player.degrees.includes(degree.name))
			) {	
				//if it is to be displayed, make a container with the book image and text
				var book = new Phaser.GameObjects.Container(scene,0,0);
				var book_graphic = new Phaser.GameObjects.Image(scene,0,0,book_imgs[cur_book]).setOrigin(0,0).setDepth(10)
				book.add(book_graphic);
				book.degreeName = new Phaser.GameObjects.BitmapText(scene,2,9,"chunky",degree.name).setOrigin(0).setDepth(100)
				book.add(book.degreeName);
				var enrolled = scene.player.enrolled.map(function(e) { return e.name; }).indexOf(degree.name);
				if(enrolled>-1) {
					if(scene.player.enrolled[enrolled].remaining<10) {
						book.degreeRemaining = new Phaser.GameObjects.BitmapText(scene,81,9,"chunky",scene.player.enrolled[enrolled].remaining).setOrigin(0).setDepth(100);
						book.add(book.degreeRemaining)
					}
				}	
				book.width = book_graphic.width;
				book.height = book_graphic.height;
				//then push this container to the item list
				items.push({
					"name": degree.name,
					"object": book,
					"hitbox": function(scene,item,location) {	
						//setting a custom hitbox based on the book graphic locations
						//item._item_y is set dynamically after the y position is calculated
						return {"x":70,"y":item._item_y,"width":book_graphic.width,"height":book_graphic.height,"originX":0,"originY":0}
					},
					"x": 70,
					"hover": function(hover,obj) {
						obj.degreeName.setTintFill(hover?0xf0f0f0:0x000000);
						if(typeof obj.degreeRemaining!="undefined") obj.degreeRemaining.setTintFill(hover?0xf0f0f0:0x000000);
					},
					"use": function(scene,item,location) {
						//called if they click on this item
						var enrolled = scene.player.enrolled.map(function(e) { return e.name; }).indexOf(item.name);
						var degree = location.degrees[location.degrees.map(function(e) { return e.name; }).indexOf(item.name)];
						//if they are enrolled, continue their progress
						if(enrolled>-1) {
							if(scene.player.time>=1) {
								var remaining = scene.player.enrolled[enrolled].remaining;
								remaining--;
                                scene.player.stress +=5;
                                scene.player.happiness -=5;
								scene.subtract_time(10);
								if(remaining==0) {
									scene.player.enrolled.splice(enrolled,1);
									scene.player.degrees.push(degree.name);
									scene.player.dependability+=5;
                                    
                                    scene.player.credits += 4;
									//diploma message
									scene.show_message({
										fade_in: true,
										fade_delay: 800,
										message: degree.longname,
										font: "chunky",
										text_y: 75,
										text_x: 90,
										image: "message_degree",
										image_x: 0,
										image_y: 0,
										close_by_clicking: false,
										args: location,
										callback: function(scene,location) {
											console.log(location);
											scene.show_location(location.id,false);		
										}
									});
								} else {
									scene.player.enrolled[enrolled].remaining = remaining;
									scene.show_location(location.id,false);		
								}
							} else {
								scene.show_message({...location.speech,...{
									message: "There is not enough time to study."
								}});
							}
						} else { //if not enrolled, see if they can enroll
							if(scene.inventory_has_item("Enrollment receipt")) {
								if(scene.player.time>=1) {
									scene.inventory_remove_item("Enrollment receipt");
									scene.player.enrolled.push({"name":degree.name,"remaining":9});

									scene.subtract_time(6);
									scene.show_location(location.id,false);		
								} else {
									scene.show_message({...location.speech,...{
										message: "There is not enough time to study."
									}})
								}
							} else {
								scene.show_message({...location.speech,...{
									message: "You are not enrolled in this course."
								}});
							}
						}
					}
				})
				cur_book++; //advances colors of books
				if(cur_book>=book_imgs.length) cur_book = 0;
			}
		}
		//now return the item list (phew)
		return items;
	},
	"item_spacing": -13, //make them list from bottom to top
	"item_offset_y": 54,
	"buttons": [
		{	//ENROLL button
			"image": "btn-enroll",
			"onclick": function(scene,location) {
				//process "Enrollment receipt" purchase if possible
				if(scene.inventory_has_item("Enrollment receipt")) {
					scene.show_message({...location.speech,...{
						message: "You are already enrolling, pick the class to enroll in."
					}});
					return false;
				}
				var fee = Math.round(50,scene.gamestate.economy); //enrollment base fee is $50
				scene.show_message({...location.speech,...{
					message: "The enrollment fee is $"+fee+". Would you like to enroll?\n ",
					choices: [
					{ option:"Yes", 
						onclick: function(scene) {
							if(scene.player.money<fee) {
								scene.show_message({...location.speech,...{
									message: "You don't have enough money for the fee."
								}});
							} else {
								scene.inventory_add_item("Enrollment receipt");
								scene.player.money-=fee;
								scene.update_money();
							}
						}
					},
					{ option:"No" }
				]
				}});
			}
		}
	],			
}

	