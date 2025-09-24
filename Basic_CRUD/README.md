# Folder Details

- **'\_getFunction'** - only has all **GET** Routes.
  - **.find()** method - for all documents.
  ```
  app.get('/users', async (req, res) => {
    const data = await Users.find({})
    res.status(201).json(data)
  })
  ```
  - **.findOne()** method - for documents that match the filter.
  ```
  app.get('/:name', async (req, res) => {
    const nameIs = await Users.findOne({ name: req.params.name })
    res.status(201).json({ nameIs })
  })
  ```
  - **.findById()** method - short hand of **findOne({ \_id: id})**.
  ```
  app.get('/user/:id', async (req, res) => {
    const byId = await Users.findById(req.params.id)
    res.status(201).json(byId)
  })
  ```
- **'\_postFunction'** - only has all **POST** Routes.

  - **.save()** method - save the instance of the model.

  ```
  app.post('/addUser', async (req, res) => {
    const userData = new Users(req.body)
    try {
      await userData.save()
      res.status(200).json({ message: 'Added' })
    } catch (err) {
      res.status(404).json({ message: err.message })
    }
  })
  ```

  - **.create()** method - shortcut method to save in document in collection

  ```
  app.post('/sure', async (req, res) => {
  try {
    await Users.create(req.body)
    res.status(200).json({ message: 'created' })
  } catch (err) {
    res.status(404).json({
      message: 'Not Found',
      err: err.message,
    })
  }
  })
  ```

use **Postman** to Text the API.
