import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  constructor(private http: HttpClient) {}

  getGuidesList() {
    return this.http.get<any>(
      'https://parisvisit.fr/wp-json/wp/v2/guide?_embed'
    );
  }

  getFeaturedGuide(): Observable<any[]> {
    const url = 'https://parisvisit.fr/wp-json/wp/v2/guide?_embed';

    return this.http
      .get<any[]>(url)
      .pipe(
        map((guides) => guides.filter((guide) => guide.acf.featured === true))
      );
  }

  getItemById(id: number) {
    const url = `https://parisvisit.fr/wp-json/wp/v2/guide/${id}?_embed`;
    return this.http.get<any>(url);
  }

  getMuseumsList() {
    const url = `https://parisvisit.fr/wp-json/wp/v2/musee?_embed`;
    return this.http.get<any>(url);
  }
  // getMuseumById(id: number) {
  //   const url = `https://parisvisit.fr/wp-json/wp/v2/musee/${id}?_embed`;
  //   return this.http.get<any>(url);
  // }

  getMuseumFromCache(id: number): Observable<any> {
    return new Observable((observer) => {
      // Ouvrir le cache
      console.log(
        caches.keys().then(function (keyList) {
          console.log(keyList);
        })
      );
      caches
        .open('wordpress-musee-datas')
        .then((cache) => {
          // Récupérer toutes les clés du cache
          console.log(cache, 'cache');
          cache.keys().then((keys) => {
            // Parcourir les clés pour trouver celle qui contient les données complètes
            keys.forEach((request) => {
              if (request.url === '/wp-json/wp/v2/musee?_embed') {
                // Si la clé correspond, récupérer les données associées
                cache
                  .match(request)
                  .then((response) => {
                    if (response) {
                      // Si la réponse est trouvée, extraire les données JSON
                      response
                        .json()
                        .then((data) => {
                          // Rechercher l'élément spécifique dans les données
                          const museum = data.find(
                            (museum: any) => museum.id === id
                          );
                          console.log(museum, 'museum');

                          // Émettre l'élément trouvé ou null s'il n'existe pas
                          observer.next(museum || null);
                          observer.complete();
                        })
                        .catch((error) => {
                          console.error('Error parsing cached data:', error);
                          observer.error(error);
                        });
                    } else {
                      // Si aucune réponse n'est trouvée, émettre null
                      observer.next(null);
                      observer.complete();
                    }
                  })
                  .catch((error) => {
                    console.error('Error matching cache request:', error);
                    observer.error(error);
                  });
              }
            });
          });
        })
        .catch((error) => {
          console.error('Error opening cache:', error);
          observer.error(error);
        });
      // caches
      //   .open('wordpress-musee-datas')
      //   .then((cache) => {
      //     console.log(cache); // empty

      //     // Récupérer toutes les clés du cache
      //     cache
      //       .keys()
      //       .then((keys) => {
      //         // Parcourir les clés pour trouver celle qui contient les données complètes
      //         keys.forEach((request) => {
      //           if (
      //             request.url ===
      //             'https://parisvisit.fr/wp-json/wp/v2/musee?_embed'
      //           ) {
      //             // Si la clé correspond, récupérer les données associées
      //             cache
      //               .match(request)
      //               .then((response) => {
      //                 if (response) {
      //                   // Si la réponse est trouvée, extraire les données JSON
      //                   response
      //                     .json()
      //                     .then((data) => {
      //                       // Rechercher l'élément spécifique dans les données
      //                       const museum = data.find(
      //                         (museum: any) => museum.id === id
      //                       );
      //                       // Émettre l'élément trouvé ou null s'il n'existe pas
      //                       observer.next(museum || null);
      //                       observer.complete();
      //                     })
      //                     .catch((error) => {
      //                       console.error('Error parsing cached data:', error);
      //                       observer.error(error);
      //                     });
      //                 } else {
      //                   // Si aucune réponse n'est trouvée, émettre null
      //                   observer.next(null);
      //                   observer.complete();
      //                 }
      //               })
      //               .catch((error) => {
      //                 console.error('Error matching cache request:', error);
      //                 observer.error(error);
      //               });
      //           }
      //         });
      //       })
      //       .catch((error) => {
      //         console.error('Error getting cache keys:', error);
      //         observer.error(error);
      //       });
      //   })
      //   .catch((error) => {
      //     console.error('Error opening cache:', error);
      //     observer.error(error);
      //   });
    });
  }

  getBaladesList() {
    const url = `https://parisvisit.fr/wp-json/wp/v2/itineraire?_embed`;
    return this.http.get<any>(url);
  }
  getBaladeById(id: number) {
    const url = `https://parisvisit.fr/wp-json/wp/v2/itineraire/${id}?_embed`;
    return this.http.get<any>(url);
  }
}
