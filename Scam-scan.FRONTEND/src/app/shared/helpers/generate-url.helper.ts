export function generateUrl(baseUrl: string, reportParams: any): string {
    let url = baseUrl
    const paramKeys: string[] = Object.keys(reportParams);
    paramKeys.forEach((key) => {
      if(reportParams[key]) {
        url +=`&${key}=${reportParams[key]}`
      }
    })
    return url
}
