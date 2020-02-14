import _ from "lodash";

export function paginate(listOfMovies, currentPage, pageSize) {
  const startIndex = (currentPage - 1) * pageSize;

  return _(listOfMovies)
    .slice(startIndex)
    .take(pageSize)
    .value();

  //on prend la liste de films a
  //à partir de startIndex.
  //on prend le nombre d'articles "pageSize" suivant
  //value(): converti l'objet lodash en Array
}
