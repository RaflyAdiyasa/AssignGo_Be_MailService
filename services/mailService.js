import db from '../models/index.js';

const { Mail, History } = db;

export const createMail = async (mailData) => {
  return await Mail.create(mailData);
};

export const getAllMails = async () => {
  return await Mail.findAll({
    include: [{
      model: History,
      as: 'histories',
      order: [['tanggal_update', 'DESC']],
      limit: 1
    }]
  });
};

export const getMailById = async (id) => {
  return await Mail.findByPk(id, {
    include: [{
      model: History,
      as: 'histories',
      order: [['tanggal_update', 'DESC']]
    }]
  });
};

export const getMailsByUser = async (userId) => {
  return await Mail.findAll({
    where: { id_pengirim: userId },
    include: [{
      model: History,
      as: 'histories',
      order: [['tanggal_update', 'DESC']],
      limit: 1
    }],
    order: [['tanggal_pengiriman', 'DESC']]
  });
};

export const getMailStats = async () => {
  const totalMails = await Mail.count();
  const processedMails = await History.count({
    where: { status: 'diproses' },
    distinct: true,
    col: 'id_surat'
  });
  const approvedMails = await History.count({
    where: { status: 'disetujui' },
    distinct: true,
    col: 'id_surat'
  });
  const rejectedMails = await History.count({
    where: { status: 'ditolak' },
    distinct: true,
    col: 'id_surat'
  });

  return {
    totalMails,
    processedMails,
    approvedMails,
    rejectedMails
  };
};