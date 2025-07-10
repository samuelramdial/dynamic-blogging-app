# Dynamic Blogging App 

This project is a dynamic blogging web application built from scratch using **HTML5**, **CSS3**, and **JavaScript** - no frameworks or libraries used. This application integrates a JSON server backend to manage blog data. It features full CRUD functionality with backend pagination, and error handling. 

## Features 
- **Backend-powered Pagination & Filtering:** Fetches only the required blogs per page and supports server-side search filtering using JSON server query parameters.
- **Full CRUD Operations:**  
  - **Create:** Add new blogs via a form with validation and current date assignment.  
  - **Read:** View paginated blog listings and individual blog details.  
  - **Update:** Edit blog posts with pre-populated form fields.  
  - **Delete:** Remove blog posts with confirmation and redirection.
- **Separation of Concerns:** Frontend (HTML, CSS, JS) fully separated from backend JSON server.
- **Responsive UI:** Clean and consistent styling across all pages with user-friendly error notifications.
- **Error Handling:** API call failures display user-friendly notifications with dismiss option.
out adapts to different screen sizes for better usability

## Project Structure

- **Server:**  
  - `db.json` — JSON server database with 100 blog entries  
- **Frontend:**  
  - `index.html`, `details.html`, `new.html`, `edit.html` — main pages  
  - `css/styles.css` — stylesheet  
  - `js/index.js`, `details.js`, `new.js`, `edit.js` — frontend logic for each page  
  - `images/default.jpeg` — default avatar image for new blogs  

## Live Demo

The live demo of the blogging app is hosted based on the requirements of a previous project and can be found here: [Dynamic Blogging App](https://webpages.charlotte.edu/sramdial/itis3135/Ramdial-Samuel-Project2/)

>**Note:** This repository contains the updated code which adds backend integration and enhanced functionalities. The demo link above points to the earlier version for reference.  

## Acknowledgments 
Project developed for: 
- **ITSC 3135 - Web-Based Application Design and Development**
- Intstructor: Dr. Lijuan Cao
- University of North Carolina at Charlotte
© 2025 Samuel Ramdial
