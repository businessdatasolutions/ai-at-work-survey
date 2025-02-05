# AI Survey App

De **AI Survey App** bestaat uit twee hoofdonderdelen:

1. **Enquêteformulier** – Gebruikers vullen een dynamisch gegenereerd formulier in, waarbij meningen en open reacties worden vastgelegd. Na inzending wordt de data via een DigitalOcean Serverless Function doorgestuurd naar een database (bijvoorbeeld Baserow).

2. **Resultaten Overzicht** – Een aparte module haalt de opgeslagen resultaten uit de database op via een (tweede) DigitalOcean Serverless Function en bouwt daarmee een visueel overzicht, waarbij de data onder andere wordt gepresenteerd in grafieken en tekstuele samenvattingen.

## Functionaliteit

### Enquêteformulier

- **Dynamische vragen:** De vragen worden opgedeeld in verschillende secties (zoals *Productivity Changes*, *Skill Changes*, enzovoort) en worden gegenereerd vanuit een JavaScript-array.
- **Input Types:** Ondersteuning voor zowel Likert-schaal (via radio buttons) als open tekstvelden.
- **Interactieve styling:** Bij selectie verandert de stijl van de labels om de gekozen optie visueel te benadrukken.
- **Data Verwerking:** Na het indienen worden de antwoorden verzameld en gestructureerd. De antwoorden worden vervolgens in een object (met de bijbehorende identificatoren) verwerkt.

### Data Verzamelen via Serverless Function

- **Serverless Integratie:** Na het verzamelen van de antwoorden wordt de data via een POST-request verstuurd naar een DigitalOcean Serverless Function.
- **Database Connectie:** De serverless functie ontvangt de data en stuurt deze door naar een externe database (bijvoorbeeld Baserow) voor opslag.
- **Omgevingsvariabelen:** Gevoelige informatie zoals API-tokens wordt beheerd via omgevingsvariabelen.

### Resultaten Overzicht

- **Data Ophalen:** Een aparte module in de applicatie roept een andere DigitalOcean Serverless Function aan om de eerder opgeslagen resultaten uit de database op te halen.
- **Visualisatie:** De opgehaalde resultaten worden gebruikt om een overzichtelijke rapportage te bouwen. Hierbij worden onder andere bar charts (met Chart.js) getoond voor de Likert-vragen en open tekstreacties apart weergegeven.
- **Realtime Weergave:** De gebruikers kunnen direct het overzicht van de resultaten zien na het ophalen van de data, wat een snelle feedback op de ingevulde enquête mogelijk maakt.

## Technische Details

- **Frontend Technologieën:**
  - **HTML, CSS en JavaScript:** De gebruikersinterface is opgebouwd met standaard webtechnologieën.
  - **Dynamische DOM Manipulatie:** De enquêtevragen en de rapportage worden dynamisch in de browser opgebouwd.
  - **Chart.js:** Voor het genereren van grafieken wordt Chart.js ingezet, wat zorgt voor een visuele representatie van de Likert-antwoordstatistieken.

- **Serverless Functions op DigitalOcean:**
  - **Data Verzenden:** Eén functie ontvangt de ingevulde enquêtegegevens en stuurt deze door naar de database.
  - **Data Ophalen:** Een tweede functie haalt de opgeslagen data op uit de database en retourneert deze in JSON-formaat.
  - **Node.js en Dependencies:** Beide functies zijn geschreven in Node.js. De functies maken gebruik van modules zoals `node-fetch` om externe API-aanroepen te doen.
  - **Configuratie:** Belangrijke credentials (zoals het API-token voor Baserow) worden beheerd via omgevingsvariabelen.

- **Integratie met Externe API's:**
  - **Baserow of een Alternatieve Database:** De serverless functies verbinden met een database om de enquêtegegevens op te slaan en op te halen. Zorg ervoor dat je de juiste API-tokens en database-/tabel-ID's in je configuratie opneemt.

## Installatie en Configuratie

1. **Clone de repository.**

2. **Gebruik je eigen middleware.**

3. **Pas de API URLs aan in de Frontend Code:**

   In je JavaScript-code vervang je de URL’s door de URL’s van je middleware (bijv. serverless function).

## Gebruik

- **Invullen van de Enquête:**
  - Open de applicatie in een moderne webbrowser.
  - Vul het formulier in en klik op "Submit" om de data te versturen.
  - De ingevulde data wordt zowel lokaal verwerkt (voor een visuele feedback) als doorgestuurd naar de database via de serverless functie.

- **Resultaten Bekijken:**
  - Na verzending of via een aparte interface kun je het overzicht van de resultaten zien.
  - De applicatie haalt de opgeslagen data op en bouwt hiermee een overzicht waarin de resultaten zowel in grafieken als in tekst worden weergegeven.

## Contributie

Contributies zijn welkom! Als je ideeën hebt voor verbeteringen of nieuwe features, open dan gerust een issue of doe een pull request.

## Licentie

Deze repository is gelicenseerd onder de [MIT License](LICENSE).