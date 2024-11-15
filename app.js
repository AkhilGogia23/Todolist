const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var items = [];  // Your task list

// Home route for displaying to-do list
app.get("/", function (req, res) {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  var day = today.toLocaleDateString("en-US", options);
  
  res.render("list", {
    listoftitle: day, 
    Listofitems: items
  });
});

// Post route for adding new tasks
app.post("/", function (req, res) {
  let item = req.body.newitem;
  items.push({ task: item, completed: false });
  res.redirect("/");
});

// Route for completing/undoing tasks
app.post("/:list/complete", function (req, res) {
  const index = req.body.index;  // Get the index of the task
  items[index].completed = !items[index].completed;  // Toggle the completed status
  res.redirect("/");  // Redirect to the main page
});

// Route for deleting tasks
app.post("/:list/delete", function (req, res) {
  const index = req.body.index;  // Get the index of the task to delete
  items.splice(index, 1);  // Remove the task from the list
  res.redirect("/");  // Redirect to the main page
});

// Route for clearing all tasks
app.post("/:list/clear", function (req, res) {
  items = [];  // Clear the items array
  res.redirect("/");  // Redirect to the main page
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
