# My Reads

In the MyReads project, you will find a bookcase application that allows you to select and sort the books you have read, are reading or want to read.

The main page shows a list of shelves, each of which contains a series of books. The three shelves are:
* Currently Reading;
* Want to Read;
* Read;


Each book has a control that lets you select a bookcase for it. When you select a different shelf, the book is moved there.

The homepage has a link to the search page, which allows you to find books to add to your library.
This page has a input text that can be used to find books. As the value of the text changes, the books that match that query appear on the page.


## Getting Started

* Clone the my-reads repository: 
    git clone https://github.com/adansiston/project-myreads.git
    Alternatively, you can just download and unzip this file instead of cloning the repository.

* Make sure you have installed:
    - NodeJS
    - npm
    
* Install react-dom: `npm install react react-dom`
* install all project dependencies with `npm install`
* start the development server with `npm start`


## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BookShelves.js # This is the fisrt page of te project, where you can find all the shelves.
    ├── Search.js # This is the page where you can search and add new books to the existents shelves.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```



## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)




### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.


## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.



## Authors
* **Adan Siston** - *Initial work* - https://github.com/adansiston/project-myreads.git


## License

This project is licensed under the MIT License.