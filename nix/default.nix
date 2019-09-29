{ sources ? import ./sources.nix }:

let
  overlay = self: pkgs:
      { sources = sources;
        lefthook = pkgs.callPackage ./lefthook.nix {};
      };
in
  import sources.nixpkgs
    { overlays = [ overlay ] ; config = {}; }

