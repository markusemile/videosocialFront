
interface MdbApiEntry {
  tag: string;
  url: string;
  params: {
    query: string;
    include_adult: boolean;
    page?: number;
    year?: string;

  }
}

export const environment = {

  production: false,
  debugger: true,
  localFolder: {
    actorMedia: { path: "../../../media/actor", subfolder: ["original", "thumb", "square"] },
    castMedia: { path: "../../../media/cast", subfolder: ["original", "thumb", "square"] },
    movieMedia: { path: "../../../media/movie", subfolder: ["original", "thumb"] },
    collectionMedia: { path: "../../../media/collection", subfolder: ["original", "thumb"] }
  },
  moviedb: {
    api: {
      searchMovie: {
        tag: "movie",
        url: "https://api.themoviedb.org/3/search/movie",
        params: {
          query: '',
          include_adult: false,
          year: ''
        },
        require: ['query']
      },
      searchPerson: {
        tag: 'person',
        url: "https://api.themoviedb.org/3/search/person",
        params: {
          query: '',
          include_adult: false,
          language: "fr_FR",
        },
        require: ['query']
      },
      searchtv: {
        tag: 'tvshow',
        url: "https://api.themoviedb.org/3/search/tv",
        params: {
          query: '',
          include_adult: false,
          year: ''
        },
        require: ['query']
      }
    } as { [key: string]: MdbApiEntry }
  },
  apikey: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzA0ZDQwNmM3MDUyMzNjOWI2OTI4NzhlZjc4OWEwZiIsInN1YiI6IjVjOGU0OWJlYzNhMzY4NjExMTRiYTQyOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KMeyfs3CrPk1vCNIZFUHu4v36MEMU4VJlLKS59MFcwM",
}


