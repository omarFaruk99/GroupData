### Overview of the Project

This project is a simple web app built with **React** that allows users to view and filter a list of groups. The main purpose of the app is to display group information (like name, VAT number, active status, and logo) in a **table format**, while giving users options to **filter** the data or navigate through pages. 

---

### How It Works

1. **Filters**:
   - Users can search for groups by:
     - Group name.
     - VAT number.
     - Whether the group is active or inactive (via a dropdown).
   - A search button fetches the filtered data from the backend.

2. **Pagination**:
   - Users can switch between pages to view more data.
   - There’s also an option to change how many rows are shown per page.

3. **Dynamic Data Loading**:
   - The app doesn’t have all the data right away.
   - Instead, it **fetches data from a server** whenever:
     - The page first loads.
     - A user applies filters or changes pages.

---

### How Data is Fetched (Step by Step)

The app uses **Axios**, a tool for making requests to a server, to fetch data in two steps:

1. **Fetching Initial Data**:
   - When the app first loads, it makes a request to the server to get:
     - Options for filters (like "active/inactive" choices).
     - Options for page sizes (like 10, 25, or 50 rows per page).
   - This ensures that the filters and pagination settings are ready before showing any data.

2. **Fetching Table Data**:
   - After getting the initial setup, the app sends another request to fetch the actual **table data**. 
   - This data includes the list of groups (e.g., names, VAT numbers, and logos) based on:
     - The selected filters.
     - The current page and rows-per-page settings.

3. **On User Actions**:
   - Whenever a user changes a filter, switches pages, or adjusts the rows-per-page:
     - The app sends a new request to the server with the updated settings.
     - The table refreshes to show the updated data.

---

- The app follows a clear process:
  1. Fetch initial settings (filter options, page sizes).
  2. Fetch table data based on those settings.
  3. Re-fetch data whenever a user changes a filter or navigates to a new page.

  Here is a screenshot of the application:

![Screenshot of the App](./assets/Project.jpg)

