import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import xIcon from "./assets/xIcon.svg";

export default function ParticipationForm({ language = "ro" }) {
  const [people, setPeople] = useState([{ name: "" }]);
  const [loading, setLoading] = useState(false);
  const [dietReq, setDietReq] = useState();
  const [answer, setAnswer] = useState();

  useEffect(() => {
    emailjs.init("Zg2tNKDovVnq2BsGd");
  }, []);

  const text = {
    title: {
      ro: "Vei participa?",
      en: "Will you attend?",
    },
    description: {
      ro: "Vă așteptăm cu drag!\nCompletează formularul de mai jos pentru a ne anunța decizia ta.",
      en: "We’re excited to have you!\nPlease fill out the form below to let us know your decision.",
    },
    personLabel: {
      ro: (i) => `Persoana ${i + 1}`,
      en: (i) => `Guest ${i + 1}`,
    },
    namePlaceholder: {
      ro: "Nume și Prenume",
      en: "Full Name",
    },
    addButton: {
      ro: "Adaugă încă o persoană",
      en: "Add another guest",
    },
    confirmLabel: {
      ro: "Confirmă prezența",
      en: "Confirm attendance",
    },
    yes: {
      ro: "Da",
      en: "Yes",
    },
    no: {
      ro: "Nu",
      en: "No",
    },
    dietLabel: {
      ro: "Preferințe alimentare",
      en: "Dietary preferences",
    },
    dietPlaceholder: {
      ro: "Vă rugăm să menționați orice intoleranțe sau preferințe alimentare (ex: vegetarian, vegan, alergii etc.)",
      en: "Please list any allergies or dietary preferences (e.g., vegetarian, vegan, etc.)",
    },
    submit: {
      ro: "Trimite răspuns",
      en: "Send response",
    },
    sending: {
      ro: "Se trimite...",
      en: "Sending...",
    },
    success: {
      ro: "Răspuns trimis cu succes!",
      en: "Response sent successfully!",
    },
    error: {
      ro: "Eroare la trimiterea formularului",
      en: "Error sending the form",
    },
  };

  const t = (key, ...args) => {
    const value = text[key][language];
    return typeof value === "function" ? value(...args) : value;
  };

  const handleInputChange = (index, field, value) => {
    const updatedPeople = [...people];
    updatedPeople[index][field] = value;
    setPeople(updatedPeople);
  };

  const addPerson = () => {
    setPeople((prevPeople) => [...prevPeople, { name: "" }]);
  };

  const removePerson = (index) => {
    setPeople((prevPeople) => prevPeople.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceId = "service_40jonz5";
    const templateId = "template_m3968ex";

    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        guests: people,
        dietReq: dietReq || "N / A",
        answer: answer,
        recipient: "karinagbr2000@gmail.com",
      });
      alert(t("success"));
    } catch (error) {
      console.error("Error", error);
      alert(t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="formCard">
      <h4 className="form-subtitle">{t("title")}</h4>
      <p style={{ textAlign: "center", whiteSpace: "pre-line" }}>
        {t("description")}
      </p>
      <form className="form" onSubmit={handleSubmit}>
        {people.map((person, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              alignItems: "start",
            }}
          >
            <label htmlFor={`name-${index}`}>{t("personLabel", index)}</label>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                marginBottom: "20px",
                justifyContent: "space-between",
              }}
            >
              <input
                id={`name-${index}`}
                type="text"
                placeholder={t("namePlaceholder")}
                value={person.name}
                onChange={(e) =>
                  handleInputChange(index, "name", e.target.value)
                }
                required
                className="inputField"
              />
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => removePerson(index)}
                  style={{ background: "none", border: "none" }}
                >
                  <img src={xIcon} alt="Remove" height={26} width={26} />
                </button>
              )}
            </div>
          </div>
        ))}
        <button type="button" onClick={addPerson} className="normalButton">
          {t("addButton")}
        </button>

        <div style={{ marginTop: "16px", marginBottom: "16px" }}>
          <p style={{ marginBottom: "8px" }}>{t("confirmLabel")}</p>
          <label style={{ marginRight: "16px" }}>
            <input
              onChange={(e) => setAnswer(e.target.value)}
              type="radio"
              name="attendance"
              value="Yes"
              required
            />{" "}
            {t("yes")}
          </label>
          <label>
            <input
              onChange={(e) => setAnswer(e.target.value)}
              type="radio"
              name="attendance"
              value="No"
              required
            />{" "}
            {t("no")}
          </label>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            alignItems: "start",
          }}
        >
          <label htmlFor="dietReq">{t("dietLabel")}</label>
          <textarea
            id="dietReq"
            placeholder={t("dietPlaceholder")}
            value={dietReq}
            onChange={(e) => setDietReq(e.target.value)}
            className="messageInput"
          />
        </div>

        <button className="submitButton" type="submit" disabled={loading}>
          {loading ? t("sending") : t("submit")}
        </button>
      </form>
    </section>
  );
}
