const recordService = require('../services/recordService');
const db = require('../store/db');
class RecordController {
  createRecord(req, res, next) {
    try {
      const { amount, type, category, date, note } = req.body;
      const userId = req.user.id; // From auth middleware

      if (!amount || !type || !category) {
        return res.status(400).json({ error: 'Amount, type, and category are required' });
      }

      if (amount <= 0) {
        return res.status(400).json({ error: 'Amount must be a positive number' });
      }

      if (!['income', 'expense'].includes(type)) {
        return res.status(400).json({ error: "Type must be 'income' or 'expense'" });
      }

      const record = recordService.createRecord({ userId, amount, type, category, date, note });
      res.status(201).json(record);
    } catch (error) {
      next(error);
    }
  }
  /*
    getRecords(req, res, next) {
      try {
        const { type, category, date, search, page, limit } = req.query;
        const result = recordService.getRecords({ type, category, date, search, page, limit });
        res.json(result);
      } catch (error) {
        next(error);
      }
    }
      */
  getRecords({ type, category, date, search, page = 1, limit = 5 }) {
    let records = db.records.filter(r => !r.isDeleted);

    // Filter by type
    if (type) {
      records = records.filter(r => r.type === type);
    }

    // Filter by category
    if (category) {
      records = records.filter(r => r.category === category);
    }

    // Filter by exact date
    if (date) {
      records = records.filter(r => {
        return new Date(r.date).toISOString().split('T')[0] === date;
      });
    }

    // 🔍 Search (category + note)
    if (search) {
      const searchLower = search.toLowerCase();
      records = records.filter(r =>
        r.category.toLowerCase().includes(searchLower) ||
        (r.note && r.note.toLowerCase().includes(searchLower))
      );
    }

    // 📄 Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const start = (pageNum - 1) * limitNum;

    const paginatedData = records.slice(start, start + limitNum);

    return {
      page: pageNum,
      limit: limitNum,
      total: records.length,
      data: paginatedData
    };
  }

  updateRecord(req, res, next) {
    try {
      const { id } = req.params;
      const { amount, type, category, date, note } = req.body;

      if (amount !== undefined && amount <= 0) {
        return res.status(400).json({ error: 'Amount must be a positive number' });
      }

      if (type !== undefined && !['income', 'expense'].includes(type)) {
        return res.status(400).json({ error: "Type must be 'income' or 'expense'" });
      }

      const updatedRecord = recordService.updateRecord(id, { amount, type, category, date, note });
      if (!updatedRecord) {
        return res.status(404).json({ error: 'Record not found' });
      }
      res.json(updatedRecord);
    } catch (error) {
      next(error);
    }
  }

  deleteRecord(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = recordService.deleteRecord(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Record not found' });
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RecordController();
