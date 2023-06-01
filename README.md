# Import time entries into  [Productive](https://developer.productive.io/) via PDF, CSF or JSON files

*Since there are no breaks in productive, the come and go times are not imported by default. Just the total working hours per day are stored.*


## 💡 Requirements
- Node.js 18 (works also with 16+, but slower, and experimental hints)
- Git


## 🚀 Setup

- Choose compatible node version `nvm use`
- Install dependencies `npm install`
- Export time entries from third-party systems and save them in the `./time-entries` directory (PDF, CSV or JSON allowed)
- Copy the `.env-sample` as `.env` file and enter your data
- Compile, convert and import data into productive with `npm start` or do it manually step by step
  * `npm run compile`
  * `npm run convert`
  * `npm run import`


## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                                              |
|:-----------------------|:--------------------------------------------------------------------|
| `npm install`          | Installs dependencies                                               |
| `npm start`            | Alias for `npm run compile`, `npm run convert` and `npm run import` |
| `npm run compile`      | Alias for `npm run format` and transpile typescript source code     |
| `npm run format`       | Format typescript source code with prettier                         |
| `npm run convert`      | Alias for `npm run convert:csv` and `npm run convert:json`          |
| `npm run convert:csv`  | Use tabula to recognize data from PDFs and extract them as CSV      |
| `npm run convert:json` | Convert csv to json                                                 |
| `npm run import`       | Import json with Productive V2 API                                  |


## 💁 FAQ

### Where can I find the organization id?

Login to [productive](https://app.productive.io) and copy the ID from the URL.

`app.productive.io/`**9314**`-company/dashboards/71632`

### Where can I find the user id?

Login to [productive](https://app.productive.io), go to your account page and copy the ID from the URL.

`app.productive.io/9314-company/people/`**438083**`/overview`

### Where can I find the service id?

Login to [productive](https://app.productive.io), click on the blue **Add** button "Time entry", choose project, service, open DevTools Network tab in Google Chrome and click on save.

Look for the POST Request `https://api.productive.io/api/v2/time_entries` and open the response `relationships.service.data.id`

### How to generate authorization token for API?

Login to [productive](https://app.productive.io), go to [api integration page](https://app.productive.io/[YOUR_ORGANISATION_ID]/settings/api-integrations) and generate a Personal Access API Token with Read / Write Permissions.

### Your PDF to CSV Task is not working?

In principle, this can have many causes. Sometimes the PDF version is outdated, encrypted, or the PDF is an unsupported XFA-PDF.

Firefox PDF Reader can open these PDF files. The "print and save as PDF" trick can be used to save outdated or broken PDF as compatible PDF.

Otherwise, the [PDF reader](https://mozilla.github.io/pdf.js/web/viewer.html) can also be used directly as an online tool in Google Chrome.

### Your CSV to JSON Task is not working?

Below is an example of a compatible CSV file:

```
Datum,"Tätigkeit
von","Tätigkeit
bis","Pause
in Std.","Faktura
in Std.",KM,Beschreibung der Tätigkeit
02.05.2023,09:30:00,18:30:00,"0,50","8,50",0,ABC-2021 Pact-Broker / Bearer Authentication
03.05.2023,08:30:00,17:00:00,"0,50","8,00",0,"Pact-Broker-Test, ENV AWS Secret Manager"
```