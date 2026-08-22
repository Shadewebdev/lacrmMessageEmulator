const logContainer = document.getElementById("logs");

function appendLog(msg) {
  const entry = document.createElement("div");
  entry.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
  logContainer.appendChild(entry);
  logContainer.scrollTop = logContainer.scrollHeight;
}

function buildMetaPayload(senderPhone, messageText) {
  return {
    object: "whatsapp_business_account",
    entry: [
      {
        id: "BUSINESS_ACCOUNT_ID",
        changes: [
          {
            value: {
              messaging_product: "whatsapp",
              metadata: {
                display_phone_number: "15555555555",
                phone_number_id: "100609346123456"
              },
              contacts: [{ profile: { name: "Local Tester" }, wa_id: senderPhone }],
              messages: [
                {
                  from: senderPhone,
                  id: `wamid.Simulated${Date.now()}`,
                  timestamp: `${Math.floor(Date.now() / 1000)}`,
                  text: { body: messageText },
                  type: "text"
                }
              ]
            },
            field: "messages"
          }
        ]
      }
    ]
  };
}

document.getElementById("send-btn").addEventListener("click", async () => {
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!message) return alert("Please enter a message!");

  const payload = buildMetaPayload(phone, message);
  appendLog(`Sending POST request to /webhook...`);

  try {
    const res = await fetch("/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    appendLog(`Response (${res.status}): ${text}`);
  } catch (err) {
    appendLog(`Error: ${err.message}`);
  }
});