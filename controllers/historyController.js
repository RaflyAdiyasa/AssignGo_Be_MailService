import db from '../models/index.js';

const { History } = db;

export const getHistoryByMailId = async (req, res) => {
  try {
    const { mailId } = req.params;
    
    const histories = await History.findAll({
      where: { id_surat: mailId },
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

export const getLatestStatusForAllMails = async (req, res) => {
  try {
    // Query untuk mendapatkan status terakhir setiap surat
    const latestStatus = await History.findAll({
      attributes: ['id_surat', 'status', 'alasan', 'tanggal_update'],
      group: ['id_surat'],
      order: [['tanggal_update', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: latestStatus
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};