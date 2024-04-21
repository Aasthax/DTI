const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors package
const { google } = require('googleapis');
// Import the User model
const User = require('./User');


const app = express();

const credentials = require('./service.json');
const client = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb+srv://aastha:21032004@cluster0.phgidju.mongodb.net/zero?retryWrites=true&w=majority&appName=Cluster0';
app.use(cors()); // Add cors middleware

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        app.post('/submit-to-google-sheets', async (req, res) => {
            try {
              await client.authorize();
              const sheets = google.sheets({ version: 'v4', auth: client });
              
              const { name, email, message } = req.body;
          
              const spreadsheetId = '1lHv_7ZHal5-KFMmiF68z3ajqfBXma4L4Y2wTbRofrjc';
              const range = 'Sheet1!A1:C1'; // Update with your desired range
              const values = [[name, email, message]];
          
              const response = await sheets.spreadsheets.values.append({
                spreadsheetId,
                range,
                valueInputOption: 'RAW',
                resource: { values },
              });
          
              res.status(200).json({ message: 'Data inserted successfully!' });
            } catch (error) {
              console.error('Error inserting data:', error);
              res.status(500).json({ error: 'Failed to insert data into Google Sheets' });
            }
          });

          app.post('/submit-to-google-sheets2', async (req, res) => {
            try {
              await client.authorize();
              const sheets = google.sheets({ version: 'v4', auth: client });
              
              const {feedback } = req.body;
          
              const spreadsheetId = '17cmxnB5x7x_Jg4zn4C-WCx3MzsWuwBhxa5SKidWXfaE';
              const range = 'Sheet1!A1:C1'; // Update with your desired range
              const values = [[feedback]];
          
              const response = await sheets.spreadsheets.values.append({
                spreadsheetId,
                range,
                valueInputOption: 'RAW',
                resource: { values },
              });
          
              res.status(200).json({ message: 'Data inserted successfully!' });
            } catch (error) {
              console.error('Error inserting data:', error);
              res.status(500).json({ error: 'Failed to insert data into Google Sheets' });
            }
          });

        // API endpoints
       

        // Add more API endpoints for CRUD operations as needed

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB', error);
    });
