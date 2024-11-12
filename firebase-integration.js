


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDlS7-WKloQq0_p7sIJ6Gfh0pw3z86AHmw",
authDomain: "tefipay-ba888.firebaseapp.com",
projectId: "tefipay-ba888",
storageBucket: "tefipay-ba888.firebasestorage.app",
messagingSenderId: "801163667947",
appId: "1:801163667947:web:9d8b7d3a685842973bd1ae",
measurementId: "G-YTXNJW4SEF"
};
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Function to show confetti and success message
  function showSuccessMessage(message) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    alert(message);
  }
  
  // Function to submit waitlist form
  function submitWaitlistForm(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const phone = form.querySelector('#phone').value;
  
    db.collection("waitlist").add({
      name: name,
      email: email,
      phone: phone,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      showSuccessMessage("Thank you for joining the waitlist! We'll contact you shortly.");
      form.reset();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      alert("An error occurred. Please try again.");
    });
  }
  
  // Function to submit notify form
  function submitNotifyForm(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
  
    db.collection("notifications").add({
      email: email,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      showSuccessMessage("Email submitted successfully.");
      form.reset();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      alert("An error occurred. Please try again.");
    });
  }
  
  // Add event listeners to forms
  document.addEventListener('DOMContentLoaded', () => {
    const waitlistForm = document.getElementById('waitlistForm');
    if (waitlistForm) {
      waitlistForm.addEventListener('submit', submitWaitlistForm);
    }
  
    const notifyForm = document.querySelector('.notify-form');
    if (notifyForm) {
      notifyForm.addEventListener('submit', submitNotifyForm);
    }
  });