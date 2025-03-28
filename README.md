# MC Cardz
**created by Aisha & Robert as the project for the college course "Application Integration & Security" at the Vorarlberg University of Applied Sciences in Austria**

## About the Project
<p> MC Cardz is an AI-powered learning platform designed to enhance multiple-choice quizzes by automatically generating three plausible incorrect answers alongside the correct one. 
  The goal is to create a more effective and engaging study experience by leveraging artificial intelligence to craft challenging and realistic answer choices. </p>

### Features
<ul>
  <li> AI-Generated Answer Options → Automatically generates three false answers for every question. </li>
  <li> Customizable Quizzes → Users can create & modify their topics. </li>
  <li> Quiz-Mode → Practice questions or test your knowledge in quiz mode. </li>
  <li> Secure & Scalable Architecture → Built with modern web technologies. </li>
</ul>

### Tools & Frameworks
<ul>
  <li> <b> Frontend</b>: TypeScript, React, Bootstrap </li>
  <li> <b> Backend</b>: ASP.NET, Entity Framework Core, SignalR </li>
  <li> <b> Database</b>: MySQL </li>
  <li> <b> AI Integration</b>: Gemini </li>
</ul>

### Dependencies
<ul>
  <li> Infrastructure </li>
  <li> Domain </li>
  <li> ... </li>
</ul>

## Running the project

### Run migrations

`cd src/McCardz.Infrastructure` <br>
`dotnet ef database update -s ../McCardz.API`
