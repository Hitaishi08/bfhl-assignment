const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data || [];
        const fullName = 'Hitaishi';
        const dob = '08072005';
        
        const numbers = data.filter(item => !isNaN(item) && item.trim() !== '');
        const alphabets = data.filter(item => /^[a-zA-Z]+$/.test(item));
        const specialChars = data.filter(item => !/^[a-zA-Z0-9]+$/.test(item) && !/^\d+$/.test(item));
        
        const evenNumbers = numbers.filter(num => parseInt(num) % 2 === 0).map(String);
        const oddNumbers = numbers.filter(num => parseInt(num) % 2 !== 0).map(String);
        const uppercaseAlphabets = alphabets.map(letter => letter.toUpperCase());
        
        const sum = numbers.reduce((acc, num) => acc + parseInt(num), 0).toString();
        
        let concatString = '';
        alphabets.reverse().forEach((char, index) => {
            const c = char.toUpperCase();
            concatString += index % 2 === 0 ? c : c.toLowerCase();
        });

        res.status(200).json({
            is_success: true,
            user_id: `${fullName.toLowerCase()}_${dob}`,
            email: 'hitaishi1666.be22@chitkara.edu.in',
            roll_number: '2210991666',
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: uppercaseAlphabets,
            special_characters: specialChars,
            sum: sum,
            concat_string: concatString
        });
    } catch (error) {
        res.status(400).json({
            is_success: false,
            error_message: error.message
        });
    }
});

module.exports.handler = serverless(app);