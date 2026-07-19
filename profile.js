import { auth, db } from "./firebase.js";

import { onAuthStateChanged }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { ref, get }

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

onAuthStateChanged(auth, async(user)=>{

if(!user){

window.location.href="login.html";

return;

}

const snap=await get(ref(db,"users/"+user.uid));

if(snap.exists()){

const d=snap.val();

document.getElementById("pName").textContent = d.name || "Not Available";

document.getElementById("pEmail").textContent = d.email || "Not Available";

document.getElementById("pMobile").textContent = d.mobile || "Not Available";

document.getElementById("pPlan").textContent = d.plan || "No Active Plan";

document.getElementById("pWallet").textContent = "₹" + (d.wallet || 0);

document.getElementById("myCode").textContent = d.salesCode || "Not Generated";

const copyBtn = document.getElementById("copyCode");

copyBtn.addEventListener("click", () => {

const code = document.getElementById("myCode").textContent;

navigator.clipboard.writeText(code);

alert("Sales Code Copied");

});