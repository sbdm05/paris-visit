import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCallsService {
  constructor(private http: HttpClient) {}

  // appel vers wifi
  // getWifiSpots() {
  //   return this.http.get<any>(
  //     'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/sites-disposant-du-service-paris-wi-fi/records?limit=20'
  //   );
  // }

  getWifiSpots(): Observable<any[]> {
    return this.getAllPages({
      url: 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/sites-disposant-du-service-paris-wi-fi/records',
      currentPage: 1, // Ajoutez cette ligne pour spécifier la page actuelle
      data: [], // Ajoutez cette ligne pour initialiser les données
    });
  }

  getAllPages({
    url,
    currentPage = 1,
    data = [],
  }: {
    url: string;
    currentPage?: number;
    data?: any[];
  }): Observable<any[]> {
    const limit = 100; // Nombre de résultats par page
    const offset = (currentPage - 1) * limit;

    const apiUrl = `${url}?limit=${limit}&offset=${offset}`;

    return this.http.get<any>(apiUrl).pipe(
      concatMap((response) => {
        const results = response?.results || [];
        console.log(results, 'results'); // vide
        console.log(response.results, 'response'); // contient les tableaux

        data = data.concat(results);
        console.log(data, 'concat'); // contient le tableau

        // Vérifie si plus de résultats sont disponibles
        const totalCount = response?.total_count || 0;
        const totalPages = Math.ceil(totalCount / limit);

        console.log('currentPage:', currentPage); // Ajoutez ce log pour vérifier la valeur de currentPage
        console.log('totalPages:', totalPages); // Ajoutez ce log pour vérifier la valeur de totalPages

        if (currentPage < totalPages) {
          // Récupérer la page suivante récursivement
          return this.getAllPages({ url, currentPage: currentPage + 1, data });
        } else {
          // Retourne les données complètes
          console.log(data, 'testdata'); // contient 277 entrées

          return of(data); // empty
        }
      })
    );
  }

  // appel vers toilets
  // getToiletsSpots() {
  //   return this.http.get<any>(
  //     'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/sanisettesparis/records?limit=20'
  //   );
  // }

  getToiletsSpots(): Observable<any[]> {
    return this.getAllPages({
      url: 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/sanisettesparis/records',
      currentPage: 1, // Ajoutez cette ligne pour spécifier la page actuelle
      data: [], // Ajoutez cette ligne pour initialiser les données
    });
  }

  // appel vers squares
  // getSquaresSpots() {
  //   return this.http.get<any>(
  //     'https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records?limit=100'
  //   );
  // }

  getSquaresSpots(): Observable<any[]> {
    return this.getAllPages({
      url: 'https://parisdata.opendatasoft.com/api/explore/v2.1/catalog/datasets/ilots-de-fraicheur-espaces-verts-frais/records',
      currentPage: 1, // Ajoutez cette ligne pour spécifier la page actuelle
      data: [], // Ajoutez cette ligne pour initialiser les données
    });
  }

  getActivities() {
    return this.http
      .get<any>(
        'https://parisdata.opendatasoft.com//api/explore/v2.1/catalog/datasets/que-faire-a-paris-/records?limit=100'
      )
      .pipe(
        map((response) => {
          // Vérifier si la propriété 'results' existe dans la réponse
          if (response && response.results) {
            // Filtrer les résultats pour exclure ceux où date_start ou date_end est manquante
            return response.results.filter(
              (result: any) =>
                result.date_start && result.date_end && result.tags
            );
          } else {
            // Si la propriété 'results' est manquante dans la réponse, renvoyer un tableau vide
            return [];
          }
        })
      );
  }
}

// créer un autre service pour créer du contenu personnalisé
// partenaires vélo + guides
