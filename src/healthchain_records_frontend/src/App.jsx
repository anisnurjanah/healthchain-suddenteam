import { useState } from 'react';
import { healthchain_records_backend } from 'declarations/healthchain_records_backend';

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    healthchain_records_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

import React, { useState } from 'react';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as healthChainIDL } from '.../declarations/healthchain';

const agent = new HttpAgent();
const healthChain = Actor.createActor(healthChainIDL, {
  agent,
  canisterId: 'YOUR_CANISTER_ID',
});

function App() {
  const [patientId, setPatientId] = useState('');
  const [patient, setPatient] = useState(null);

  const fetchPatient = async () => {
    const result = await healthChain.getPatient(patientId);
    setPatient(result);
  };

  return (
    <div>
      <input type="text" value={patientId} onChange={(e) => setPatientId(e.target.value)} />
      <button onClick={fetchPatient}>Fetch Patient</button>
      {patient && <div>{JSON.stringify(patient)}</div>}
    </div>
  );
}

export default App;

