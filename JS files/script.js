document.getElementById("signIn").addEventListener("click", (event) => {
  event.preventDefault();
  const userName = document.getElementById("userName").value;
  const password = document.getElementById("password").value;

  if (userName === "admin" && password === "admin123") {
    alert("Login successful!");
    window.location.href = "./home.html";
  } else {
    alert("Invalid credentials!");
  }
});
