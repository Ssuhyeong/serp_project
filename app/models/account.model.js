module.exports = (sequelize, Sequelize) => {
    const account = sequelize.define("account", {
        idx: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_email: {
            type: Sequelize.STRING(1000),
            allowNull: false,
        },
        user_password: {
            type: Sequelize.STRING(2000),
            allowNull: false,
        }
        
    },
    {
      charset: 'euckr',
      collate: 'euckr_bin',
      timestamps: false,
      tableName: 'account'
    });

    return account;
}