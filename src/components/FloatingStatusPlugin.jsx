// FloatingStatusPlugin.jsx
import React, { useState, useRef } from "react";
import Draggable from "react-draggable";
import { sendMessage } from "../api/api";

export default function FloatingStatusPlugin({ selectedMsg }) {
  const [status, setStatus] = useState("read");
  const nodeRef = useRef(null);

  const sendStatusPayload = () => {
    if (!selectedMsg) return alert("No message selected");

    const payload = {
      payload_type: "whatsapp_webhook",
      _id: "conv1-msg2-status", // static as per provided payload
      metaData: {
        entry: [
          {
            changes: [
              {
                field: "messages",
                value: {
                  messaging_product: "whatsapp",
                  metadata: {
                    display_phone_number: selectedMsg.to || "918329446654",
                    phone_number_id: "629305560276479" // static as per provided payload
                  },
                  statuses: [
                    {
                      conversation: {
                        id: "conv1-convo-id",
                        origin: {
                          type: "user_initiated"
                        }
                      },
                      gs_id: "conv1-msg2-gs-id",
                      id: selectedMsg.meta_msg_id || "wamid.HBgMOTE5OTY3NTc4NzIwFQIAEhgg...",
                      meta_msg_id: selectedMsg.meta_msg_id || "wamid.HBgMOTE5OTY3NTc4NzIwFQIAEhgg...",
                      recipient_id: selectedMsg.wa_id || "919937320320",
                      status: status,
                      timestamp: Math.floor(Date.now() / 1000).toString()
                    }
                  ]
                }
              }
            ],
            id: "30164062719905278"
          }
        ],
        gs_app_id: "conv1-app",
        object: "whatsapp_business_account",
        startedAt: new Date().toISOString().replace("T", " ").split(".")[0],
        completedAt: new Date().toISOString().replace("T", " ").split(".")[0],
        executed: true
      }
    };

    sendMessage(payload)
      .then(() => {
        alert(`Status "${status}" sent for message: ${selectedMsg.message_body}`);
      })
      .catch((err) => {
        console.log("Payload: ", payload)
        console.log("Failed to send status:", err);
        alert("Error sending status");
      });
  };

  return (
    <Draggable nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        style={{
          position: "fixed",
          top: 100,
          right: 50,
          background: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "8px",
          width: "250px",
          zIndex: 9999
        }}
      >
        <h4>Status Sender</h4>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: "100%", marginBottom: "10px" }}
        >
          <option value="sent">Sent</option>
          <option value="delivered">Delivered</option>
          <option value="read">Read</option>
        </select>

        <button onClick={sendStatusPayload} disabled={!selectedMsg}>
          Send Status
        </button>

        <div style={{ marginTop: "10px", fontSize: "12px" }}>
          {selectedMsg ? (
            <>
              <strong>Selected:</strong> {selectedMsg.message_body}
            </>
          ) : (
            "Click a message to select it"
          )}
        </div>
      </div>
    </Draggable>
  );
}
