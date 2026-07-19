import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  ref,
  set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// ================= REGISTER =================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const password = document.getElementById("password").value;

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      await set(ref(db, "users/" + user.uid), {

  name: name,
  email: email,
  mobile: mobile,

  plan: "No Active Plan",

  wallet: 0,

  status: "Active",

  salesCode: "WH" + Math.floor(100000 + Math.random() * 900000),

  referredBy: "",

  rewardGiven: false

});

      window.location.href = "login.html";

    } catch (error) {

      alert(error.message);

    }

  });

}



// ================= LOGIN =================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
  document.getElementById("email").value.trim();

const password =
  document.getElementById("password").value;

      await signInWithEmailAndPassword(

        auth,
        email,
        password

      );

      window.location.href = "dashboard.html";

    }

    catch (error) {

      alert(error.message);

    }

  });

}
