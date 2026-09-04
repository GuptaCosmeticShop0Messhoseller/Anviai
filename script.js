const input = document.getElementById("message");
const send = document.getElementById("send");
const chat = document.getElementById("chat");

function addMessage(text, type) {
  const div = document.createElement("div");

  div.className = "message " + type;
  div.textContent = text;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  setTimeout(() => {
    addMessage(
      "AnviAI: Aapka message mil gaya.\n\n" +
      "Real AI response ke liye AI API/backend connect karna hoga.",
      "ai"
    );
  }, 600);
}

send.addEventListener("click", sendMessage);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
