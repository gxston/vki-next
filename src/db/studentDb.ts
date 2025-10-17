import sqlite3 from 'sqlite3';

import type StudentInterface from '@/types/StudentInterface';

sqlite3.verbose();

export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const students = await new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM student';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(rows);
      db.close();
    });
  });

  return students as StudentInterface[];
};

export const deleteStudentDb = async (id: number): Promise<number> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const studentId = await new Promise((resolve, reject) => {
    const sql = 'DELETE FROM student WHERE id = ?';
    db.run(sql, id, err => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(id);
      db.close();
    });
  });

  return studentId as number;
};
