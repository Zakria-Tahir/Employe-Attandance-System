// ✅ Import required Firebase SDKs
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getDatabase } from "firebase/database";

// ✅ Your Firebase configuration (from your Firebase project)
const firebaseConfig = {
  apiKey: "AIzaSyAM-xAZQYfix_e4BOOZMbHclA3LxPV3Lnk",
  authDomain: "employee-attendance-syst-2e976.firebaseapp.com",
  projectId: "employee-attendance-syst-2e976",
  storageBucket: "employee-attendance-syst-2e976.firebasestorage.app",
  messagingSenderId: "949392051808",
  appId: "1:949392051808:web:6cf22e4c0b64d494447d05",
  databaseURL: "https://employee-attendance-syst-2e976-default-rtdb.firebaseio.com/", // ✅ Added for Realtime Database
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase Messaging
const messaging = getMessaging(app);

// ✅ Initialize Realtime Database
const db = getDatabase(app);

// ✅ Ask for Notification Permission and Get Token
export const requestPermission = async () => {
  console.log("🔔 Requesting notification permission...");
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    console.log("✅ Notification permission granted.");
    try {
      const token = await getToken(messaging, {
        vapidKey:
          "BO522YBBG-1-Mg9jyn-4ktqEO-uh5SLMj-U4EwfDOnBWTi9eHejFZ2Qw4Xx4_b7AJydn59qKXwUuxfFXsOsXKx4",
      });
      if (token) {
        console.log("🎯 FCM Token:", token);
        localStorage.setItem("fcm_token", token);
      } else {
        console.warn("⚠️ No registration token available.");
      }
    } catch (err) {
      console.error("❌ Error getting FCM token:", err);
    }
  } else {
    console.warn("🚫 Notification permission denied by user.");
  }
};

// ✅ Listen for foreground messages (when app is open)
onMessage(messaging, (payload) => {
  console.log("📨 Foreground message received:", payload);
  if (Notification.permission === "granted") {
    new Notification(payload.notification.title, {
      body: payload.notification.body,
      icon: payload.notification.icon,
    });
  }
});

// ✅ Export for other files to use
export { app, db, messaging };
