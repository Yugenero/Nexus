import React from "react"; 

/**
 * Posts array to hold blog post data
 * notes to self for tomrorrow: 
 * use markdown to write blog posts; vercel or netlify to host; mongo for some other shit
 */
const posts = [
	{
		id: 1, 
		imgUrl: "/images/CS_flow.jpeg",
		category: "Tech",
		title: "Lorem Ipsum",
		author: "Nelson E. Rodriguez",
		date: "APR 15, 2024",
		excerpt: "Lorem ipsum dolor sit amet...",
		body: "She nervously peered over the edge. She understood in her mind that the view was supposed to be beautiful, but all she felt was fear. There had always been something about heights that disturbed her, and now she could feel the full force of this unease. She reluctantly crept a little closer with the encouragement of her friends as the fear continued to build. She couldn't help but feel that something horrible was about to happen.",
	},
	{
		id: 2, 
		imgUrl: "/images/CS_flow.jpeg",
		category: "CS/Math/Engineering",
		title: "Lorem Ipsum",
		author: "Nelson E. Rodriguez",
		date: "APR 16, 2024",
		excerpt: "Lorem ipsum dolor sit amet...",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: 3, 
		imgUrl: "/images/CS_flow.jpeg",
		category: "CS/Math/Engineering",
		title: "Lorem Ipsum",
		author: "Nelson E. Rodriguez",
		date: "APR 16, 2024",
		excerpt: "Lorem ipsum dolor sit amet...",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: 4, 
		imgUrl: "/images/CS_AI.jpeg",
		category: "CS/Math/Engineering",
		title: "Be Selectively Ignorant, Become Broadly Knowledgeable",
		author: "Nelson E. Rodriguez",
		date: "APR 16, 2024",
		excerpt: "Lorem ipsum dolor sit amet...",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: 5, 
		imgUrl: "/images/CS_flow3.jpeg",
		category: "CS/Math/Engineering",
		title: "Anything Worth Having Takes Time To Build",
		author: "Nelson E. Rodriguez",
		date: "APR 16, 2024",
		excerpt: "Lorem ipsum dolor sit amet...",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
	{
		id: 6, 
		imgUrl: "/images/CS_flow.jpeg",
		category: "CS/Math/Engineering",
		title: "The Secret Value Of Big Tech blah blah blah",
		author: "Nelson E. Rodriguez",
		date: "APR 16, 2024",
		excerpt: "Lorem ipsum dolor sit amet...",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},{
		id: 7, 
		imgUrl: "/images/CS_flow2.jpeg",
		category: "CS/Math/Engineering",
		title: "Learn One Programming Language, Become a M",
		author: "Nelson E. Rodriguez",
		date: "APR 16, 2024",
		excerpt: "Lorem ipsum dolor sit amet...",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
	},
].map(post => ({
	...post,
	excerpt: post.body.substring(0, 79) + "...", 
	shortDate: post.date.substring(0, 6),
}));

export default posts;
