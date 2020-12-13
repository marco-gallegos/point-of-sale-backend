const bcrypt = require("bcrypt")

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question(`give me a word to generate password: `, async (password) => {
    const hashPassword = await bcrypt.hash(password, 14)

    console.table({
        password: hashPassword
    })
    readline.close()
})

