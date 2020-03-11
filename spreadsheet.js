require('dotenv').config()
const { GoogleSpreadsheet } = require('google-spreadsheet')

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET)

const testar = async () => {
  // console.log(JSON.stringify(config))
  await doc.useServiceAccountAuth(JSON.parse(process.env.GOOGLE_CREDS))

  await doc.loadInfo() // loads document properties and worksheets
  console.log(doc.title)
  await doc.updateProperties({ title: 'Ladeira' })

  const sheet = doc.sheetsByIndex[0] // or use doc.sheetsById[id]
  console.log(sheet.title)
  console.log(sheet.rowCount)

  // adding / removing sheets
  // const newSheet = await doc.addSheet({ title: 'hot new sheet!' })
  // await newSheet.delete()

  // create a sheet and set the header row
  const sheet2 = await doc.addSheet({ headerValues: ['name', 'email'] })

  // append rows
  const larryRow = await sheet2.addRow({ name: 'Larry Page', email: 'larry@google.com' })
  const moreRows = await sheet2.addRows([
    { name: 'Sergey Brin', email: 'sergey@google.com' },
    { name: 'Eric Schmidt', email: 'eric@google.com' }
  ])

  // read rows
  const rows = await sheet2.getRows() // can pass in { limit, offset }

  // read/write row values
  console.log(rows[0].name) // 'Larry Page'
  rows[1].email = 'sergey@abc.xyz' // update a value

  await rows[1].save() // save updates

  // await rows[1].delete() // delete a row
}
testar()
