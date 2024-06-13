const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://db:27017/contacts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const contactSchema = new mongoose.Schema({
  name: String,
  firstName: String,
  address: String,
  company: String,
  position: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.get('/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

app.post('/contacts', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json(contact);
});

app.delete('/contacts/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: 'Contact deleted' });
});

app.get('/contacts/search', async (req, res) => {
  const { company, position } = req.query;
  const contacts = await Contact.find({ company, position });
  res.json(contacts);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
