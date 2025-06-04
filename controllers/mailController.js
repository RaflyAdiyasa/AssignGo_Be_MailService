import db from '../models/index.js';
import mailService from '../services/mailService.js';

const { Mail, History } = db;

export const createMail = async (req, res) => {
  try {
    const { id_pengirim, url_file_surat, subject_surat } = req.body;
    
    const newMail = await mailService.createMail({
      id_pengirim,
      url_file_surat,
      subject_surat
    });

    // Create initial history
    await History.create({
      id_surat: newMail.id,
      status: 'diproses'
    });

    res.status(201).json({
      success: true,
      message: 'Surat tugas berhasil diajukan',
      data: newMail
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllMails = async (req, res) => {
  try {
    const mails = await mailService.getAllMails();
    res.status(200).json({
      success: true,
      data: mails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getMailById = async (req, res) => {
  try {
    const { id } = req.params;
    const mail = await mailService.getMailById(id);
    
    if (!mail) {
      return res.status(404).json({
        success: false,
        message: 'Surat tidak ditemukan'
      });
    }

    res.status(200).json({
      success: true,
      data: mail
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getMailsByUser = async (req, res) => {
  try {
    const { id_pengirim } = req.params;
    const mails = await mailService.getMailsByUser(id_pengirim);
    
    res.status(200).json({
      success: true,
      data: mails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateMailStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, alasan } = req.body;
    
    // Verify mail exists
    const mail = await Mail.findByPk(id);
    if (!mail) {
      return res.status(404).json({
        success: false,
        message: 'Surat tidak ditemukan'
      });
    }

    // Create new history record
    const newHistory = await History.create({
      id_surat: id,
      status,
      alasan: status === 'ditolak' ? alasan : null
    });

    res.status(200).json({
      success: true,
      message: 'Status surat berhasil diperbarui',
      data: newHistory
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getMailHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const histories = await History.findAll({
      where: { id_surat: id },
      order: [['tanggal_update', 'DESC']]
    });
    
    res.status(200).json({
      success: true,
      data: histories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getMailStats = async (req, res) => {
  try {
    const stats = await mailService.getMailStats();
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};