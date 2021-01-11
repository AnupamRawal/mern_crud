const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FoodModel = require("./models/Food");
const cors = require("cors");
const { port, endpoint } = require('./config');

app.use(express.json()); //used to convert data into json form front end
app.use(cors()); //used for cors origin issue with localhost

mongoose.connect(endpoint, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post('/insert', async (req, res) => {
    const foodName = req.body.foodName;
    const days = req.body.days;
    const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });

    try {
        await food.save();
        res.send("data inserted succesfully")
    } catch (error) {
        console.log(error);
    }
})

app.get('/read', async (req, res) => {
    FoodModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }

        res.send(result);
    });
})

app.put('/update', async (req, res) => {
    const id = req.body.id;
    const newFoodName = req.body.updatedName;
    // debugger

    try {
        await FoodModel.findById(id, (err, element) => {
            // debugger
            element.foodName = newFoodName;
            // debugger;
            element.save();
            res.send('update');
        })
    } catch (error) {
        res.send(error);
    }
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await FoodModel.findByIdAndRemove(id).exec();
    res.send(id);
});


app.listen(port, () => {
    console.log("server running on port 3001 with express and working");
})