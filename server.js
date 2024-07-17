const getPass = (pass, issuerId, classId) => {
  const randomUUID = () =>
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

  const basePass = {
    classId: classId,
    issuerName: "Example Issuer",
    logo: {
      sourceUri: {
        uri: "https://techcrunch.com/wp-content/uploads/2022/05/google_wallet.png",
      },
      contentDescription: {
        defaultValue: {
          language: "en",
          value: "Example logo",
        },
      },
    },
    header: {
      defaultValue: {
        language: "en",
        value: "Pass Header",
      },
    },
    footer: {
      defaultValue: {
        language: "en",
        value: "Pass Footer",
      },
    },
    card_title: {
      defaultValue: {
        language: "en",
        value: "Pass Card Title",
      },
    },
    genericClass: {
      textModulesData: [
        {
          header: "Name",
          body: "John Doe",
        },
        {
          header: "Certification",
          body: "Working at Heights Certification",
        },
        {
          header: "Code",
          body: "ABC123",
        },
        {
          header: "Certified for",
          body: "Advanced Safety Training",
        },
        {
          header: "Expires on",
          body: "31 Jul 2024", // Example date in dd MMM yyyy format
        },
        {
          header: "Issued by",
          body: "Safety Certification Authority",
        },
      ],
      genericObject: {
        genericType: "GENERIC_TYPE_UNSPECIFIED",
        cardTitle: {
          defaultValue: {
            language: "en-US",
            value: "Working at Heights Certification",
          },
        },
        header: {
          defaultValue: {
            language: "en-US",
            value: "Working at Heights Certification",
          },
        },
        subHeader: {
          defaultValue: {
            language: "en-US",
            value: "Advanced Safety Training",
          },
        },
        logo: {
          sourceUri: {
            uri: "https://YOUR_WEB_DOMAIN/LINK_TO_LOGO_IMAGE.png",
            description: "",
          },
        },
        hexBackgroundColor: "#CACACA",
        heroImage: {
          sourceUri: {
            uri: "https://YOUR_WEB_DOMAIN/LINK_TO_HERO_IMAGE.png",
            description: "",
          },
        },
        barcode: {
          type: "QR_CODE",
          value: "STATIC_QR_CODE_VALUE",
          alternateText: "QR code",
        },
      },
    },
  };

  const commonFields = {
    barcode: {
      type: "QR_CODE",
      value: "1234567890",
    },
    textModulesData: [
      {
        header: "Membership Details",
        body: "Membership Level: Gold\nMember Since: 2015",
      },
      {
        header: "Offers",
        body: "Get 20% off on your next purchase!\nExpires: 12/31/2024",
        id: "offer1",
      },
    ],
    linksModuleData: {
      uris: [
        {
          kind: "walletobjects#uri",
          uri: "https://example.com",
          description: "Visit our website",
        },
        {
          kind: "walletobjects#uri",
          uri: "https://example.com/rewards",
          description: "Check your rewards",
        },
      ],
    },
    imageModulesData: [
      {
        mainImage: {
          sourceUri: {
            uri: "https://cdn.pixabay.com/photo/2015/05/19/07/44/browser-773215_1280.png",
            description: "Company Logo",
          },
        },
        id: "logoImage",
      },
      {
        mainImage: {
          sourceUri: {
            uri: "https://cdn.pixabay.com/photo/2015/05/19/07/44/browser-773215_1280.png",
            description: "Promotional Image",
          },
        },
        id: "promoImage",
      },
    ],
    infoModuleData: {
      labelValueRows: [
        {
          columns: [
            {
              label: "Phone",
              value: "+1-800-555-1234",
            },
            {
              label: "Email",
              value: "support@example.com",
            },
          ],
        },
        {
          columns: [
            {
              label: "Website",
              value: "https://example.com",
            },
          ],
        },
      ],
      showLastUpdateTime: "true",
    },
    messages: [
      {
        header: "Welcome!",
        body: "Thank you for being a loyal customer!",
        image: {
          sourceUri: {
            uri: "https://cdn.pixabay.com/photo/2015/05/19/07/44/browser-773215_1280.png",
          },
        },
        id: "welcomeMessage",
      },
    ],
  };

  switch (pass) {
    case "generic":
      return {
        ...basePass,
        ...commonFields,
        id: `${issuerId}.${randomUUID()}`,
        passType: "Generic Pass",
        hexBackgroundColor: "#2196f3",
      };

    case "event":
      return {
        ...basePass,
        ...commonFields,
        id: `${issuerId}.${randomUUID()}`,
        passType: "Event Ticket",
        hexBackgroundColor: "#ff5722",
        eventId: "EV12345",
        venue: {
          name: "Event Venue",
          address: "123 Event St, City, Country",
        },
        dateTime: {
          start: "2024-07-11T19:00:00Z",
          end: "2024-07-11T22:00:00Z",
        },
        seatInfo: {
          seat: "A1",
          row: "1",
          section: "Front",
        },
      };

    case "loyalty":
      return {
        ...basePass,
        ...commonFields,
        id: `${issuerId}.${randomUUID()}`,
        passType: "Loyalty Card",
        hexBackgroundColor: "#4caf50",
        accountId: "1234567890",
        accountName: "John Doe",
        loyaltyPoints: {
          balance: {
            string: "500",
          },
          label: "Points",
        },
      };

    case "offer":
      return {
        ...basePass,
        ...commonFields,
        id: `${issuerId}.${randomUUID()}`,
        passType: "Offer Pass",
        hexBackgroundColor: "#ffeb3b",
        offerId: "OFF12345",
      };

    case "transit":
      return {
        ...basePass,
        ...commonFields,
        id: `${issuerId}.${randomUUID()}`,
        passType: "Transit Pass",
        hexBackgroundColor: "#673ab7",
        transitType: "BUS",
      };

    case "ticket":
      return {
        ...basePass,
        id: `${issuerId}.${randomUUID()}`,
        state: "ACTIVE",
        heroImage: {
          sourceUri: {
            uri: "https://farm4.staticflickr.com/3723/11177041115_6e6a3b6f49_o.jpg",
          },
          contentDescription: {
            defaultValue: {
              language: "en-US",
              value: "Hero image description",
            },
          },
        },
        textModulesData: [
          {
            header: "Text module header",
            body: "Text module body",
            id: "TEXT_MODULE_ID",
          },
        ],
        linksModuleData: {
          uris: [
            {
              uri: "http://maps.google.com/",
              description: "Link module URI description",
              id: "LINK_MODULE_URI_ID",
            },
            {
              uri: "tel:6505555555",
              description: "Link module tel description",
              id: "LINK_MODULE_TEL_ID",
            },
          ],
        },
        imageModulesData: [
          {
            mainImage: {
              sourceUri: {
                uri: "http://farm4.staticflickr.com/3738/12440799783_3dc3c20606_b.jpg",
              },
              contentDescription: {
                defaultValue: {
                  language: "en-US",
                  value: "Image module description",
                },
              },
            },
            id: "IMAGE_MODULE_ID",
          },
        ],
        barcode: {
          type: "QR_CODE",
          value: "QR code",
        },
        locations: [
          {
            latitude: 37.424015499999996,
            longitude: -122.09259560000001,
          },
        ],
        seatInfo: {
          seat: {
            defaultValue: {
              language: "en-US",
              value: "42",
            },
          },
          row: {
            defaultValue: {
              language: "en-US",
              value: "G3",
            },
          },
          section: {
            defaultValue: {
              language: "en-US",
              value: "5",
            },
          },
          gate: {
            defaultValue: {
              language: "en-US",
              value: "A",
            },
          },
        },
        ticketHolderName: "Ticket holder name",
        ticketNumber: "Ticket number",
      };

    default:
      throw new Error(`Unsupported pass type: ${pass}`);
  }
};

const express = require("express");
const { GoogleAuth } = require("google-auth-library");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");
const cors = require("cors");

const serviceAccount = require("./promotionsqr-4e9219611508.json");

// Create the Google Auth client
const auth = new GoogleAuth({
  credentials: serviceAccount,
  scopes: ["https://www.googleapis.com/auth/wallet_object.issuer"],
});

const issuerId = "3388000000022347702";

const app = express();
app.use(cors());
app.use(express.json());

// Get the OAuth 2.0 token
async function getAccessToken() {
  const client = await auth.getClient();
  const res = await client.getAccessToken();
  return res.token;
}


app.get('/', async (req, res) => {
  
  res.json({message:"hello"})
})
// Create generic class, pass, and generate save link in one endpoint


app.post("/create-and-generate", async (req, res) => {
  const classObject = {
    id: `3388000000022347702.${randomUUID()}`,
    issuerName: "Example Issuer",
    hexBackgroundColor: "#4285f4",
    logo: {
      sourceUri: {
        uri: "https://cdn.pixabay.com/photo/2015/05/19/07/44/browser-773215_1280.png",
      },
      contentDescription: {
        defaultValue: {
          language: "en",
          value: "Example logo",
        },
      },
    },
    reviewStatus: "underReview",
    textModulesData: [
      {
        header: "Example Header",
        body: "Example body content.",
      },
    ],
    version: "1",
    classTemplateInfo: {
      templateId: "generic.offer@2",
    },
  };
  let passType = req.body.passType;

  try {
    const token = await getAccessToken();
    const classResponse = await axios.post(
      "https://walletobjects.googleapis.com/walletobjects/v1/genericClass",
      classObject,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const classId = classResponse.data.id;

    const passObject = getPass(passType, issuerId, classId);

    const passResponse = await axios.post(
      "https://walletobjects.googleapis.com/walletobjects/v1/genericObject",
      passObject,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const payload = {
      iss: serviceAccount.client_email,
      aud: "google",
      origins: [],
      typ: "savetowallet",
      payload: {
        genericObjects: [passObject],
      },
    };

    const jwtToken = jwt.sign(payload, serviceAccount.private_key, {
      algorithm: "RS256",
    });
    const saveLink = `https://pay.google.com/gp/v/save/${jwtToken}`;

    res.json({
      classId: classResponse.data.id,
      passId: passResponse.data.id,
      saveLink: saveLink,
    });
  } catch (error) {
    res.status(500).json({
      message: error.response ? error.response.data : error.message,
    });
  }
});

// Update a pass

app.patch("/update-pass/:passId", async (req, res) => {
  const { passId } = req.params;

  const updatedTextModulesData = [
    {
      header: "Updated Membership Details",
      body: "New Membership Level: Platinum\nMember Since: 2015",
    },
    {
      header: "Updated Offers",
      body: "Special Summer Sale: Buy One Get One Free!\nExpires: 08/31/2024",
      id: "offer2",
    },
  ];

  try {
    const token = await getAccessToken();

    const updatePayload = {
      textModulesData: updatedTextModulesData,
    };

    const response = await axios.patch(
      `https://walletobjects.googleapis.com/walletobjects/v1/genericObject/${passId}`,
      updatePayload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-Update-Header": "value", // Update header field here if needed
        },
      }
    );

    res.json({
      message: "Pass updated successfully",
      data: response.data,
    });
  } catch (error) {
    if (error.response) {
      console.error(`Error response: ${JSON.stringify(error.response.data)}`);
      res.status(500).json({
        message: error.response.data,
      });
    } else {
      console.error(`Error message: ${error.message}`);
      res.status(500).json({
        message: error.message,
      });
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
