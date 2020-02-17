Read Me
End Points

Verb: GET, Route /configuration?api_key/
Get the system wide configuration information.

Verb: GET, Route /find/{external_id}&external_source={source_id}
he find method makes it easy to search for objects in our database by an external id.

Verb: GET, Route /keyword/{keyword_id}

Verb: GET, Route: "/movie/{movie_id}?api_key/"
It returns the movie with the indicated id

Verb: GET, Route: "/movie/popular?api_key/&language={language}&page={number}"
Get a list of the current popular movies on TMDb. This list updates daily.

Verb: GET, Route: "/movie/top_rated?api_key/&language={language}&page={number}"
Get a list of the current top_rated movies on TMDb. This list updates daily.

Verb: GET, Route: "/movie/now_playing?api_key/&language={language}&page={number}"
Get a list of movies in theatres. This is a release type query that looks for all movies that have a release type of 2 or 3 within the specified date range.

Verb: GET, Route: "/movie/upcoming?api_key/&language={language}&page={number}"
Get a list of upcoming movies in theatres. This is a release type query that looks for all movies that have a release type of 2 or 3 within the specified date range.

Verb: GET, Route: "/movie/{movie_id}?api_key/credits"
Get the cast and crew for a movie.

Verb: GET, Route: "/movie/{movie_id}?api_key/images"
Get the images that belong to a movie.

Verb: GET, Route: "/movie/{movie_id}?api_key/release_dates"
Get the release_dates that belong to a movie.

Verb: GET, Route: "/genre/movie/list?api_key/&language={language}"
Get the list of official genres for movies.

Verb POST, Route: /list?api_key
Create a list.

Verb POST, Route: /list/{list_id}/add_item
Add a movie to a list.

Verb POST, Route: /list/{list_id}/remove_item
Remove a movie from a list.

Verb POST, Route: /list/{list_id}/clear
Clear all of the items from a list.

Verb DELETE, Route: /list/{list_id}
Delete a list.

Verb: GET, Route: "/movie/{movie_id}/similar?api_key/&language={language}&page={number}"
Get a list of upcoming movies in theatres. This is a release type query that looks for all movies that have a release type of 2 or 3 within the specified date range.

//Mapa
Verb: Get, Route: '?api_key'

Verb: Get, Route: '?api_key/:id'
