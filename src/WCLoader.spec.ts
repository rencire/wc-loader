import loadComponent, { registerComponent } from "./WCLoader";

// TODO add tests for loading <template> and <style> to shadow DOM
// - might need to switch to a headless browser to test this (e.g puppeteer)
describe("Shadow DOM", () => {
  it.skip("should add <template> dom node to shadow root", () => {
    loadComponent("./HelloWorld.wc");
  });
});

// TODO
describe("unit tests", () => {
  describe("registerComponent", () => {
    it("should define custom element with a given name", () => {
      // Setup
      // mock customElements interface
      window.customElements = {
        define: jest.fn(),
        get: jest.fn(),
        upgrade: jest.fn(),
        whenDefined: jest.fn(),
      };
      const name = "my-name";
      // Execute
      registerComponent({ name });
      // Validate
      expect(window.customElements.define).toHaveBeenCalledWith(name);
    });
  });
});
