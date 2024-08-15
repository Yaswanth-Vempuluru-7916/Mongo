db.products.aggregate([
  {
    $group: {
      _id: "$company",
      totalProducts: { $sum: 1 },
    },
  },
]);

db.products.aggregate([
  {
    $match: {
      company: "64c23350e32f4a51b19b9246",
    },
  },
]);

db.products.aggregate([
  {
    $group: {
      _id: "$company",
      totalProducts: { $sum: "$price" },
    },
  },
]);

//? price > 900
//? company $group
//? sum price

db.products.aggregate([
  {
    $match: { price: { $gt: 900 } },
  },
  {
    $group: {
      _id: "$company",
      totalProducts: { $sum: "$price" },
    },
  },
]);

shop >
  db.sales.aggregate([
    { $match: { quantity: 5 } },
    { $group: { _id: "$quantity", average: { $avg: 1 } } },
  ])[{ _id: 5, average: 1 }];

shop >
  db.sales.aggregate([
    { $match: { quantity: 5 } },
    { $group: { _id: "$quantity", average: { $avg: "$quantity" } } },
  ])[{ _id: 5, average: 5 }];

shop >
  db.sales.aggregate([
    { $match: { quantity: 5 } },
    { $group: { _id: "$quantity", average: { $avg: "$targetPrice" } } },
  ])[{ _id: 5, average: 133.33333333333334 }];

shop >
  db.sales.aggregate([
    { $match: { quantity: 5 } },
    { $group: { _id: "$quantity", average: { $avg: "$price" } } },
  ])[{ _id: 5, average: 45 }];

//after group ippudu neeku only 2 fields i.e _id and totalPrice
// So vaatini maatrame vaadali sort lo
//price and category : existing field so $ vaadam
//but totalPrice is not existing so no '$
db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  {
    $group: {
      _id: "$category",
      totalPrice: { $sum: "$price" },
    },
  },
  {
    $sort: { totalPrice: 1 },
  },
]);

//!  Projects

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  {
    $project: {
      price: 1,
      discountPrice: { $multiply: ["$price", 0.8] },
    },
  },
]);

//? push

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  {
    $group: {
      _id: "$price",
      allColors: { $push: "$colors" },
    },
  },
]);

// price :1999
// colors :  [ '#000000', '#cc6600', '#663300' ]

// price : 1999
// colors :   [ '#000000', '#cc6600', '#663300' ]

// price :1999
// colors :   [ '#000000', '#cc6600', '#663300' , '#000000', '#cc6600', '#663300' ]

//! $unwind vaadu baabai
//*Before unwind
{
  _id: ObjectId('64c23601e32f4a51b19b9263'),
    name: 'Laptop Pro',
      company: '64c23350e32f4a51b19b9231',
        price: 1299,
          colors: ['#333333', '#cccccc', '#00ff00'],
            image: '/images/product-laptop.png',
              category: '64c2342de32f4a51b19b924e',
                isFeatured: true
},

//!!  $unwind : "$colors";

//*After
//   {
//     _id: ObjectId('64c23601e32f4a51b19b9263'),
//     name: 'Laptop Pro',
//     company: '64c23350e32f4a51b19b9231',
//     price: 1299,
//     colors: '#333333', 
//     image: '/images/product-laptop.png',
//     category: '64c2342de32f4a51b19b924e',
//     isFeatured: true
//   },
//   {
//     _id: ObjectId('64c23601e32f4a51b19b9263'),
//     name: 'Laptop Pro',
//     company: '64c23350e32f4a51b19b9231',
//     price: 1299,
//     colors:  '#cccccc',
//     image: '/images/product-laptop.png',
//     category: '64c2342de32f4a51b19b924e',
//     isFeatured: true
//   },
//   {
//     _id: ObjectId('64c23601e32f4a51b19b9263'),
//     name: 'Laptop Pro',
//     company: '64c23350e32f4a51b19b9231',
//     price: 1299,
//     colors: '#00ff00',
//     image: '/images/product-laptop.png',
//     category: '64c2342de32f4a51b19b924e',
//     isFeatured: true
//   },

db.products.aggregate([
  { $unwind: "$colors" },
  { $match: { price: { $gt: 1200 } } },
  {
    $group: {
      _id: '$price',
      allColors: { $push: "$colors" }
    }
  }
])

//! addToSet ----> Unique elements
db.products.aggregate([
  { $unwind: "$colors" },
  { $match: { price: { $gt: 1200 } } },
  {
    $group: {
      _id: '$price',
      allColors: { $addToSet: "$colors" }
    }
  }
])

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" }
])

//! cant use size in group
db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      colors: { $addToSet: "$colors" },
      colorLength: { $size: "$colors" }
    }
  }
])


db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      allColors: { $addToSet: "$colors" }
    }
  }, {
    $project: {
      _id: 1,
      allColors: 1,
      colorLength: { $size: "$allColors" }
    }
  },
  { $limit: 1 }
])

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      allColors: { $addToSet: "$colors" }
    }
  }, {
    $project: {
      _id: 1,
      allColors: 1,
      colorLength: { $size: "$allColors" }
    }
  },
  { $skip: 1 }
])


db.col.insertMany([
  { "_id": "64c23350e32f4a51b19b9201", "name": "Document 1", "values": [10, 20, 30, 40, 50] },
  { "_id": "64c23350e32f4a51b19b9202", "name": "Document 2", "values": [15, 25, 35, 45, 55] },
  { "_id": "64c23350e32f4a51b19b9203", "name": "Document 3", "values": [5, 15, 25, 35, 45] },
  { "_id": "64c23350e32f4a51b19b9204", "name": "Document 4", "values": [30, 40, 50, 60, 70] },
  { "_id": "64c23350e32f4a51b19b9205", "name": "Document 5", "values": [25, 35, 45, 55, 65] },

])


// double $ endukante normal ga single dollar pedithe adhi reference chesthadi normal collection lodhi
// but manam alias name ni reference ivvalante 1$ and adhi original array lo ki refernce isthundhi kaabatti 2nd$
db.col.aggregate([{
  $project: {
    name: 1,
    alias: {
      $filter: {
        input: '$values',
        as: 'aliassName',
        cond: { $gt: ['$$aliassName', 30] }
      }
    }
  }
}
])