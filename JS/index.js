let otpVerified = false;
const BASE_URL = "https://portfolio-backend-r2dr.onrender.com";

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!otpVerified) {
    alert("Please verify your OTP before submitting.");
    return;
  }

  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const message = document.querySelector('textarea[name="message"]').value;

  fetch(`${BASE_URL}/api/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      alert("Message sent successfully");
      document.querySelector("form").reset();
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    });
});

// Send OTP
async function sendOtp() {
  const email = document.getElementById("email").value;

  if (!email) {
    alert("Please Enter Your Email");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please Enter A Valid Email Address");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/otp/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const data = await res.text();
    alert("✅ " + data);
  } catch (err) {
    alert("❌ Error: " + err.message);
  }
}

// Verify OTP
async function verifyOtp() {
  const email = document.getElementById("email").value;
  const otp = document.getElementById("otpInput").value;

  if (!otp || !email) {
    alert("Please Enter Both Email and OTP");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/otp/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp })
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    otpVerified = true;
    const data = await res.text();
    alert("✅ " + data);
  } catch (err) {
    otpVerified = false;
    alert("❌ Error: " + err.message);
  }
}
