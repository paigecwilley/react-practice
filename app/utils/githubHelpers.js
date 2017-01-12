var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";

function getUserInfo(username){
	//axios.get takes in an array of promises, when each is resolved, then runs function
	return axios.get('https://api.github.com/users/' + username + param)
}

var helpers = {
	getPlayersInfo: function(players) {
		//fetch some data from github
		return axios.all(players.map(function(username){
			return getUserInfo(username)
		})).then(function(info){

		})
	}
};

module.exports = helpers;

