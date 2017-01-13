var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var param = "?client_id" + id + "&client_secret=" + sec;

function getUserInfo(username){
	return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos(username){
	//fetch username repo with github api
	return axios.get('https://api.github.com/users/' + username +'/repos' + param + '&per_page=100');
}

function getTotalStars(repos){
	//calculate all the stars a user has
	return repos.data.reduce(function(prev, current){
		return prev + current.stargazers_count
	}, 0)
}

function getPlayersData(player){
	return getRepos(player.login)
		.then(getTotalStars)
		.then(function(totalStars){
			return {
				followers: player.followers,
				totalStars: totalStars
			}
		})

}

function calculateScores(players){
	//return array after algorithm to determine a winner
	return [
			players[0].followers * 3 + players[0].totalStars,
			players[1].followers * 3 + players[1].totalStars,
	]
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
			console.warn('Error in getPlayersInfo', err)
		})
	},
	battle: function(players){
		var playerOneData = getPlayersData(players[0]);
		var playerTwoData = getPlayersData(players[1]);

		return axios.all([playerOneData, playerTwoData])
			.then(calculateScores)
			.catch(function(err) {console.warn('Error in getPlayersInfo: ', err)})
	}
};

module.exports = helpers;

