/**
 * Enum representing different types of search for the OMDB API.
 * @enum {string}
 */
export enum SearchType {
  all = "",
  episode = "episode",
  movie = "movie",
  series = "series",
}

/**
 * Interface representing the structure of a search result from the OMDB API.
 * @interface
 */
export interface SearchResult {
  imdbID: string;
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
}

/**
 * Interface representing the detailed information about a movie or series from the OMDB API.
 * @interface
 */
export interface DetailsResult {
  Actors: string;
  Awards: string;
  Director: string;
  Genre: string;
  imdbRating: string;
  Poster: string;
  Plot: string;
  Title: string;
  Website: string;
  Year: string;
}

/**
 * Interface representing an error response from the OMDB API during a search.
 * @interface
 */
export interface SearchError {
  Response: string;
  Error: string;
}

/**
 * Custom hook for interacting with the OMDB API.
 * @function
 * @returns {Object} An object containing functions for searching and getting details.
 * @property {Function} searchData - Function to search for movies or series.
 * @property {Function} getDetails - Function to get detailed information about a specific movie or series.
 */
export const useApi = () => {
  // Base URL for the OMDB API
  let baseURL = "https://www.omdbapi.com/";

  // API key for authentication
  let apiKey = "70c438ff";

  /**
   * Function to search for movies or series based on title and type.
   * @async
   * @function
   * @param {string} title - The title to search for.
   * @param {SearchType} type - The type of search (all, episode, movie, series).
   * @returns {Promise<SearchResult[] | SearchError>} A promise that resolves to search results or an error.
   */
  const searchData = async (
    title: string,
    type: SearchType
  ): Promise<SearchResult[] | SearchError> => {
    // Constructing the URL for the search query
    const result = await fetch(
      `${baseURL}?s=${encodeURI(title)}&type=${type}&apikey=${apiKey}`
    );

    // Returning the JSON result of the search
    return result.json();
  };

  /**
   * Function to get detailed information about a specific movie or series by ID.
   * @async
   * @function
   * @param {string} id - The ID of the movie or series.
   * @returns {Promise<DetailsResult>} A promise that resolves to detailed information about the specified movie or series.
   */
  const getDetails = async (id: string): Promise<DetailsResult> => {
    // Constructing the URL for the detailed information query
    const result = await fetch(`${baseURL}?i=${id}&plot=full&apikey=${apiKey}`);

    // Returning the JSON result of the detailed information query
    return result.json();
  };

  // Returning the functions for external use
  return {
    searchData,
    getDetails,
  };
};

// Exporting the useApi function as the default export
export default useApi;
