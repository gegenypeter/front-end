import React, { useEffect, useState } from "react";

function App() {
  const [allMailsState, setAllMailsState] = useState(false);
  const [newMailState, setNewMailState] = useState(false);
  const [searchState, setSearchState] = useState(false);
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [referenceInput, setReferenceInput] = useState("");
  const [rawData, setRawData] = useState([]);
  console.log(rawData);

  useEffect(async () => {
    const response = await fetch("http://localhost:6789/api/mails");
    const data = await response.json();
    console.log(data);
    setRawData(data);
  }, []);

  const createMail = () => {
        const newMail = {
          sender: fromInput,
          toWho: toInput,
          msg: messageInput,
          ref: Number(referenceInput)
        };
        fetch("http://localhost:6789/api/mails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMail),
        });
      };
      
    

  /* const NewMailInputs = () => {
  return (
    <div>
      <input type="email" placeholder='From' value={fromInput} onChange={(e) => setFromInput(e.target.value)}></input>
      <input type="text" placeholder='To' value={toInput} onChange={(e) => setToInput(e.target.value)}></input>
      <input type="text" placeholder='Message' value={messageInput} onChange={(e) => setMessageInput(e.target.value)}></input>
      <input type="number" placeholder='Reference' value={referenceInput} onChange={(e) => setReferenceInput(e.target.value)}></input>
      <button  onClick={() => createMail()} >Send</button>
    </div>
    )
};
 */

  const MailComp = ({ x }) => {
    console.log(x);
    return (
      <ul style={{ marginBottom: "50px" }}>
        <li>From: {x.from},</li>
        <li>To: {x.to}.</li>
        <li>Message: {x.message}.</li>
        <li>Reference: {x.reference}</li>
      </ul>
    );
  };

  const DataComp = () => {
    console.log(rawData);
    return rawData.map((x, index) => <MailComp key={index} x={x} />);
  };

  return (
    <div className="App">
      <button onClick={() => setAllMailsState(!allMailsState)}>
        All mails
      </button>
      <button onClick={() => setNewMailState(!newMailState)}>New mail</button>
      <button onClick={() => setSearchState(!searchState)}>Search</button>
      {allMailsState ? <DataComp /> : ""}
      {searchState ? <input type="number" placeholder="Pl: 12"></input> : ""}
      {newMailState ? (
        <div>
          <input
            type="email"
            placeholder="From"
            value={fromInput}
            onChange={(e) => setFromInput(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="To"
            value={toInput}
            onChange={(e) => setToInput(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="Message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          ></input>
          <input
            type="number"
            placeholder="Reference"
            value={referenceInput}
            onChange={(e) => setReferenceInput(e.target.value)}
          ></input>
          <button onClick={() => createMail()}>Send</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
