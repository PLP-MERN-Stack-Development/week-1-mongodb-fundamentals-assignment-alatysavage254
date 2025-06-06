
db.books.find({ genre: "Programming" })

db.books.find({ published_year: { $gt: 2010 } })

db.books.find({ author: "Harper Lee" })


db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { price: 12.99 } }
)


db.books.deleteOne({ title: "1984" })


//Advanced queries
// Find books that are in stock and published after 2010
db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})

//  projection to return only the title, author, and price
db.books.find(
  {},
  { title: 1, author: 1, price: 1, _id: 0 }
)

// Sort books by price in ascending order
db.books.find().sort({ price: 1 })

// Sort books by price in descending order
db.books.find().sort({ price: -1 })

// Pagination: Page 1 (5 books)
db.books.find().skip(0).limit(5)

// Pagination: Page 2 (next 5 books)
db.books.find().skip(5).limit(5)

//Aggregation pipelines

// Average price of books by genre
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      avgPrice: { $avg: "$price" }
    }
  }
])

// Author with the most books
db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
])

// Group books by publication decade and count them
db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $substr: [{ $subtract: ["$published_year", { $mod: ["$published_year", 10] }] }, 0, 4] },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])


// Create an index on the title field
db.books.createIndex({ title: 1 })

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 })

// Use explain() to show performance improvement
db.books.find({ title: "The Lean Startup" }).explain("executionStats")

