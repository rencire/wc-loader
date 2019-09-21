const fetchAndParse = (url) => 
  fetch(url)
    .then(resp => {
      return resp.text();
    })
    .then( html => {
      const parser = new DOMParser();
      const document = parser.parseFromString(html, 'text/html');
      // Parser will put <template>, <style>, and <script> in <head>
      // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction
      const head = document.head;
      const template = head.querySelector('template');
      const style = head.querySelector('style');
      const script = head.querySelector('script');
     
      return {
        template,
        style,
        script 
      }
    });

const loadComponent = (url) => fetchAndParse(url);

export default loadComponent
