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

const usersSnap=await get(ref(db,"users"));

if(!usersSnap.exists()) return;

const users=usersSnap.val();

let total=0;

let html="";

for(const uid in users){

if(users[uid].referredBy===user.uid){

total++;

html+=`

<p>✅ ${users[uid].name}</p>

`;

}

}

document.getElementById("totalReferrals").textContent=total;

document.getElementById("totalReward").textContent="₹"+(total*50);

document.getElementById("teamList").innerHTML=

html==""?

"No Referrals Yet":

html;

});