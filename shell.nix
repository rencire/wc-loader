with import ./nix;
  mkShell { 
    buildInputs = [ 
      lefthook
      nodejs-10_x
    ];
  }
