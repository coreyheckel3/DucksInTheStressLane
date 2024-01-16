
    module.exports = {
        "id": "path_station",
        "x": 220, "y": 180,
	    "x1":190, "y1": 156,
	    "x2":251, "y2": 193,
        "image": "place_path",
        "buttons": function(scene,location) {
			return [
			{	
				"image": "btn-travel",
				"onclick": function(scene,location) {
					if(scene.player.time>0) {
						scene.subtract_time(Phaser.Math.Between(6,40));
						scene.player.happiness +=15;
						var city_cost = 0;
						if(scene.player.money>=500) {
							city_cost = Phaser.Math.Between(30,200);
						} else if(scene.player.money>=50) {
							city_cost = Phaser.Math.Between(30,50);
						} else if(scene.player.money>=31) {
							city_cost = Phaser.Math.Between(30,scene.player.money);
						} else {
							city_cost = scene.player.money;
						} 
                        scene.player.money -= city_cost;
						scene.show_money();
						
					}
				}
			}]
		}
	}
    
    
    