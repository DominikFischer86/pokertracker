Name ideas:
- TracKing
- TrackAces
- SnapTrack
- Trackshot
- CatchSet

Start:
- start server in root: yarn start
- start development in ./frontend: yarn start

![Pokertracker](https://i.ibb.co/bPRHMkg/Loader-Demo.gif)

Videodemo:
- [![IMAGE ALT TEXT](http://img.youtube.com/vi/pv4PZYIivWI/0.jpg)](http://www.youtube.com/watch?v=pv4PZYIivWI "Pokertracker Videodemo")


Roadmap:

1. ~~Read textfiles via node fs and file-select library~~
2. ~~Parse text to readable JSON~~
3. ~~Import JSON to App~~
4. ~~Convert Example App to TrackerApp~~
5. ~~Show JSON data in table~~
6. ~~Save to database~~
7. ~~Filters~~
8. ~~Graphs~~
9. User details (in Progress)
10. Hand History import
11. Hand Replayer
12. Hand Statistics Hero
13. Hand Statistics all players

Maintenance:

1. Refactor routes to be more consistant and avoid duplicates
2. Remove unnecessary useState usage
3. Change component files to PascalCase
4. Add state management using context hooks for active hero
5. Add specs


Nav:
1. Home
2. Login (necessary?) -> set Hero
3. Tourney History Import + Hand History Import
4. Tourney Results (Table + Graphs + Tournament Details + Hand History)
5. Player Analysis (played Tournaments, General Stats, Hand History Stats)
6. Tax Report + Export (XCL)


<PlayerManagement>:
Create unique Players from Tournament Placements in Database with
- Name
- Country
- Tournaments played
- Tournament winnings
- Stats

<ResultsPage>:
- ~~add pagination (thinking about extensions categorized in days, tabbed into months <- less dependencies)~~
- ~~enable deleting of items for faster cleanup when testing~~
- ~~link each entry to <DetailsPage>~~

<DetailsPage>:
- ~~Show Placement details (players, currentUser results after login)~~

<ImportPage>:
- ~~Create folder picker to choose directory for imports~~
- ~~Create form to manually entry a tournament into DB (for special non-automated formats)~~
- ~~write data to database (general results and player results)~~
- Create HandHistory import via Filepicker

<TaxReportPage>:
Render table with data:
- tournament # of recent month
- tournament ID
- date
- buyIn
- rake
- placement
- winnings
- profit = winnings - (buyIn + rake)
