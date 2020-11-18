import xlsx from 'xlsx'
import axios from 'axios'

const importIndustryBetas = async () => {
    const workbook = xlsx.readFile('/Users/teodordanielsen/Downloads/betaGlobal.xls')
    const sheet = workbook.Sheets['data']
    const data = xlsx.utils.sheet_to_json(sheet)
    console.log(data)
}

importIndustryBetas()