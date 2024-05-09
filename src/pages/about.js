import React from "react";
import './styles/about.css';

function About() {
	return (
		<div className="main_container">
			<div className="about_container">
				<h1 className="what_is_nexus"> What is 
					<span id="nexus"> Nexus </span></h1>

				<p className="about_text"> 
					I'm Nelson Rodriguez and I'm a recent CS graduate from 
					Georgia Tech. I created this blog for my pursuit of writing and 
					affection for Software, Technology, and Lifestyle. This blog serves as a canvas for my
					reflections, opinions, and personal musing, offering a platform to
					articulate thoughts that often evade expression in my day-to-day life. 
					The name Nexus represents the intersection of my interests and the
					connections I aim to foster in my life and work.
					<br/><br/>
					This space primarily encapsulates my own perspectives and experiences, and is, 
					in no way, a definitive resource on any of the topics I discuss. Instead, I aim 
					to be able to provide a novel perspective and value to those who engage with my content!
					<br/><br/>
					Opinions are my own.
					<br/><br/>
					Thanks for stopping by! 
					<br/><br/>
					Nelson
				</p>
			</div>
		</div>
	);
}

export default About;