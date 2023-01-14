# Paths for Referring to an Item in the Module Tree
To call a function, we need to know its path.
A path can take two forms:
- An ***absolute path*** is the full path starting from a crate root
  - for code from external crate, the absolute path begins with the crate name
  - for code from the current crate, it starts with literal `crate`
- A ***relative path*** starts from the current module and uses `self`, `super`, or an identifier in the current module.
Both absolute and relative paths are followed by one or more identifiers separated by double colons(`::`).

