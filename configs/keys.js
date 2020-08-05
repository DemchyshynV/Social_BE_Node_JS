module.exports = {
    sequelize: {
        db_name: 'mybook2',
        user_name: 'root',
        password: 'root',
        options: {
            host: 'localhost',
            dialect: 'mysql'
        }
    },
    jwt:{
        secret: 'K1l@t1V!123',
        expiresIn: 3600000, //1h,
        algorithm:'HS512'
    }
};
