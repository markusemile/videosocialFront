
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
  mdbMedia: {
    portrait138_175: "https://www.themoviedb.org/t/p/w138_and_h175_face",
    portrait220_330: "https://www.themoviedb.org/t/p/w220_and_h330_face",
    portrait300_450: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2",
    portrait600_900: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2",
    landscape500_285: "https://www.themoviedb.org/t/p/w500_and_h282_face",
    original: "https://www.themoviedb.org/t/p/original",
    people: "https://www.themoviedb.org/t/p/w66_and_h66_face",



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


