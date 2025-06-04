import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const History = sequelize.define('History', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_surat: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('diproses', 'disetujui', 'ditolak'),
      defaultValue: 'diproses'
    },
    alasan: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tanggal_update: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'history',
    timestamps: false
  });

  History.associate = (models) => {
    History.belongsTo(models.Mail, {
      foreignKey: 'id_surat',
      as: 'mail'
    });
  };

  return History;
};