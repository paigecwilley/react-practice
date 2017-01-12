var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var param = "?client_id" + id + "&client_secret=" + sec;

function getUserInfo(username){
	return axios.get('https://api.github.com/users/' + username + param);
}

var helpers = {
	getPlayersInfo: function(players) {
		//takes in array of promises, when promises resolve, the then function runs
		//map allows to loop over array and create a new array with each item looped over in the array
		return axios.all(players.map(function(username){
			return getUserInfo(username) //this is the promise
		})).then(function(info){
			return info.map(function(user){
					return user.data; //modifying promise data a little bit
			})
		}).catch(function(err){
			console.warm('Error in getPlayersInfo', err)
		})
	}
};

module.exports = helpers;

