const fs = require('fs');
const pool = require("../config");
const bcrypt = require("bcrypt");
const jwt = require(`jsonwebtoken`);
const mongoose = require('mongoose');
const { validateAdminSignin, validateAdminSignup } = require(`../schemas/admin`);
const { validateProduct } = require('../schemas/product');
const User = require('../models/users');

const nodemailer = require(`nodemailer`);
const Product = require("../models/products");
const Staff = require("../models/staff");
const Client = require("../models/client");
const Orders = require('../models/orders');
const Expense = require("../models/expense")
const Event = require("../models/event");
const appointments = require('../models/appointments');
require(`dotenv`).config();

var transporter = nodemailer.createTransport({
    service: `gmail`,
    auth: {
        user: process.env.GMAILUSER,
        pass: process.env.GMAILPASSWORD
    }
});


module.exports.createAdmin = async (req, res) => {
    const { error } = validateAdminSignup(req.body);
    if (error) {
        var e = "";
        error.details.forEach(element => {
            e = e + " " + element.message;
        });

        return res.status(400).json(e);
    }

    const { email, password, name } = req.body;
    var user;
    try {
        user = await User.findOne({ email: email });
    } catch (err) {
        return res.status(500).json("Server Error1!");
    }
    console.log(user);
    if (user && user.activated) {
        return res.status(422).json("User already Registered, please login!");
    }
    else if (user && !user.activated) {
        try {
            let date = new Date();
            let expTime = date.getTime() + 1000 * 60 * 60;   //this generates the time of (current time + one hour)
            const payload = {
                role: `admin`,
                expTime
            }
            const expTimeToken = jwt.sign(payload, process.env.SECRET, { expiresIn: "1hr" });

            // const newAdmin = await pool.query(`UPDATE users SET temporaryToken=$1 WHERE user_id=$2 RETURNING *`, [expTimeToken, existingAdmin.rows[0].user_id]);
            try {
                // tempstaff = await staff.findById(id);
                const updatedUser = await User.findByIdAndUpdate(user.id, {
                    expTimeToken: expTimeToken
                }, { new: true });
            } catch (error) {
                return res.status(500).json("Server Error!")
            }

            var mailOptions = {
                from: process.env.GMAILUSER,
                to: email,
                subject: `Activate Account`,
                text: `Click the below button to confirm your email!`,
                html: `<body style="border-radius:2%;border: 1px solid orangered;background:linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(81,92,114,1) 53%, rgba(67,73,73,1) 100%);padding: 30px;"><h1 style="color: rgb(177, 59, 59)">Hello  <strong>` + name + `</strong>,</h1><h3 style="color: rgb(146, 146, 158)">Thank you for registering at MyVGym app. Please click the button below to complete your activation:</h3><button style="padding: 10px;border: 1px solid red; background:none"><a style = "color: #eaeef5c7; text-decoration: none; padding: 15px; font-size: 20px;"href="http://localhost:3000/verify/${expTimeToken}` + `">Activate Account</button></body>`
            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Email sent: ` + info.response);
                }
            });

            return res.json({ expTimeToken: expTimeToken, mail: true });
        } catch (err) {
            return res.status(500).json(`Server Error2!`);
        }

    }
    else {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        try {
            let date = new Date();
            let expTime = date.getTime() + 1000 * 60 * 60;   //this generates the time of (current time + one hour)
            const payload = {
                role: `admin`,
                expTime
            }
            const expTimeToken = jwt.sign(payload, process.env.SECRET, { expiresIn: "1hr" });

            // const newAdmin = await pool.query(`INSERT INTO users(name, email, password, temporarytoken)  VALUES($1, $2, $3, $4) RETURNING *`, [name, email, bcryptPassword, expTimeToken]);
            user = new User({
                name,
                password: bcryptPassword,
                email,
                temporaryToken: expTimeToken,
                role: 'admin'
            })

            try {
                await user.save();
            } catch (error) {
                return res.status(500).json("Server Error!");
            }

            var mailOptions = {
                from: process.env.GMAILUSER,
                to: email,
                subject: `Activate Account`,
                text: `Click the below button to confirm your email!`,
                html: `<body style="border-radius:2%;border: 1px solid orangered;background:linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(81,92,114,1) 53%, rgba(67,73,73,1) 100%);padding: 30px;"><h1 style="color: rgb(177, 59, 59)">Hello  <strong>` + name + `</strong>,</h1><h3 style="color: rgb(146, 146, 158)">Thank you for registering at MyVGym app. Please click the button below to complete your activation:</h3><button style="padding: 10px;border: 1px solid red; background:none"><a style = "color: #eaeef5c7; text-decoration: none; padding: 15px; font-size: 20px;"href="http://localhost:3000/verify/${expTimeToken}` + `">Activate Account</button></body>`
            }
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(`Email sent: ` + info.response);
                }
            });

            return res.json({ expTimeToken: expTimeToken, mail: true });
        } catch (err) {
            return res.status(500).json(`Server Error!`);
        }
    }
};


module.exports.addProduct = async (req, res) => {
    // const { error } = validateProduct(req.body);
    // if (error) {
    //     var e = "";
    //     error.details.forEach(element => {
    //         e = e + " " + element.message;
    //     });

    //     return res.status(400).json(e);
    // }

    const { name, type, brand, retailprice, saleprice, quantity, model, modelYear, part_ID, make, details } = req.body;
    console.log(name + 'sdadadadadadadsadadadaaaaa');
    if (!req.file) return res.send('Please upload a file');

    console.log(details)
    let product = new Product({
        name,
        type,
        brand,
        retailprice,
        saleprice,
        quantity,
        model,
        modelYear,
        part_ID,
        make,
        image: req.file.path,
        description: details
    })

    var user;
    var id = req.user.id;
    console.log(user)
    try {
        user = await User.findById(id);
        console.log(product)
    } catch (error) {
        return res.status(500).json(error.message)
    }

    if (!user) {

        return res.status(500).json('User not foundaaa!')
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await product.save({ session: sess });
        user.products.push(product); //this push is the method of mongoose not array, it takes the id from the staff and stores it in user
        await user.save({ session: sess });
        console.log(product)
        await sess.commitTransaction();
    } catch (error) {
        console.log(error.message)
        return res.status(500).json(error.message);
    }

    // try {
    //     const product = await pool.query("INSERT INTO products(admin_id, name, type, brand, regularPrice, salePrice, quantity, length, height, width, weight, color, quality, details) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *", [req.user.id, productName, type, brand, regularPrice, salePrice, quantity, length, height, width, weight, color, quality, details]);

    // } catch (err) {
    //     return res.status(500).json(err.message)
    // }
    return res.json("Product Added");
    // let product = new Product({
    //     name, type, brand, retailprice, saleprice, quantity, model, modelYear, part_ID, weight, make, quality, details
    // });
    // try {
    //     await product.save();
    // } catch (error) {
    //     return res.status(500).json(error.message);
    // }
    // let user;
    // try {
    //     user = await User.findById(req.user.id);
    // } catch (error) {
    //     return res.status(500).json(error.message);
    // }

    // if (!user) {
    //     return res.status(500).json(error.message);
    // }

    // try {
    //     const sess = await mongoose.startSession();
    //     sess.startTransaction();
    //     await product.save({ session: sess });
    //     user.products.push(product); //this push is the method of mongoose not array, it takes the id from the staff and stores it in user
    //     await user.save({ session: sess });
    //     await sess.commitTransaction();
    // } catch (error) {
    //     return res.status(500).json(error.message);
    // }

    // // try {
    // //     const product = await pool.query("INSERT INTO products(admin_id, name, type, brand, regularPrice, salePrice, quantity, length, height, width, weight, color, quality, details) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *", [req.user.id, productName, type, brand, regularPrice, salePrice, quantity, length, height, width, weight, color, quality, details]);

    // // } catch (err) {
    // //     return res.status(500).json(err.message)
    // // }
    // return res.json({ p: "Product Added" });
};

module.exports.addEvent = async (req, res) => {

    const a = JSON.parse(req.header('Event'))

    let expense = new Event({
        name: a.name,
        description: a.description,
        allDay: a.allDay,
        start: a.startDate,
        end: a.endDate
    })

    try {
        await expense.save();
    } catch (error) {
        return res.status(500).json("Server Error!");
    }
    console.log(a)
    return res.json({ message: "New Event Added Sucessfully" });

};


module.exports.addExpense = async (req, res) => {

    const a = JSON.parse(req.header('expense'))

    let expense = new Expense({
        name: a.name,
        cost: a.cost,
        quantity: a.quantity,
        description: a.description,
        expenseType: a.expenseType
    })

    try {
        await expense.save();
    } catch (error) {
        return res.status(500).json("Server Error!");
    }
    console.log(a)
    return res.json("Expense Added");

};


module.exports.deleteExpense = async (req, res) => {
    var id = req.header('name');
    console.log('isWorking');
    let expense;
    try {
        expense = await Expense.findByIdAndDelete({ _id: id })

        return res.json({ message: `${expense.name} is Removed` });

    } catch (err) {
        console.log(err.message)

        return res.status(500).json("Server Error!");
    }
}


module.exports.getExpense = async (req, res) => {
    var expense;
    try {
        expense = await Expense.find({});
        // console.log({expense: Expense.map(product => product.toObject({ getters: true }))})
        return res.json({ expense: expense })

    } catch (err) {
        return res.status(500).json(err.message);
    }
};



module.exports.getEvent = async (req, res) => {
    var event;
    try {
        event = await Event.find({});
        // console.log({expense: Expense.map(product => product.toObject({ getters: true }))})
        console.log(event)
        return res.json({ event: event })

    } catch (err) {
        return res.status(500).json(err.message);
    }
    // return res.status(500).json('err.message');
};






module.exports.addStaff = async (req, res) => {
    console.log("mmmmmmmmmmm" + req.user.id)
    // const { error } = validateProduct(req.body);
    // if (error) {
    //     var e = "";
    //     error.details.forEach(element => {
    //         e = e + " " + element.message;
    //     });

    //     return res.status(400).json(e);
    // }

    const {
        firstName,
        lastName,
        email,
        address,
        designation,
        idNumber,
        education,
        country,
        state,
        experience,
        skills,
        additionalDetails,
        phoneNumber,
    } = req.body;

    if (!req.file) return res.send('Please upload a file');

    let staff = new Staff({
        firstName,
        lastName,
        email,
        address,
        designation,
        idNumber,
        education,
        country,
        state,
        experience,
        skills,
        phoneNumber,
        additionalDetails,
        image: req.file.path,
        creator: req.user.id
    })

    var user;
    var id = req.user.id;
    console.log(id)
    try {
        user = await User.findById(id);
        // console.log(user)
    } catch (error) {
        return res.status(500).json(error.message)
    }

    if (!user) {
        return res.status(500).json('User not foundaaa!')
    }

    console.log("aaaaaaaaaaaaaaaaaaaaab")
    try {
        console.log("aaaaaaaaaaaaaaaaaaaaac")
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await staff.save({ session: sess });
        user.staff.push(staff);
        console.log("aaaaaaaaaaaaaaaaaaaaa") //this push is the method of mongoose not array, it takes the id from the staff and stores it in user

        await user.save({ session: sess });
        await sess.commitTransaction();
        console.log("aaaaaaaaaaaaaaaaaaaaahh")

    } catch (error) {
        return res.status(500).json(error.message);
    }

    // try {
    //     const product = await pool.query("INSERT INTO products(admin_id, name, type, brand, regularPrice, salePrice, quantity, length, height, width, weight, color, quality, details) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *", [req.user.id, productName, type, brand, regularPrice, salePrice, quantity, length, height, width, weight, color, quality, details]);

    // } catch (err) {
    //     return res.status(500).json(err.message)
    // }
    return res.json("Staff Created");
    // let product = new Product({
    //     name, type, brand, retailprice, saleprice, quantity, model, modelYear, part_ID, weight, make, quality, details
    // });
    // try {
    //     await product.save();
    // } catch (error) {
    //     return res.status(500).json(error.message);
    // }
    // let user;
    // try {
    //     user = await User.findById(req.user.id);
    // } catch (error) {
    //     return res.status(500).json(error.message);
    // }

    // if (!user) {
    //     return res.status(500).json(error.message);
    // }

    // try {
    //     const sess = await mongoose.startSession();
    //     sess.startTransaction();
    //     await product.save({ session: sess });
    //     user.products.push(product); //this push is the method of mongoose not array, it takes the id from the staff and stores it in user
    //     await user.save({ session: sess });
    //     await sess.commitTransaction();
    // } catch (error) {
    //     return res.status(500).json(error.message);
    // }

    // // try {
    // //     const product = await pool.query("INSERT INTO products(admin_id, name, type, brand, regularPrice, salePrice, quantity, length, height, width, weight, color, quality, details) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *", [req.user.id, productName, type, brand, regularPrice, salePrice, quantity, length, height, width, weight, color, quality, details]);

    // // } catch (err) {
    // //     return res.status(500).json(err.message)
    // // }
    // return res.json({ p: "Product Added" });
};


module.exports.updateStaff = async (req, res) => {
    var obj = {
        firstName: await req.header('firstName'),
        lastName: await req.header('lastName'),
        email: await req.header('email'),
        address: await req.header('address'),
        operationalArea: await req.header('operationalArea'),
        idNumber: await req.header('idNumber'),
        education: await req.header('education'),
        country: await req.header('country'),
        state: await req.header('state'),
        experience: await req.header('experience'),
        skills: await req.header('skills'),
        phoneNumber: await req.header('phoneNumber'),
        additionalDetails: await req.header('additionalDetails'),
    }

    let id = await req.header('id');
    console.log(obj);
    var user1 = null;
    try {
        // user = await User.
        user1 = await Staff.findByIdAndUpdate(id, obj, { new: true })
        console.log(user1)
        return res.json('User Updated');
    } catch (err) {
        return res.json('Could not find user!');
    }
}

module.exports.updateExpense = async (req, res) => {
    var obj = {
        name: await req.header('name'),
        cost: await req.header('cost'),
        description: await req.header('description'),
        expenseType: await req.header('expenseType'),
        quantity: await req.header('quantity'),
    }

    let id = await req.header('id');
    console.log(id);
    var user1 = null;
    try {
        // user = await User.
        user1 = await Expense.findByIdAndUpdate(id, obj, { new: true })
        console.log(user1)
        return res.json({ message: `${obj.name} Updated` });
    } catch (err) {
        return res.json('Could not find expense!');
    }
}

module.exports.updateClient = async (req, res) => {
    // const disabled1 = await req.header('disabled');
    const disabled1 = await req.header('disabled');
    let id = await req.header('id');
    console.log(disabled1)
    var user1 = null;
    try {
        // user = await User.
        user1 = await Client.findByIdAndUpdate(id, { disabled: disabled1, skills: 'asd' }, { new: true })
        console.log(user1)
        return res.json('done');
    } catch (err) {
        return res.json('Could not find user!');
    }
}


module.exports.updateTask = async (req, res) => {
    const disabled1 = await req.header('status');
    let id = await req.header('id');
    console.log(disabled1)
    var user1 = null;
    try {
        // user = await User.
        user1 = await appointments.findByIdAndUpdate(id, { status: disabled1 }, { new: true })
        console.log(user1)
        return res.json('done');
    } catch (err) {
        return res.json('Could not find appointment!');
    }
}

module.exports.getOrders = async (req, res) => {
    try {
        // user = await User.
        orders = await Orders.find()
        console.log(orders)
        return res.json({ client: orders });
    } catch (err) {
        return res.json('Could not find order!');
    }
}



module.exports.updateAdmin = async (req, res) => {
    console.log('i am in update Admin')
    var obj = {
        name: await req.header('name'),
        email: await req.header('email'),
        gender: await req.header('gender'),
        phoneNumber: await req.header('phoneNumber'),
        country: await req.header('country'),
        street: await req.header('street'),
        society: await req.header('society'),
        houseNumber: await req.header('houseNumber'),
        state: await req.header('state'),
        zip: await req.header('zip'),
        workshopName: await req.header('workshopName'),
        type: await req.header('type'),
        open: await req.header('open'),
        close: await req.header('close'),
        city: await req.header('city'),
        area: await req.header('area'),
    }

    let id = await req.header('id');
    console.log(id);
    var user1 = null;
    try {
        // user = await User.
        user1 = await User.findByIdAndUpdate(id, obj, { new: true })
        console.log(user1)
        return res.json('User Updated');
    } catch (err) {
        return res.json('Could not find user!');
    }
}


module.exports.addClient = async (req, res) => {
    // const { error } = validateProduct(req.body);
    // if (error) {
    //     var e = "";
    //     error.details.forEach(element => {
    //         e = e + " " + element.message;
    //     });

    //     return res.status(400).json(e);
    // }

    const {
        firstName,
        lastName,
        email,
        address,
        operationalArea,
        idNumber,
        education,
        country,
        state,
        experience,
        skills,
        additionalDetails,
        phoneNumber,
    } = req.body;

    if (!req.file) return res.send('Please upload a file');

    let client = new Client({
        firstName,
        lastName,
        email,
        address,
        operationalArea,
        idNumber,
        education,
        country,
        state,
        experience,
        skills,
        phoneNumber,
        additionalDetails,
        image: req.file.path,
        creator: req.user.id
    })

    var user;
    var id = req.user.id;
    console.log(id)
    try {
        user = await User.findById(id);
        // console.log(user)
    } catch (error) {
        return res.status(500).json(error.message)
    }

    if (!user) {
        return res.status(500).json('User not foundaaa!')
    }

    console.log("aaaaaaaaaaaaaaaaaaaaab")
    try {
        console.log("aaaaaaaaaaaaaaaaaaaaac")
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await client.save({ session: sess });
        console.log(client)
        user.client.push(client);
        console.log('done')
        console.log("aaaaaaaaaaaaaaaaaaaaa") //this push is the method of mongoose not array, it takes the id from the staff and stores it in user
        try {
            await user.save({ session: sess });
            await sess.commitTransaction();
        } catch (err) {
            console.log(err.message)
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }

    // try {
    //     const product = await pool.query("INSERT INTO products(admin_id, name, type, brand, regularPrice, salePrice, quantity, length, height, width, weight, color, quality, details) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *", [req.user.id, productName, type, brand, regularPrice, salePrice, quantity, length, height, width, weight, color, quality, details]);

    // } catch (err) {
    //     return res.status(500).json(err.message)
    // }
    return res.json("Client Created");

};



module.exports.getProducts = async (req, res) => {
    var products;
    try {
        userWithProducts = await User.findById(req.user.id).populate('products');
        return res.json({ products: userWithProducts.products.map(product => product.toObject({ getters: true })) });
    } catch (err) {
        return res.status(500).json(err.message);
    }
    // try {
    //     const products = await pool.query("SELECT * FROM products");
    //     return res.json(products.rows);
    // } catch (err) {
    //     return res.status(500).json(err.message);
    // }
};



module.exports.deleteProduct = async (req, res) => {
    var id = req.header('id');
    console.log('isWorking' + id);
    let product;
    try {
        product = await (await Product.findOneAndRemove({ _id: id })).populate('creator')
        console.log('staff', product)
        // delete = await User.deleteOne(where)
    } catch (err) {
        console.log(err.message)
        return res.json(err.message);
    }

    // try {
    //     // const sess = await mongoose.startSession();
    //     // sess.startTransaction();
    //     await product.remove({ session: sess });
    //     console.log(product.creator);
    //     product.creator.products.pull(product);
    //     console.log('sdadadadadadsadad');
    //     await product.creator.save({ session: sess });
    //     await sess.commitTransaction();
    // } catch (err) {
    //     console.log(err.message);
    //     return res.json(err.message);
    // }

    return res.json(`Client with Email (${product.name}) Deleted`);

}




module.exports.updateProducts = async (req, res) => {
    var obj = {
        name: await req.header('name'),
        type: await req.header('type'),
        brand: await req.header('brand'),
        saleprice: await req.header('saleprice'),
        retailprice: await req.header('retailprice'),
        part_ID: await req.header('part_ID'),
        quantity: await req.header('quantity'),
        model: await req.header('model'),
        modelYear: await req.header('modelYear'),
        make: await req.header('make'),
        description: await req.header('description'),
        discount: await req.header('discount'),
    }
    let id = await req.header('id');
    console.log(obj, id)
    // console.log(id);
    var user1 = null;
    try {
        // user = await User.
        user1 = await Product.findByIdAndUpdate(id, obj, { new: true })
        console.log(user1)
        return res.json({ message: `${obj.name} Updated` });
    } catch (err) {
        return res.json('Could not find expense!');
    }
}



module.exports.getTasks = async (req, res) => {
    console.log('llolollo')
    try {
        var task = await appointments.find();
        var client = [];
        console.log('task.length')
        console.log(task.length)
        for (var i = 0; i < task.length; i++) {
            client.push(await Client.findById(task[i].cid))
        }

        // console.log('task')
        // console.log(task)
        // console.log('client');
        // console.log('clientcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc');
        // console.log(client);
        // console.log({ staff: userWithStaff.staff.map(staff => staff.toObject({ getters: true })) })
        // console.log({ staff: userWithStaff.staff.map(staff => staff.toObject({ getters: true })) })
        // return res.json({ staff: userWithStaff.staff.map(staff => staff.toObject({ getters: true })) });
        return res.json({ client: client, task: task });

    } catch (err) {
        return res.status(500).json(err.message);
    }
}



module.exports.getStaff = async (req, res) => {
    console.log('llolollo')
    try {
        userWithStaff = await User.findById(req.user.id).populate('staff');
        console.log({ staff: userWithStaff.staff.map(staff => staff.toObject({ getters: true })) })
        console.log({ staff: userWithStaff.staff.map(staff => staff.toObject({ getters: true })) })
        return res.json({ staff: userWithStaff.staff.map(staff => staff.toObject({ getters: true })) });

    } catch (err) {
        return res.status(500).json(err.message);
    }
    // try {
    //     const products = await pool.query("SELECT * FROM products");
    //     return res.json(products.rows);
    // } catch (err) {
    //     return res.status(500).json(err.message);
    // }
}




module.exports.deleteClient = async (req, res) => {
    var email = req.header('email');
    console.log('isWorking' + email);
    let staff;
    try {
        staff = await (await Client.findOne({ email: email })).populate('creator')
        // console.log(staff)
        // delete = await User.deleteOne(where)
    } catch (err) {
        console.log(err.message)
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await staff.remove({ session: sess });
        console.log(staff.creator)
        staff.creator.client.pull(staff);
        console.log('sdadadadadadsadad')
        await staff.creator.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        console.log(err.message);
        return res.json(err.message);
    }

    return res.json(`Client with Email (${email}) Deleted`);

}



module.exports.deleteStaff = async (req, res) => {
    var email = req.header('email');
    console.log('isWorking');
    let staff;
    try {
        staff = await (await Staff.findOne({ email: email })).populate('creator')
        // console.log(staff)
        // delete = await User.deleteOne(where)
    } catch (err) {
        console.log(err.message)
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await staff.remove({ session: sess });
        console.log(staff.creator)
        staff.creator.staff.pull(staff);
        console.log('sdadadadadadsadad')
        await staff.creator.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        console.log(err.message);
        return res.json(err.message);
    }

    return res.json(`Staff with Email (${email}) Deleted`);

}


module.exports.getClient = async (req, res) => {
    console.log('llolollo')
    try {
        userWithClient = await User.findById(req.user.id).populate('client');
        console.log({ client: userWithClient.client.map(client => client.toObject({ getters: true })) })
        console.log({ client: userWithClient.client.map(client => client.toObject({ getters: true })) })
        return res.json({ client: userWithClient.client.map(client => client.toObject({ getters: true })) });

    } catch (err) {
        return res.status(500).json(err.message);
    }
    // try {
    //     const products = await pool.query("SELECT * FROM products");
    //     return res.json(products.rows);
    // } catch (err) {
    //     return res.status(500).json(err.message);
    // }
}


module.exports.getAdmin = async (req, res) => {
    console.log('llolollo')
    try {
        admin = await User.findById(req.user.id);
        return res.json({ admin: admin });

    } catch (err) {
        return res.status(500).json(err.message);
    }
}



module.exports.signin = async (req, res) => {
    const { error } = validateAdminSignin(req.body);
    if (error) {
        var e = "";
        error.details.forEach(element => {
            e = e + " " + element.message;
        });

        return res.status(400).json(e);
    }

    const { email, password } = req.body;
    var admin;
    try {
        admin = await User.findOne({ email: email });
    } catch (err) {
        return res.status(500).json("Server Error1!");
    }

    if (!admin) return res.status(401).json("User not found, please signup!");
    if (!admin.activated) return res.status(401).json("Kindly verify your account first!");
    console.log(admin)
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(401).json(`The password you entered is incorrect!`);

    const role = admin.role ? 'admin' : 'client';

    const payload = {
        id: admin.id,
        role: role
    }
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1hr" });
    return res.json({ token: token });
};


module.exports.adminAuth = async (req, res, next) => {
    const { id } = req.body;
    const expTimeTokenBody = id;
    const date = new Date();
    var admin;
    if (!expTimeTokenBody) return res.json({ err: "Your token has expired!" });
    try {
        // const admin = await pool.query("SELECT * FROM users WHERE temporarytoken=$1", [expTimeTokenBody]);

        admin = await User.findOne({ temporaryToken: expTimeTokenBody });
        if (!admin) { return res.json({ err: `Your token has expired!` }) }

        if (!admin.activated) {
            const decodedToken = jwt.verify(expTimeTokenBody, process.env.SECRET);
            console.log(decodedToken.expTime + "aaaaaa");
            console.log(admin.temporaryToken)
            if (date.getTime() < decodedToken.expTime) {
                // const update = await pool.query("UPDATE users SET activated=$1 WHERE temporaryToken=$2", [true, admin.temporaryToken]);
                try {
                    // tempstaff = await staff.findById(id);
                    const updatedUser = await User.findOneAndUpdate({ temporaryToken: expTimeTokenBody }, {
                        activated: true
                    }, { new: true });
                } catch (error) {
                    return res.status(500).json("Server Error!")
                }
                var mailOptions = {
                    from: process.env.GMAILUSER,
                    to: admin.email,
                    subject: `Activation Link`,
                    text: `Your account has been successfully activated`,
                    html: `<body style="border-radius:2%;border: 1px solid orangered;background:linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(81,92,114,1) 53%, rgba(67,73,73,1) 100%);padding: 30px;"><h1 style="color: rgb(177, 59, 59)">Hello ` + admin.rows[0].name + `,</h1><h3 style="color: rgb(146, 146, 158)">Your account has been activated successfully!</h3></body>`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return res.status(403).json(error);
                    } else {
                        console.log(`Email sent: ` + info.response);
                        return res.json("Email has been verified");
                    }
                });
            } else {
                res.json({ err: `Your token has expired!` });
            }
        } else {
            return res.json({ err: `Account already verified!` });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json(err);
    }
}

module.exports.verifyToken = (req, res) => {
    try {
        console.log(req.user)
        return res.json({ 'user_id': req.user.id, 'role': req.user.role });
    } catch (err) {
        return res.status(500).send('Server Error!');
    }
}

module.exports.adminDashboard = (req, res) => {
    res.json(req.user.role);
}



// module.exports.adminAuth = async (req, res, next) => {
//     const { token } = req.body;

//     try {
//         const admin = await pool.query("SELECT * FROM users WHERE temporarytoken=$1", [token]);
//         console.log(token)
//         if (!admin.rows) { res.json(`please register first`) }
//         if (!admin.rows[0].activated) {
//             const update = await pool.query("UPDATE users SET activated=$1 WHERE temporaryToken=$2", [true, token]);
//             var mailOptions = {
//                 from: process.env.GMAILUSER,
//                 to: admin.email,
//                 subject: `Activation Link`,
//                 text: `Your account has been successfully activated`,
//                 html: `<body style="background-color:#f6d55c;padding: 30px;"><h1>Hello ` + admin.user + `,</h1><h3>Your account has been successfully activated</h3></body>`
//             };

//             transporter.sendMail(mailOptions, function (error, info) {
//                 if (error) {
//                     console.log(error);
//                 } else {
//                     console.log(`Email sent: ` + info.response);
//                 }
//             });
//             return res.json(`Account has been verified!`);
//         } else {
//             return res.json(`Account already verified!`);
//         }
//     } catch (err) {
//         return res.status(500).json(err);
//     }
// }