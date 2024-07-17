const { google } = require('googleapis');
const key = require('./promotionsqr-ddf714987676.json');
const { createClass } = require('./createClass'); // Import createClass function

const jwtClient = new google.auth.JWT(
  key.client_email,
  null,
  key.private_key,
  ['https://www.googleapis.com/auth/wallet_object.issuer'],
);

async function createPass() {
  try {
    await jwtClient.authorize();

    const classId = await createClass(); // Dynamically obtain classId

    const pass = {
      classId: classId,
      objectId: `yourObjectId-${Math.random().toString(36).substr(2, 9)}`,
      barcode: {
        type: 'QR_CODE',
        value: 'your-qr-code-value',
        alternateText: 'QR Code',
      },
      textModulesData: [
        {
          header: 'Header Text',
          body: 'Body Text',
        },
      ],
    };

    const walletobjects = google.walletobjects({
      version: 'v1',
      auth: jwtClient,
    });

    const response = await walletobjects.objects.insert({
      resource: pass,
    });

    console.log('Pass created:', response.data);

    const addToWalletUrl = `https://pay.google.com/gp/v/save/${response.data.id}`;
    return addToWalletUrl;
  } catch (error) {
    console.error('Error creating pass:', error.message);
    throw error;
  }
}

module.exports = { createPass };
