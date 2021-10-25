Start:
- start server in root: yarn start
- start development in ./frontend: yarn start

Roadmap:

1. ~~Read textfiles via node fs and file-select library~~
2. ~~Parse text to readable JSON~~
3. ~~Import JSON to App~~
4. ~~Convert Example App to TrackerApp~~
5. ~~Show JSON data in table~~
6. ~~Save to database~~
7. ~~Filters~~
8. ~~Graphs~~


Nav:
1. Home
2. Login (necessary?) -> set Hero
3. Tourney History Import + Manual import
4. Tourney Results (Table + Graphs)
5. Player Analysis
6. Tax Report + Export (XCL)


<UserManagement>:
Create unique Users from Tournament Placements in Database with
- Name
- Country
- Tournaments played
- Tournament winnings

<ResultsPage>:
- ~~add pagination (thinking about extensions categorized in days, tabbed into months <- less dependencies)~~
- ~~enable deleting of items for faster cleanup when testing~~
- ~~link each entry to <DetailsPage>~~

<DetailsPage>:
- ~~Show Placement details (players, currentUser results after login)~~

<ImportPage>:
- ~~Create folder picker to choose directory for imports~~
- ~~Create form to manually entry a tournament into DB (for special non-automated formats)~~
- write data to database (~~general results~~ and user results)

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
