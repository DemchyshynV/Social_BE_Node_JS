module.exports = {
    sequelize: {
        db_name: 'mybook2',
        user_name: 'root',
        password: 'K1l@t1V123',
        options: {
            host: 'localhost',
            dialect: 'mysql'
        }
    },
    jwt:{
        secret: 'K1l@t1V!123',
        expiresIn: 3600, //1h,
        algorithm:'HS512'
    }
};
