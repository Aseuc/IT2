const loginForm = document.getElementById("loginForm");

async function handleLoginEvent(event) {
  event.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const registerButton = document.getElementById("loginButton");

  let result;
  try {
    result = await login(user, pass);
    if (result.response.status >= 400) {
      const error = result.message.error;
      const reason = result.message.reason;
      document.getElementById("status").innerText =
        "Error: " + error + " (" + reason + ")";
    } else location.href = "dashboard.html";
  } catch (e) {
   /*  document.getElementById("status").innerText = "Do you try to hack me? Then write an email to: smartairsolution.nuremberg@gmail.com";
    document.getElementById("status").setAttribute("style", "color:red"); */
    event.preventDefault();
  }
}
