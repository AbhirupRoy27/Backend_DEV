# Integrating MongoDB in Server

- This is using ES Module so make chnage in **' package.json '**

  ```
    { type : 'module' }
  ```

- Or, use **.mjs** as the file extension.
- Or, Simply use **CommonJS**.

---

### For including MongoDB this use Library — **mongoose**.

— after installing express install **mongoose** using:

```
  npm install mongoose OR,
  npm i mongoose
```

— then, adjust the basic folder structure.

```
my-express-app/
  │── node_modules/
  │── module.js     # mongoDB Schema and Model.
  │── server.js     # Entry point (Express app + routes)
  │── package.json
```

— A Schema in Mongoose is like a **blueprint** for your documents. It describes:

```
  — What fields the document should have
  — What type each field should be (string, number, date, etc.)
  — Any special rules (e.g., “this field is required”).
```

— Example of Module,

```
# without validation rules —
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});

# with validation rules —
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,        // name must be provided
    trim: true             // remove extra spaces
  },
  age: {
    type: Number,
    min: 0,                // minimum value is 0
    max: 120               // maximum value is 120
  },
  email: {
    type: String,
    required: true,
    unique: true           // no two users can have the same email
  }
});
```

— add options like **required, min, max, unique, and trim** etc to enforce rules.
