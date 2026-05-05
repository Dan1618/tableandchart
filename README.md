#### Reactjs app displaying data about air pollution indicators in chart and table
tech stack: ReactJS, TypeScript, MUI components, JSS, ExpressJS

#### Installation backend
`npm install`
`npm start`

#### Installation frontend
`npm install`
`npm run dev`

go to `http://localhost:5173/`

#### UI:
- pick country and year from selects, chart and table should display
- table is filterable and sortable
- clicking on city in table will navigate to page with its notes

#### Comments on solution
- Using Redux instead of useContext could be a good idea if we assume that the application will grow so it would be more convenient to preserve different kind of state between routing. At this stage adding a state management library would come with some disadvantages like more boilerplate code or another dependency in the app.
- Minor improvements could be done:
	- Sorting rows in the chart when sorting table
	- Notes are now saved per city+year as id, they could be saved per city itself as well
	- Units of the air pollution are not provided, but if there is a big mismatch between values (some indicators may be provided in µg/m³, some in mg/m3) an extra logic may be added
