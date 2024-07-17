const { google } = require('googleapis');
const key = require('./promotionsqr-ddf714987676.json');

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/wallet_object.issuer'],
);

async function createClass() {
  try {
    await jwtClient.authorize();

    const walletobjects = google.walletobjects({
      version: 'v1',
      auth: jwtClient,
    });

    const classObject = {
      resource: {
        kind: 'walletobjects#loyaltyClass',
        id: '1234', // Replace with your desired classId
        issuerName: 'Your Issuer Name',
        programName: 'Your Program Name',
        logo: {
          kind: 'walletobjects#image',
          sourceUri: {
            uri: 'https://example.com/logo.png',
            description: 'Logo image'
          }
        },
        reviewStatus: 'underReview', // Change as needed
        textModulesData: [
          {
            header: 'Header Text',
            body: 'Body Text'
          }
        ],
        // Add more fields as needed
      },
    };

    const response = await walletobjects.classes.insert(classObject);
    console.log('Class created:', response.data);

    return response.data.id; // Return the created classId
  } catch (error) {
    console.error('Error creating class:', error.message);
    throw error;
  }
}

module.exports = { createClass };
