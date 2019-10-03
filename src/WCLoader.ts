type ParsedComponent = {
  template: HTMLTemplateElement | null;
  style: HTMLStyleElement | null;
  script: HTMLScriptElement | null;
};

type ComponentSettings = {
  template: HTMLTemplateElement | null;
  style: HTMLStyleElement | null;
  module: ModuleSettings | object;
};

type ModuleSettings = {
  name: string;
  component: HTMLElement | null;
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

const getSettings = ({
  template,
  style,
  script,
}: ParsedComponent): Promise<ComponentSettings> => {
  // Case where <script> tag is not specified in wc file.
  if (script === null) {
    return Promise.resolve({ template, style, module: {} });
  }
  const jsFile = new Blob([script!.textContent as string], {
    type: "application/javascript",
  });
  const jsFileUrl = URL.createObjectURL(jsFile);

  // TODO need to handle case when <script> exists, but no object is exported.
  return import(jsFileUrl).then(module => ({ module, template, style }));
};

export const registerComponent = ({
  template,
  style,
  module,
}: ComponentSettings) => {
  const moduleSettings = module as ModuleSettings;
  if (!moduleSettings.name && !moduleSettings.component) {
    return;
  }

  return customElements.define(
    moduleSettings.name,
    createBaseComponentClass(style, template),
  );
};

const loadComponent = (url: string) =>
  fetchAndParse(url)
    .then(getSettings)
    .then(registerComponent);

export default loadComponent;
