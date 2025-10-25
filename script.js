document.addEventListener("DOMContentLoaded", ()=>{
  console.log("Labubu showcase page rendered successfully!");
  const time = new Date().toLocaleString();
  const msg = document.createElement("p");
  msg.textContent = "🧠 Verified build: " + time;
  document.body.appendChild(msg);
});