const mongoose = require("mongoose");
const mySecret = process.env["MONGO_URI"];
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });
let PersonModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", PersonModel);

const done = (t1, t2) => {
  console.log(t1, t2);
};

const createAndSavePerson = (done) => {
  let nuWeb = new Person({
    name: "nuWeb",
    age: 51,
    favoriteFoods: ["freddkiss", "eurostar"],
  });
  nuWeb.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  const people = Person.insertMany(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

/*  createManyPeople([{
    name: 'nuWeb',
    age: 51,
    favoriteFoods : ["freddkiss","eurostar"]
},{
    name: 'coucou',
    age: 51,
    favoriteFoods : ["freddkiss","eurostar"]
}
],done);   */

const findPeopleByName = (personName, done) => {
  const search = Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findByName = (personName, done) => {
  const search = Person.findOne({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  const findone = Person.findOne({ favoriteFoods: [food] }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  const findid = Person.findById({ _id: personId }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  const callback = (e, data) => {
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  };
  const newfood = Person.findById({ _id: personId }, (err, data) => {
    if (err) return done(err);
    callback(null, data);
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  const callback = (e, data) => {
    console.log(data);
    data.age = ageToSet;
    data.save((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
  };
  findByName(personName, callback);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  /*  Person.find({favoriteFoods: ({ "$in" : [foodToSearch]})})                  
         .exec()                  
         .then(docs => {
            console.log(docs)
          })
         .catch(err => {
            console.error(err)
          }); */

  Person.find({ favoriteFoods: { $in: [foodToSearch] } })
    .sort({ name: "asc" })
    .limit(2)
    .select("name favoriteFoods")
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
};
