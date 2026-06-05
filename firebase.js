    import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
    import { getAnalytics } from
"https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZnoVtSDRm-62WuRa4wM9hggsQbotNFAw",
  authDomain: "nani-fans-army.firebaseapp.com",
  projectId: "nani-fans-army",
  storageBucket: "nani-fans-army.firebasestorage.app",
  messagingSenderId: "143754892194",
  appId: "1:143754892194:web:f3becf4addd85c4e9098fb",
  measurementId: "G-RS1BB1MEYL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

console.log("Firebase Connected Successfully");

const visitorElement = document.getElementById("visitorCount");

if (visitorElement) {

  const visitorRef = doc(db, "visitors", "counter");

  const alreadyCounted =
    sessionStorage.getItem("visitCounted");

  getDoc(visitorRef).then(async (snapshot) => {

    if (snapshot.exists()) {

      let currentCount =
        parseInt(snapshot.data().count) || 0;

      if (!alreadyCounted) {

        currentCount++;

        await updateDoc(visitorRef, {
          count: currentCount.toString()
        });

        sessionStorage.setItem(
          "visitCounted",
          "true"
        );

      }

      visitorElement.textContent =
        `👥 ${currentCount}`;

    }

  });

}

const stars = document.querySelectorAll(".star");
const averageRatingElement = document.getElementById("averageRating");
const totalRatingsElement = document.getElementById("totalRatings");

async function loadRatings() {

  const ratingsRef = collection(db, "ratings");
  const snapshot = await getDocs(ratingsRef);

  let total = 0;
  let count = 0;

  snapshot.forEach((doc) => {

    const rating = parseInt(doc.data().rating);

    if (!isNaN(rating)) {
      total += rating;
      count++;
    }

  });

  const average = count > 0 ? (total / count).toFixed(1) : 0;

  if (averageRatingElement) {
    averageRatingElement.textContent =
      `Average Rating: ${average} / 5`;
  }

  if (totalRatingsElement) {
    totalRatingsElement.textContent =
      `Total Ratings: ${count}`;
  }

}

if (stars.length > 0) {

  stars.forEach((star) => {

    star.addEventListener("click", async () => {

  const today = new Date().toDateString();

  const lastRatedDate =
    localStorage.getItem("lastRatedDate");

  if (lastRatedDate === today) {

    alert("You have already rated today.");

    return;

  }

  const rating = star.dataset.rating;

  await addDoc(collection(db, "ratings"), {

    rating: rating,
    createdAt: new Date().toISOString()

  });

  localStorage.setItem("lastRatedDate", today);

  alert("Thank you for rating Nani Fans Army!");

  loadRatings();

});

  });

  loadRatings();

}

const feedbackBtn = document.getElementById("submitFeedback");

if (feedbackBtn) {

  feedbackBtn.addEventListener("click", async () => {

    const name =
      document.getElementById("feedbackName").value.trim();

    const message =
      document.getElementById("feedbackMessage").value.trim();

    if (!name || !message) {

      alert("Please fill in all fields.");
      return;

    }

    await addDoc(collection(db, "feedback"), {

      name: name,
      message: message,
      createdAt: serverTimestamp()

    });

    alert("Thank you for your feedback!");

    document.getElementById("feedbackName").value = "";
    document.getElementById("feedbackMessage").value = "";

  });

}