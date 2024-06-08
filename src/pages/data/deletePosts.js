const axios = require('axios');

/**
 * Delete all posts
 * in terminal -> node deletePosts.js
 */
async function deleteAllPosts() {
	try {
		const response = await axios.post('http://localhost:3000/deleteAllPosts');
		console.log(response.data);
	} catch (error) {
		console.log("Error deleting posts: ", error)
	}
}

deleteAllPosts();