const functions = require("firebase-functions");
const admin = require("firebase-admin");

const cors = require("cors")({origin: true});

admin.initializeApp();

const db = admin.firestore();

exports.validateToken = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    // Check if Authorization header is present
    const authorizationHeader = req.get("Authorization");

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(403).json({error: "Unauthorized"});
    }

    // Extract the token
    const idToken = req.headers.authorization.split("Bearer ")[1];

    // Verify the JWT token
    try {
      let userData;
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      if (decodedToken) {
        const docRef = db.collection("users").doc(decodedToken.uid);
        const doc = await docRef.get();

        if (!doc.exists) {
          const userRef = await db.collection("users").doc(decodedToken.uid);
          userData = decodedToken;
          userData.role = "member";
          await userRef.set(userData);
          return res
              .status(200)
              .json({success: true, user: userData});
        } else {
          return res
              .status(200)
              .json({success: true, user: doc.data()});
        }
        // Token is valid
      }
    } catch (error) {
      // Token verification failed
      console.error("Error verifying token:", error);
      res.status(403).json({error: "Unauthorized"});
    }
  });
});


// functions to save the app data on the cloud

exports.createNewApp = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const data = req.body;
      const docRef = db.collection("apps").doc(req.body._id);
      await docRef.set(data);

      // retrive the data
      const appDetail = await docRef.get();
      res.status(200).json({_id: docRef.id, data: appDetail.data()});
    } catch (error) {
      // Token verification failed
      return res.status(402).json({error: error.message});
    }
  });
});

// function to get all the apps form the cloud

exports.getAllApps = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const apps = [];
      // use onSnapshot to listen real time changes
      const unsubscribe = db.collection("apps")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => {
            apps.length = 0; // clear existing array

            snapshot.forEach((doc) => {
              apps.push(doc.data());
            });
            res.json(apps);
          });
      res.on("finish", unsubscribe);
    } catch (error) {
      // Token verification failed
      return res.status(402).json({error: error.message});
    }
  });
});

// function to delete an app from cloud
exports.deleteAnApp = functions.https.onRequest(async (req, res) => {
  try {
    const {id}=req.query;
    if (!id) {
      return res.status(400).json({error: "App ID is missing"});
    }

    await db.collection("apps").doc(id).delete();
    return res.status(200).json({message: "App Deleted"});
  } catch (error) {
    // Token verification failed
    return res.status(402).json({error: error.message});
  }
});


// function to retrive the users from the cloud
exports.getAllUsers=functions.https.onRequest(async (req, res)=>{
  cors(req, res, async ()=>{
    try {
      const snapShot=await db.collection("users").get();
      const users=[];
      snapShot.forEach((doc) =>{
        users.push(doc.data());
      });
      return res.status(200).json(users);
    } catch (error) {
      // Token verification failed
      return res.status(402).json({error: error.message});
    }
  });
});

// function to update user role
exports.updateTheUser=functions.https.onRequest(async (req, res)=>{
  cors(req, res, async ()=>{
    try {
      const {_id, ...data}=req.body;
      await db.collection("users").doc(_id).update(data);
      return res.status(200).json({message: "Use Updated Successfully"});
    } catch (error) {
      return res.status(402).json({error: error.message});
    }
  });
});
