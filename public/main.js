const path = require('path');
const fs = require('fs');

// path to markDown directory
const pathToData = path.join(__dirname, '../src/pages/markdown');	
let postList = [];

const getPosts = () =>  {
	fs.readdir(pathToData, (error, files) => {

		console.log("There are currently " + files.length + " blog posts");
		if (error) return console.log("Error: (failed to list contents of directory) " + error);

		files.forEach((file, i) => {
			let obj = {};
			let post;
			fs.readFile(`${pathToData}/${file}`, 'utf8', (error, contents) => {

				if (error) return console.log("Error: (failed to read file) " + error);

				// Get the index of the metadata
				const getMetaDataIndices = (acc, element, i) => {
					if (/^---/.test(element)) {
						acc.push(i);
					} 
					return acc;
				}

				// Parse the metadata, store in object array
				const parseMetaData = (lines, metaDataIndices) => {	
					if (metaDataIndices.length > 0) {
						let metaData = lines.slice(metaDataIndices[0] + 1, metaDataIndices[1])
						metaData.forEach(line => {
							obj[line.split(": ")[0]] = line.split(": ")[1];
						})
						return obj;
					}
				}

				// Parse the content
				const parseContent = (lines, metaDataIndices) => {
					if (metaDataIndices.length > 0) {
						lines = lines.slice(metaDataIndices[1] + 1, lines.length);
					}
					return lines.join('\n');
				}

				const lines = contents.split('\n');
				const metaDataIndices = lines.reduce(getMetaDataIndices, []);
				const metaData = parseMetaData(lines, metaDataIndices);	
				const content = parseContent(lines, metaDataIndices);

				post = {
					id: metaData.id ? metaData.id : "No id",
					author: metaData.author ? metaData.author : "No author",
					date: metaData.date ? metaData.date: "No date",
					title: metaData.title ? metaData.title : "No title",
					imgURL: metaData.imgURL ? metaData.imgURL : "No image",
					category: metaData.category ? metaData.category : "No category",
					excerpt: metaData.excerpt ? metaData.excerpt : "No excerpt",
					content: content ? content: "No content given",
				}

				postList.push(post);

				if (i === files.length - 1) {
					console.log(postList);
					let data = JSON.stringify(postList, null, 2);
					fs.writeFile("src/pages/data/posts.json", data, (error) => {
						if (error) return console.log("Error: (failed to write to file) " + error);
						console.log("Data written to file");
					});
				}
			});
		});
		
	});
	return;
}

getPosts();
