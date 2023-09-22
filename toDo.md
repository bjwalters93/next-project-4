#Budget Pirate Project

## To Do

- [ ] Finish Search Component
  - Current state of search component -> search is working, the compound operator is working with the exception of the equals operator which only works for booleans, numbers, etc BUT NOT STRINGS. So as of now it's returning the results from ALL OF THE USERS TRANSACTIONS rather then ONLY THE CURRENTLY LOGGED IN USER. Need to find another solution to fix this. Needs to match query AND session userId has to match field userId. Maybe there is a filter or exact match parameter for text.
