const fetchAndParse = (url) => fetch(url)
    .then(resp => {
    return resp.text();
})
    .then((html) => {
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
    };
});
const loadComponent = (url) => fetchAndParse(url).then(registerComponent);
const createBaseComponentClass = (style, template) => {
    class BaseComponent extends HTMLElement {
        connectedCallback() {
            this._setupShadowDOM();
        }
        _setupShadowDOM() {
            const shadow = this.attachShadow({ mode: 'open' });
            if (template !== null) {
                shadow.appendChild(document.importNode(template.content, true));
            }
            if (style !== null) {
                shadow.appendChild(style.cloneNode(true));
            }
        }
    }
    return BaseComponent;
};
const registerComponent = ({ template, style, script }) => {
    return customElements.define('hello-world', createBaseComponentClass(style, template));
};
export default loadComponent;
//# sourceMappingURL=WCLoader.js.map