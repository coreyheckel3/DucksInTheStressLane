/* 
 * This is the default player settings, which initializes the game and sets up
 * its variables. You can change these for debugging purposes.
 */

module.exports = { 
		"image": "attila_casual", //current player image texture
		"outfits": { //outfits -- need to be in order of least to most formal
			"naked": "attila_naked",
			"casual": "attila_casual",
			"dress": "attila_dress",
			"business": "attila_business"
		},
		"background_color": 0xdac6e2, //background color for player image
		"icon": "dot-red", //player icon on board texture
		"location": "dorm", //where they are right now, or where they start
		"home": { //info about their home
			"location": "dorm", //where they live
		},
		"job": { //info about their job
			"location":  "", //id of where the work -- blank if unemployed
			"name": "", //job title
			"wage": 1, //pay per hour
			"uniform": "", //uniform requirement
			"dependability": 0, //dependability requirement			
			"experience": 0, //used to calculate max experience attained
		},
		"money": 200, //money in hand
		"bank_money": 0, //money in bank
		"ate": false, //did they eat yet this week
		"starving": false, //did they not eat last week
		"clothes": "casual", //type of clothes worn
		"inventory": [], //holds any items purchased
		"happiness": 0, //happiness meter
		"stress" : 0,
		"intelligence" :0,
		"degrees": [], //list of degrees obtained
		"visited": [], //list of places visited this week
		"enrolled": [], //list of degrees enrolled, and progress
		"dependability": 20, //working increases dependability, not working decreased it
		"experience": 10, //increases with working
		"relaxation": 10, //how relaxed the player is
		"credits": 0,
		"goals": { //goals to win the game
			"wealth": 50,
			"happiness": 50,
			"education": 50,
			"career": 50,
			"credits": 120
		},
		"turn_flags": {}, //this is cleared every turn
		"travel_path": [], //list of ids they are traveling to
		"time": 60, //how many hours left in the week for player
		"hours_per_week": 60, //how many hours the player has per week maximum (time gets reset to this every week)
		"modal": false, //whether we ignore clicks to travel, buttons, etc.
	}
