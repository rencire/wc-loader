# Web Component Import

Simple script to import Web component files.

# Usage

## Example

```
cd example
```

Run a http server
Example using `nix-shell` and `python`:

```
nix-shell -p python3 --run "python -m http.server"
```

(see https://gist.github.com/willurd/5720255 for more web server one-liner commands).

# Develop

## Prerequisites

- [nix](https://nixos.org/nix/)

## Setup

For development, first drop into nix shell. Project dependencies from `shell.nix` will automatically be installed and loaded.

```
nix-shell
```

Now we need to install node-specific dependencies for linting/testing/etc.:

```
npm ci
```

(in future, would like to move these under 'nix' also)

Now make a pull request, or two :)

# TODO

- [x] Adopt Typescript
- [] Support 'default export' of an object in .wc file with `name` of component
- [] Support `default export` of a Web Component class. Will most likely extend `BaseComponent`, or `HTMLElement`. Of course can extend any other class.

# Notes

## Misc.

Ideally, we should move the node packages into shell.nix in future.
This requires making nix derivations for each of the npm packages.

# Resources

- Credit to [Tomasz Jakut](https://medium.com/@ComandeerPL?source=post_page-----22adeaa0cd17----------------------)'s ["Implementing single file Web Components](https://medium.com/content-uneditable/implementing-single-file-web-components-22adeaa0cd17) article for initial starting point.
- [Unity Component Specification](https://github.com/TheLarkInn/unity-component-specification)
