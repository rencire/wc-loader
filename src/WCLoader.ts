type ParsedComponent = {
  template: HTMLTemplateElement | null;
  style: HTMLStyleElement | null;
  script: HTMLScriptElement | null;
};

const fetchAndParse = (url: string) =>
  fetch(url)
    .then(resp => {
      return resp.text();
    })
    .then(
      (html: string): ParsedComponent => {
        const parser = new DOMParser();
        const document = parser.parseFromString(html, "text/html");
        // Parser will put <template>, <style>, and <script> in <head>
        // https://html.spec.whatwg.org/multipage/parsing.html#tree-construction
        const head = document.head;
        const template = head.querySelector("template");
        const style = head.querySelector("style");
        const script = head.querySelector("script");

        return {
          template,
          style,
          script,
        };
      },
    );

const createBaseComponentClass = (
  style: HTMLStyleElement | null,
  template: HTMLTemplateElement | null,
) => {
  class BaseComponent extends HTMLElement {
    constructor() {
      super();
      this._setupShadowDOM();
    }

    _setupShadowDOM() {
      const shadow = this.attachShadow({ mode: "open" });
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

const registerComponent = ({ template, style, script }: ParsedComponent) => {
  return customElements.define(
    "hello-world",
    createBaseComponentClass(style, template),
  );
};

const loadComponent = (url: string) =>
  fetchAndParse(url).then(registerComponent);

export default loadComponent;
