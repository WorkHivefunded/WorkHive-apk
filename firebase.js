import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8cbwtFZ1N2wyb2g-gbCza2v5aeeNqzo0",
  authDomain: "workhive-v2.firebaseapp.com",
  databaseURL: "https://workhive-v2-default-rtdb.firebaseio.com",
  projectId: "workhive-v2",
  storageBucket: "workhive-v2.firebasestorage.app",
  messagingSenderId: "760650048411",
  appId: "1:760650048411:web:ef5a874607795edd84b73e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);