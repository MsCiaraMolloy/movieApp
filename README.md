Assignment Documentation

Draft 1
19/8/26

During this development session, several features were added to the Movies App. 

1. A Must Watch feature was implemented by adding a new state variable and update function to the MoviesContext.

2. A new AddToMustWatchIcon card component was created, and the Upcoming Movies page was updated to display both the Add to Favourites and Add to Must Watch icons on each movie card.

3. The Upcoming Movies page was also refactored to use the react-query library for data fetching, replacing the previous useEffect and useState approach, which means the list of upcoming movies is now cached in the browser and will not trigger a new HTTP request on every page mount. 

4. A multi-criteria movie search feature was also built, consisting of a new getMoviesBySearch API function in tmdb-api.ts that accepts year, certification and page parameters, a new MovieSearchForm component with a year text input and certification dropdown, and a new MovieSearchPage that uses react-query with the enabled option to prevent fetching until the user submits the form. 

5. The search results page includes Previous and Next pagination buttons driven by the total_pages value returned from the TMDB API. 

6. A new Search route was added to the application router and a Search link was added to the site header navigation. These changes address the multi-criteria search, pagination, server state caching, and new views requirement.

Draft 2
20/8/26

During this development session I aimed to update the colour scheme.

1. The app's colour scheme was customised by introducing an MUI theme in src/index.tsx. The createTheme and ThemeProvider utilities were imported from @mui/material/styles, along with CssBaseline from @mui/material/CssBaseline. 

2. A theme object was created using createTheme, defining a colour palette with a primary colour and a secondary colour. 

3. The app was then wrapped in the ThemeProvider component with the theme passed as a prop, and CssBaseline was included to apply baseline styles across browsers. 

4. The primary colour is automatically applied to components such as the AppBar, primary buttons and primary icons throughout the app. The secondary colour is applied to secondary buttons and icons.

Note: AI was used here to teach me how to do this and I learned how to add a custom theme to an app in this way. 

Draft 3
20/8/26

In this session I aimed to add a sorting feature that ordered the movie list using the movie rating.

1. A sort by rating feature was added to the home page. The filterMoviesCard component was updated to include a checkbox labelled Sort by Rating inside the existing Sort card, using MUI Checkbox and FormControlLabel components. 

2. An onSortChange prop was added to both filterMoviesCard and movieFilterUI to pass the checkbox state up through the component tree. 

3. In homePage, a sortByRating state variable was added using useState, and the displayed movie list is sorted by vote_average in descending order when the checkbox is checked, using the JavaScript sort method before being passed to the PageTemplate component.

Draft 4
26/8/26

In this session I aimed to

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


