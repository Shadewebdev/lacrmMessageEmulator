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
  const payload = buildMetaPayload(phone, message);

  try {
    // Browser sends request to Vite (port 5173).
    // Vite proxies it under the hood to Firebase Emulator (port 5001).
    const res = await fetch("/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // To be fixed

    const text = await res.text();
    console.log("HTTP Status: ", res.status);
    console.log("Raw Response", text);
    // Parse the text as JSON since Firebase Cloud Function returns a structured log/object
    const jsonResponse = JSON.parse(text);

    // Extract the nested 'message' string and parse it as JSON if it's stringified
    const messageData = JSON.parse(jsonResponse.payload);

    // The actual text body inside the WhatsApp payload
    const responseBody = messageData.text.body;

    appendLog(`${res.url}: ${responseBody}`);
    // appendLog(body);
    // console.log("Firebase Emulator Response:", text);
  } catch (err) {
    console.error("Error:", err);
  }
});