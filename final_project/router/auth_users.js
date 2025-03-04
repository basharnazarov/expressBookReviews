const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();


let users = [{username: "testuser", password: "432"}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
  return  users.find(user => user.username === username);
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
  return users?.find(user => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  if(!username || !password){
    return res.status(403).json({message:"username or password is missing"});
  }

  if(authenticatedUser(username,password)){
    let accessToken = jwt.sign({data: password}, "access", {expiresIn: "1h"});
    req.session.authorization = {accessToken, username};
    return res.status(200).json({message:"user successfully logged in"});
  } else {
    return res.status(208).json({message:"invalid login. check username or password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = "testuser";

  if(books.hasOwnProperty(isbn) && review !=="" && username) {
    books[isbn].reviews[username] = review;
    return res.status(300).json({message: "your review has been added successfully"});
  } else {
    res.status(401).json({message: "something wrong happened"})
  }

 
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here
    const isbn = req.params.isbn;
    // const review = req.query.review;
    const username = "testuser";
  
    if(books.hasOwnProperty(isbn) && username) {
      delete books[isbn].reviews[username].review;
      return res.status(300).json({message: "your review has been deleted successfully"});
    } else {
      res.status(401).json({message: "something wrong happened"})
    }
  
   
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
