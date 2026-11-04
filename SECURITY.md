# Security

Please report vulnerabilities privately to **security@cetome.com**, not in a public issue. Our PGP key
fingerprint: `BA3F 45B4 928E DF7A 2C1A EE3A 3CB7 7CFA 4CE0 B1E0`.

In scope: the code of this repository. Of particular interest: anything that
lets a dataviz file, a share link or a `#` address run script in the viewer or the builder
(every value read from a file is meant to be escaped), or that makes the browser send data the
visitor did not choose to share.

dataviz keeps no data on a server: there are no accounts or databases to breach in this code.

The third-party components and the analysis of their known vulnerabilities are published as a
CycloneDX SBOM and VEX in `sbom/` (served at `/sbom/` by a dataviz site).
