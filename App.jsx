import React, { useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    service: "",
    date: "",
    time: "",
    name: "",
    phone: ""
  });

  // LOGIN PAGE
  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Login</h2>
        <button onClick={() => setUser(true)}>Login Demo</button>
      </div>
    );
  }

  // CHAT FLOW
  const questions = [
    "Which service do you want?",
    "Preferred date?",
    "Preferred time?",
    "Your name?",
    "Your phone?"
  ];

  const handleSend = () => {
    if (!input) return;

    let newForm = { ...form };

    if (step === 0) newForm.service = input;
    if (step === 1) newForm.date = input;
    if (step === 2) newForm.time = input;
    if (step === 3) newForm.name = input;
    if (step === 4) newForm.phone = input;

    setForm(newForm);
    setInput("");

    if (step < 4) {
      setStep(step + 1);
    } else {
      setAppointments([
        ...appointments,
        { ...newForm, status: "Pending" }
      ]);
      alert("Appointment Added!");
      setStep(0);
      setForm({
        service: "",
        date: "",
        time: "",
        name: "",
        phone: ""
      });
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>AI Appointment Dashboard</h2>

      <button onClick={() => setUser(null)}>Logout</button>

      <hr />

      <h3>Chat Booking</h3>
      <p>{questions[step]}</p>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>

      <hr />

      <h3>Appointments</h3>
      {appointments.map((a, i) => (
        <div key={i}>
          <p>
            {a.name} | {a.service} | {a.date} {a.time}
          </p>
        </div>
      ))}
    </div>
  );
}
