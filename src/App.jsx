import React, { useEffect, useRef, useState } from "react";
import CountdownTimer from "./CountdownTimer";
import locationIcon from "./assets/locationIcon.svg";
import clockIcon from "./assets/clockIcon.svg";
import mapIcon from "./assets/mapIcon.svg";
import ParticipationForm from "./ParticipationForm";
import usImage from "./assets/usImage.jpg";
import p7 from "./assets/p7.jpg";
import connectionImage from "./assets/connectionImage.png";

export default function App() {
  const detailsRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [language, setLanguage] = useState("ro");

  const text = {
    headerTitle: {
      ro: "Karina & Jafer",
      en: "Karina & Jafer",
    },
    headerDate: {
      ro: "24 Mai 2026 - București",
      en: "24 May 2026 - Bucharest",
    },
    loveSubtitle: {
      ro: "Iubirea noastră",
      en: "Our Love",
    },
    loveTitle: {
      ro: "Împărtășită cu voi",
      en: "Shared with You",
    },
    paragraph1: {
      ro: "Sunt momente în viață care ating inima cu o intensitate aparte — clipe care ne umplu sufletul de emoție și ne dau curajul să visăm mai departe.",
      en: "There are moments in life that touch the heart deeply — moments that fill our souls with emotion and give us courage to dream further.",
    },
    paragraph2: {
      ro: "Cu pași siguri, pornim împreună pe drumul vieții, ghidați de iubirea care ne leagă și de dorința de a clădi un viitor comun.",
      en: "With steady steps, we begin our journey together, guided by the love that binds us and the desire to build a shared future.",
    },
    paragraph3: {
      ro: "Cu multă emoție și bucurie, vă invităm să fiți alături de noi în ziua în care sufletele noastre își unesc destinele.",
      en: "With great emotion and joy, we invite you to be with us on the day our souls unite in destiny.",
    },
    parentsHeader: {
      ro: "Alături de părinții noștri",
      en: "Together with our parents",
    },
    joinUs: {
      ro: "Vă așteptăm să fiți alături de noi!",
      en: "We look forward to having you with us!",
    },
    locationLabel: {
      ro: "Locație",
      en: "Location",
    },
    venueName: {
      ro: "Bokaa",
      en: "Bokaa",
    },
    venueAddress: {
      ro: "Aleea Cu Brazi 3-5, Buftea 070000, România",
      en: "Aleea Cu Brazi 3-5, Buftea 070000, Romania",
    },
    venueTime: {
      ro: "24 Mai 2026, 17:00",
      en: "24 May 2026, 17:00",
    },
    mapLink: {
      ro: "Vezi harta",
      en: "View map",
    },
    footerDate: {
      ro: "24 Mai 2026 - București",
      en: "24 May 2026 - Bucharest",
    },
  };

  const t = (key) => text[key][language];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (detailsRef.current) {
      observer.observe(detailsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <header>
        <div className="overlay" />
        <div className="language-switch">
          <button
            className={`switch-button-left ${language === "ro" ? "selected" : ""}`}
            onClick={() => setLanguage("ro")}
          >
            🇷🇴 Română
          </button>
          <button
            className={`switch-button-right ${language === "en" ? "selected" : ""}`}
            onClick={() => setLanguage("en")}
          >
            🇬🇧 English
          </button>
        </div>

        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1 className="nameTitle">{t("headerTitle")}</h1>
          <h5 className="headerDate">{t("headerDate")}</h5>
        </div>
      </header>

      <img
        src={connectionImage}
        alt="Connection"
        width="150px"
        height="auto"
        style={{
          objectFit: "contain",
          display: "block",
          margin: "0 auto",
        }}
      />

      <div
        ref={detailsRef}
        style={{ marginTop: 0, paddingRight: 30, paddingLeft: 30 }}
      >
        <img
          src={usImage}
          alt="Wedding Invitation"
          className={`wedding-image ${inView && "slide-in"}`}
        />
        <div className={`wedding-image-text ${inView && "slide-in"}`}>
          <h4 className="wedding-image-subtitle">{t("loveSubtitle")}</h4>
          <h3 className="wedding-image-title">{t("loveTitle")}</h3>
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
          <p>{t("paragraph3")}</p>
        </div>
      </div>
      <h4 className="parentsHeader">{t("parentsHeader")}</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
          gap: "46px",
        }}
      >
        <h3 className="parentsNames">
          Monica & Lucian <br /> Gabor
        </h3>
        <h3 className="parentsNames">
          Liliana & Jamal <br /> Nusier
        </h3>
      </div>

      <div className="eventDate">
        <div className="overlay" />
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h1 className="nameTitle">{t("joinUs")}</h1>
          <h5 className="headerDate">{t("headerDate")}</h5>
        </div>
      </div>

      <h4 className="wedding-image-subtitle" style={{ marginLeft: 30 }}>
        {t("locationLabel")}
      </h4>

      <div className="locationCard">
        <img
          src={p7}
          alt="Wedding Location"
          height={213}
          style={{ objectFit: "cover" }}
        />
        <div className="locationCardText">
          <span style={{ fontSize: "21px", textTransform: "uppercase" }}>
            {t("venueName")}
          </span>
          <div className="iconText">
            <img
              src={locationIcon}
              alt="Location Icon"
              height={16}
              width={16}
            />
            <span>{t("venueAddress")}</span>
          </div>
          <div className="iconText">
            <img src={clockIcon} alt="Clock Icon" height={16} width={16} />
            <span>{t("venueTime")}</span>
          </div>
          <a
            href="https://maps.app.goo.gl/qwjXZC6S1M968pwB9"
            target="_blank"
            rel="noopener noreferrer"
            className="iconText"
            style={{ textDecoration: "none", color: "#000" }}
          >
            <img src={mapIcon} alt="Map Icon" height={16} width={16} />
            <span>{t("mapLink")}</span>
          </a>
        </div>
      </div>

      <div className="formCardImage">
        <div className="overlay" />
        <ParticipationForm language={language} />
      </div>

      <div style={{ textAlign: "center", padding: "0 2rem 2rem 2rem" }}>
        <img
          src={connectionImage}
          alt="Connection"
          width="150px"
          height="auto"
          style={{ objectFit: "contain" }}
        />
        <h1 className="footerTitle">{t("headerTitle")}</h1>
        <h5 className="footerDate">{t("footerDate")}</h5>
      </div>
    </>
  );
}
