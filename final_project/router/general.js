const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const {username, password} = req.body;
  if(username || password){
    if(!isValid(username)){
      users.push({username, password});
      return res.status(200).json({message:"User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message:"User already exists"});
    }
  }
  return res.status(404).json({message: "unable to register user"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json(books);
});

// get all users for testing purpose only
public_users.get('/users',function (req, res) {
    //Write your code here
    return res.status(200).json(JSON.stringify(users));
  });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if(isbn){
    return res.status(200).json(books[isbn]);
  } else {
   return res.status(404).json({message:"unable to find book"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const name = req.params.author;
  let result = []
  if(name){
    for (let key in books) {
      if (books[key].author.toLowerCase().includes(name.toLowerCase())) {
        result.push(books[key])
      };
    }
    return res.status(200).json(result);
  }

  return res.status(300).json({message: "not found any details"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const name = req.params.title;
  let result = []
  if(name){
    for (let key in books) {
      if (books[key].title.toLowerCase().includes(name.toLowerCase())) {
        result.push(books[key])
      };
    }
    return res.status(200).json(result);
  }
  return res.status(300).json({message: "not found any details"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  if(isbn){
    return res.status(200).json({reviews: books[isbn].reviews});
  } else {
    return res.status(404).json({message:"not found any details"});
  }
  return res.status(404).json({message: "not found any details"});
});

module.exports.general = public_users;
