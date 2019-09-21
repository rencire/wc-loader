const fetchAndParse = (url) => 
  fetch(url)
    .then(resp => {
      return resp.text();
    })
    .then( html => {
      const parser = new DOMParser();
      return parser.parseFromString(html, 'text/html');
    });

const loadComponent = (url) => fetchAndParse(url);

export default loadComponent
