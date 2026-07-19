import { auth, db } from "./firebase.js";

import { onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { ref, get }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Wallet Balance
    const userSnap = await get(ref(db, "users/" + user.uid));

    if (userSnap.exists()) {

        const data = userSnap.val();

        document.getElementById("walletBalance").textContent =
            "₹" + (data.wallet || 0);
    }

    // Transaction History
    const transactionRef = ref(db, "transactions/" + user.uid);

    const transactionSnap = await get(transactionRef);

    const list = document.getElementById("transactionList");

    if (transactionSnap.exists()) {

        list.innerHTML = "";

        transactionSnap.forEach((item) => {

            const t = item.val();

            list.innerHTML += `
            <div class="profile-box" style="margin-top:10px;">
                <b>${t.type || "Transaction"}</b><br>
                ₹${t.amount || 0}<br>
                <small>${t.date || ""}</small>
            </div>
            `;

        });

    }

});