# AI Survey App

De **AI Survey App** is een webapplicatie die gebruikers in staat stelt om een enquête over de impact van AI op hun werkervaring in te vullen. De applicatie verzamelt reacties op verschillende vragen – zowel via meerkeuze (Likert-schaal) als open tekst – en verwerkt deze resultaten door ze weer te geven in een overzichtelijk rapport. Daarnaast wordt de ingevulde data via een DigitalOcean Serverless Function doorgestuurd naar een database (bijvoorbeeld Baserow) voor verdere opslag en analyse.

## Functionaliteit

- **Enquêteformulier:** De applicatie toont een set van gestructureerde vragen, ingedeeld in secties zoals *Productivity Changes*, *Skill Changes*, *Job Role Changes*, en meer.
- **Interactie en feedback:** Gebruikers kunnen hun mening geven door middel van radio buttons (Likert-schaal) en tekstvelden voor toelichtingen.
- **Data verwerking:** Na het invullen van de enquête worden de resultaten verzameld en geordend. Voor de Likert-vragen worden de scores geteld en visueel weergegeven middels grafieken (bar charts) met behulp van Chart.js.
- **Serverless integratie:** De verzamelde data wordt via een POST-request verstuurd naar een DigitalOcean Serverless Function, die vervolgens de gegevens doorstuurt naar een externe database.

## Gebruik

1. **Enquête invullen:**  
   Open de applicatie in een moderne webbrowser, vul het formulier in en klik op "Submit". De resultaten worden direct verwerkt en weergegeven in een rapportage sectie op de pagina.

2. **Resultaten bekijken:**  
   Na inzending verschijnt een overzicht met de samengevatte resultaten. Likert-vragen worden getoond als staafdiagrammen, terwijl open tekst reacties apart worden weergegeven.

3. **Data opslag:**  
   De ingevulde data wordt automatisch doorgestuurd naar een serverless functie via DigitalOcean. Deze functie verwerkt de data en verstuurt deze naar een database (bijv. Baserow), zodat je de resultaten later kunt analyseren of verwerken.

## Technische Details

- **Frontend:**
  - **HTML/CSS/JavaScript:** De gebruikersinterface is opgebouwd met standaard webtechnologieën.
  - **Dynamische formulier generatie:** De enquêtevragen worden dynamisch gegenereerd vanuit een JavaScript-array, waarbij voor elk type vraag (Likert of open text) een bijpassend input-element wordt gecreëerd.
  - **Chart.js:** Voor de visualisatie van de Likert-vragen wordt Chart.js gebruikt om de verzamelde scores als bar charts weer te geven.

- **Serverless Function:**
  - **DigitalOcean Serverless:** De applicatie maakt gebruik van een serverless functie, die wordt aangeroepen via een HTTP POST-request.
  - **Data forwarding:** De functie ontvangt de enquête data (in JSON-formaat), verwerkt deze en stuurt de data door naar een externe database (bijvoorbeeld Baserow).
  - **Node.js en Dependencies:** De functie is geschreven in Node.js en maakt gebruik van de `node-fetch` module om externe API-aanroepen te doen.

- **Integratie met externe API's:**
  - **Baserow:** In de serverless functie wordt de ontvangen data doorgezet naar een Baserow API endpoint. Hiervoor dien je in je configuratie de juiste API-token en database-/tabel-ID’s op te geven.
  - **Omgevingsvariabelen:** Belangrijke configuratiegegevens zoals het Baserow API-token worden via omgevingsvariabelen beheerd, zodat gevoelige data niet direct in de code staat.

## Installatie en Configuratie

1. **Clone de repository:**

   ```bash
   git clone https://github.com/jouw-gebruikersnaam/ai-survey-app.git
   cd ai-survey-app
   ```

2. **Installeer afhankelijkheden (voor de serverless functie):**

   Ga naar de directory van de serverless functie (bijv. `verzendData`) en voer uit:

   ```bash
   npm install
   ```

3. **Configureer omgevingsvariabelen:**

   Maak een `.env` bestand aan in de root of in de functie-directory met bijvoorbeeld:

   ```dotenv
   BASEROW_API_TOKEN=your_api_token_here
   ```

4. **Deploy de Serverless Function:**

   Zorg dat je de DigitalOcean CLI (`doctl`) hebt geïnstalleerd en geconfigureerd. Deploy vervolgens de functie met:

   ```bash
   doctl serverless deploy .
   ```

5. **Pas de API URL aan in de frontend code:**

   In de JavaScript-code van de frontend vervang je de placeholder URL door de URL die je van DigitalOcean hebt ontvangen.

## Contributie

Contributies zijn welkom! Als je ideeën hebt voor verbeteringen of nieuwe features, open dan gerust een issue of doe een pull request.

## Licentie

Deze repository is gelicenseerd onder de [MIT License](LICENSE).

---

Deze README biedt een helder overzicht van de functionaliteit en de belangrijkste technische aspecten van de AI Survey App. Door deze opzet kunnen ontwikkelaars en gebruikers snel begrijpen hoe de applicatie werkt en hoe ze deze kunnen deployen en integreren.