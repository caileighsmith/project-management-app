const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize('sqlite:memory');

const User = sequelize.define('User',{
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
})

const Ticket = sequelize.define('Ticket',{
    title: DataTypes.STRING,
    task: DataTypes.STRING,
    progress: DataTypes.STRING,
    reporter: DataTypes.STRING,
    assignee: DataTypes.STRING,
    priority: DataTypes.INTEGER
})


module.exports = {
    sequelize,
    User,
    Ticket
}