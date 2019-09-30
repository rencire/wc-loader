let
  sources = import ./sources.nix;
  overlay = selfpkgs: superpkgs:
      { sources = sources;
        lefthook = superpkgs.callPackage ./lefthook.nix {}; 
      };
in
  import sources.nixpkgs
    { overlays = [ overlay ] ; config = {}; }

