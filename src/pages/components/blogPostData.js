import React from "react"; 

/**
 * Posts array to hold blog post data
 */
const posts = [
	{
		id: 1, 
		imgUrl: "/images/CS_flow.jpeg",
		category: "Tech",
		title: "Lorem Ipsum",
		author: "Nelson Rodriguez",
		date: "APR 15, 2024",
		excerpt: "Lorem ipsum dolor sit amet...",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: 2, 
		imgUrl: "/images/CS_flow.jpeg",
		category: "CS/Math/Engineering",
		title: "Lorem Ipsum",
		author: "Nelson Rodriguez",
		date: "APR 16, 2024",
		excerpt: "Lorem ipsum dolor sit amet...",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: 2, 
		imgUrl: "/images/CS_flow.jpeg",
		category: "CS/Math/Engineering",
		title: "Lorem Ipsum",
		author: "Nelson Rodriguez",
		date: "APR 16, 2024",
		excerpt: "Lorem ipsum dolor sit amet...",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: 2, 
		imgUrl: "/images/CS_flow.jpeg",
		category: "CS/Math/Engineering",
		title: "Lorem Ipsum",
		author: "Nelson Rodriguez",
		date: "APR 16, 2024",
		excerpt: "Lorem ipsum dolor sit amet...",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: 2, 
		imgUrl: "/images/CS_flow.jpeg",
		category: "CS/Math/Engineering",
		title: "Lorem Ipsum",
		author: "Nelson Rodriguez",
		date: "APR 16, 2024",
		excerpt: "Lorem ipsum dolor sit amet...",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: 2, 
		imgUrl: "/images/CS_flow.jpeg",
		category: "CS/Math/Engineering",
		title: "Lorem Ipsum",
		author: "Nelson Rodriguez",
		date: "APR 16, 2024",
		excerpt: "Lorem ipsum dolor sit amet...",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
].map(post => ({
	...post,
	excerpt: post.body.substring(0, 80) + "...", 
}));

export default posts;
