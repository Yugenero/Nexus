const axios = require('axios'); // Note: Node.js import

/**
 * Import posts from posts.json
 * in terminal -> node importPosts.js 
 */
async function importPosts() {
	try {
		const response = await axios.post('http://localhost:3000/importPosts');
		console.log(response.data);
	} catch (error) {
		console.log('Error: ', error);
	}
}

importPosts();