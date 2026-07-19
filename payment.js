import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
ref,
set,
get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


const submitBtn = document.getElementById("submitPayment");

const payBtn = document.getElementById("payNow");

payBtn.addEventListener("click", () => {

    const plan = document.getElementById("plan").value;

    let amount = 1399;

    if (plan === "Professional") {
        amount = 2199;
    }

    if (plan === "Premium") {
        amount = 2849;
    }

    // 👇 Apni asli UPI ID yahan likho
   
  const upiId = "robinnirania326-4@okaxis";

    const upiLink =
        `upi://pay?pa=${upiId}&pn=WORKHIVE&am=${amount}&cu=INR&tn=${plan}%20Plan`;

    window.location.href = upiLink;

});

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    submitBtn.addEventListener("click", async () => {

        const plan = document.getElementById("plan").value;

        const salesCode = document.getElementById("salesCode").value.trim();
        
        let referredBy = "";

if (salesCode !== "") {

    const usersRef = ref(db, "users");
    const usersSnap = await get(usersRef);

    if (usersSnap.exists()) {

        const users = usersSnap.val();
        let found = false;

        for (const uid in users) {

            if (users[uid].salesCode === salesCode) {

                referredBy = uid;
                found = true;
                break;

            }

        }

        if (!found) {

            alert("Invalid Sales Code");
            return;

        }

    }

}

        const txnId = document.getElementById("txnId").value.trim();

        if (txnId === "") {

            alert("Enter Transaction ID");

            return;

        }

        try {

            await set(ref(db, "payments/" + user.uid), {

                uid: user.uid,

                plan: plan,

                salesCode: salesCode,

                transactionId: txnId,

                status: "Pending",

                amount:

                plan === "Starter" ? 1399 :

                plan === "Professional" ? 2199 : 2849,

                time: new Date().toLocaleString()

            });

            alert("Payment Submitted Successfully");

            window.location.href = "dashboard.html";

        }

        catch (error) {

            alert(error.message);

        }

    });

});