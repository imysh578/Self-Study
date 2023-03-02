# Refactoring to Improve Modularity and Error Handling
Four Problems to fix
- `main` function performs two tasks: parsing arguments and reading files
- Many variables are defined in the `main` function. It's best to group the configuration variables into one structure to make their purpose clear.
- The  error message