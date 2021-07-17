const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
    cart: [{
        id: { type: Number, required: true },
    }],
    orders: [{
        id: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        address: { type: String, required: true },
        date: { type: Date, default: Date.now }
    }],
    token: { type: String }
})

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.token = token;
        await this.save();
        return token;
    } catch (error) {
        return -1;
    }
}

userSchema.methods.addItem = async function (props) {
    try {
        const id = (props.catagory === 'Fast Food' ? props.id : (props.catagory === 'Pizza' ? props.id + 9 : props.id + 18));
        const cart = this.cart;
        let present = false;
        for (let i = 0; i < cart.length; i++) {
            present = (cart[i].id === id ? true : present);
        }
        if (!present) {
            this.cart = this.cart.concat({ "id": id });
            await this.save();
        }
    } catch (err) {
        return -1;
    }
}

userSchema.methods.removeItem = async function (id) {
    try {
        const cart = this.cart;
        let index = -1;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === id) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            this.cart.splice(index, 1);
            await this.save();
        }
        return 1;
    } catch (err) {
        return 0;
    }
}

userSchema.methods.placeOrder = async function (data) {
    try {
        const address = data.address;
        const orders = data.orders;
        for (let i = 0; i < orders.length; i++) {
            const order = {
                id: orders[i].id,
                quantity: orders[i].quantity,
                price: orders[i].price,
                address: address
            }
            this.orders.push(order);
        }
        await this.save();
        return 1;
    } catch (err) {
        return 0;
    }

}

const User = mongoose.model('USER', userSchema);

module.exports = User;