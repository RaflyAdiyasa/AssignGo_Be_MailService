import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Mail = sequelize.define('Mail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_pengirim: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    url_file_surat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subject_surat: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tanggal_pengiriman: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'mail',
    timestamps: false
  });

  Mail.associate = (models) => {
    Mail.hasMany(models.History, {
      foreignKey: 'id_surat',
      as: 'histories'
    });
  };

  return Mail;
};