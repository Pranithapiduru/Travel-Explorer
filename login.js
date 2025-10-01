document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if(username && password) {
    // Demo login: redirect to home
    window.location.href = "home.html";
  } else {
    alert("Please enter both username and password.");
  }
});
