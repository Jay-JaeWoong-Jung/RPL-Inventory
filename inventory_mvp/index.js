//environment variable
const port = process.env.PORT ||3000;


//Constraints
const MAX_LENGTH_ITEM_NAME = 20;
const MAX_LENGTH_VENDOR_NAME = 20;
const MAX_LENGTH_PORT_NUMBER = 20;
const MAX_SIZE_ITEM_QUANTITY = 20;

//FINAL STRINGS
const BASE_URL = '/api/inventory';
const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());
//starting a localhost server
app.listen(port, () =>console.log('listening on port 3000....'));

// mock database
const inventoryDB = [
    {id: 1, item_name: 'bolts', vendor: "wallmart", part_number: "1", quantity: "10"},
    {id: 2, item_name: 'nuts', vendor: "costco", part_number: "1", quantity: "0"},
    {id: 3, item_name: 'nuts', vendor: "costco", part_number: "5", quantity: "0"},
    {id: 4, item_name: 'screws', vendor: "target", part_number: "1", quantity: "5"}    
];

//JSON structure
const sampleJSON = [
    {
        item: "bolt",
        vendor: "costco",
        part_number: "132",
        quantity: "27"
    }
]

//validates the JSON format in the request body
// all 4 key and value pairs are required and must not be empty
// part_number is being treated as a string
function validateEntryFormat(entry) {
    const schema = {
        item: Joi.string().min(1).required(),//non empty requirement
        vendor: Joi.string().min(1).required(), //non empty requirement
        part_number: Joi.string().min(1).required(), //non empty requirement
        quantity: Joi.number().min(0).required() //non negative requirement
    };
    return Joi.validate(entry, schema);
}

//returns true if the entry combination of item_name, part_number, and vendor exists
function getEntry(input) {
    const entry = inventoryDB.find(c => 
        c.item_name === input.item
        && (c.part_number === input.part_number) 
        && (c.vendor === input.vendor) 
    );

    return entry;
}
function updateEntryQuantity(currEntry, newEntry) {
    currEntry.quantity = parseInt(currEntry.quantity) + parseInt(newEntry.quantity);
}

//add a new entry API route
app.post(BASE_URL, (req, res) => {
    const {error} = validateEntryFormat(req.body);
    if(error) return res.status(404).send(error.details[0].message); 
    if(getEntry(req.body))
        return res.status(404).send('the entry combination of item, vendor, and part# already exists. Try updating an existing entry');

    const entry = {
        id: inventoryDB.length + 1,
        item_name: req.body.item,
        vendor: req.body.vendor,
        part_number: req.body.part_number,
        quantity: req.body.quantity
    };
    inventoryDB.push(entry);
    res.send(inventoryDB);

});

//update an entry's quantity API route
    //app.put(BASE_URL + '/:item', (req, res) => {
    app.put(BASE_URL, (req, res) => {
        const {error} = validateEntryFormat(req.body);
        if(error) return res.status(404).send(error.details[0].message);
        const entry = getEntry(req.body);
        if(!entry)
            return res.status(404).send('the entry combination does not exist. consider posting a new entry');
        
        updateEntryQuantity(entry, req.body);
        res.send(inventoryDB);
        

});


app.put
