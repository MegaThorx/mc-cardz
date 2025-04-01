# MC Cardz
**created by Aisha & Robert as the project for the college course "Application Integration & Security" at the Vorarlberg University of Applied Sciences in Austria**

## About the Project
<p> MC Cardz is an AI-powered learning platform designed to enhance multiple-choice quizzes by automatically generating plausible incorrect answers alongside the correct one(s). 
  The goal is to create a more effective and engaging study experience by leveraging artificial intelligence to craft challenging and realistic answer choices. </p>

### Features
<ul>
  <li> AI-Generated Answer Options → Automatically generates false answers for every question. </li>
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

## Running the Project

### Run Migrations

`cd src/McCardz.Infrastructure` <br>
`dotnet ef database update -s ../McCardz.API`

### Run the Frontend Project

`cd src/McCardz.Web/ClientApp` <br>
`npm install` <br>
`npm run dev`

### Run the Backend Project

`dotnet run --project src/McCardz.API`

## Other Resources

| Source                                                                                                                                                           | Reason                          |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------|
| [Asp React Project Templates](https://www.nuget.org/packages/Asp.React.Project.Templates)                                                                        | McCardz.Web project structure   |
| [Handling JWT Access and Refresh Token using Axios in React App](https://blog.theashishmaurya.me/handling-jwt-access-and-refresh-token-using-axios-in-react-app) | Integration of Axios with JWT   |
| [Pub/Sub Pattern in React](https://medium.com/@nouraldin.alsweirki/pub-sub-pattern-in-react-example-c5bbd08fa02f)                                                | Pub/Sub for SignalR integration |



