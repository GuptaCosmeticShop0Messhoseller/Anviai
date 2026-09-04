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

async function sendMessage() {
  const text = input.value.trim();

  if (!text) return;

  addMessage(text, "user");
  input.value = "";

  const loading = document.createElement("div");
  loading.className = "message ai";
  loading.textContent = "AnviAI soch raha hai...";
  chat.appendChild(loading);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await response.json();

    loading.remove();

    if (data.reply) {
      addMessage(data.reply, "ai");
    } else {
      addMessage(
        "Sorry, abhi AI response nahi mil raha hai.",
        "ai"
      );
    }

  } catch (error) {
    loading.remove();

    addMessage(
      "Server connect nahi ho raha. Backend deploy karna baaki hai.",
      "ai"
    );

    console.error(error);
  }
}

send.addEventListener("click", sendMessage);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
