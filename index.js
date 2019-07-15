const express = require('express')
const app = express()
const port = 3000

const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function createPDFExample() {
    try {
        const { stdout, stderr } = await exec('unoconv -f docx index.js');
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
        return 'index.docx'
    } catch(err) {
        console.log('Error in unoconv : ' + err);
    }
}


app.get('/', async (req, res) => {
    const outfile = await createPDFExample();
    res.download(outfile);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))