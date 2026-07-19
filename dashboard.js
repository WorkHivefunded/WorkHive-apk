// dashboard.js

import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

    // Login check
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {

            const data = userSnap.data();

            // Welcome Name
            const nameEl = document.getElementById("userName").innerText = "Shivchand";
            if (nameEl) {
                nameEl.textContent = data.name || "User";
            }

            // Plan Status
            const statusEl = document.querySelector(".status");
            const planTextEl = document.querySelector(".plan-text");

            if (statusEl && planTextEl) {

                if (data.plan && data.plan !== "No Active Plan") {

                    statusEl.textContent = "Active";

                    statusEl.style.color = "#22c55e";

                    planTextEl.textContent =
                        "Current Plan: " + data.plan;

                    // Hide Purchase Button
                    const btn = document.querySelector(".purchase-btn");
                    if (btn) {
                        btn.style.display = "none";
                    }

                } else {

                    statusEl.textContent = "No Active Plan";

                    planTextEl.textContent =
                        "You have not purchased any plan yet.";

                }

            }

        }

    } catch (error) {

        console.error(error);

    }

});

import { auth, db } from "./firebase.js";

import {
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
ref,
get,
onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

onAuthStateChanged(auth, async (user)=>{

if(!user){

window.location.href="login.html";

return;

}

const snap=await get(ref(db,"users/"+user.uid));

const paymentSnap = await get(ref(db, "payments/" + user.uid));

if (paymentSnap.exists()) {

    const payment = paymentSnap.val();

    document.getElementById("paymentStatus").innerHTML =
        payment.status;

}



if(snap.exists()){

const data=snap.val();

document.getElementById("userName").innerHTML=data.name;

document.getElementById("plan").textContent = data.plan;

if(data.plan!="No Active Plan"){

document.querySelectorAll(".purchase-btn").forEach(btn=>{

btn.style.display="none";

});

}

document.getElementById("wallet").innerHTML="₹"+data.wallet;

}

});

document.getElementById("logout").onclick=()=>{

signOut(auth);

window.location.href="login.html";

};
const noticeRef = ref(db, "notifications/notice1");

onValue(noticeRef, (snapshot) => {

    if (snapshot.exists()) {

        const notice = snapshot.val();

        document.getElementById("noticeTitle").textContent = notice.title;

        document.getElementById("noticeMessage").textContent = notice.message;

    }

});