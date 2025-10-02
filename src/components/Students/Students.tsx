'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';

const Groups = (): React.ReactElement => {
  const { students } = useStudents();

  return (
    <div className={styles.Students}>
      {students.map((student: StudentInterface) => (
        <h2 key={student.id}>
          {student.last_name} {student.first_name} {student.middle_name}
        </h2>
      ))}
    </div>
  );
};

export default Groups;
