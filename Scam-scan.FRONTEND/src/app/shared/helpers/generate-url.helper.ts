export function generateUrl(baseUrl: string, reportParams: any): string {
  let url = baseUrl;
  const paramKeys: string[] = Object.keys(reportParams);

  paramKeys.forEach((key) => {
      const value = reportParams[key];

      // Vérifie si la valeur est valide
      if (
          value !== undefined &&            // Pas `undefined`
          value !== null &&                 // Pas `null`
          value !== '' &&                   // Pas une chaîne vide
          !(Array.isArray(value) && value.length === 0) && // Pas un tableau vide
          value !== 0                       // Pas `0` si non pertinent
      ) {
          url += `&${key}=${encodeURIComponent(value)}`;
      }
  });

  return url;
}
