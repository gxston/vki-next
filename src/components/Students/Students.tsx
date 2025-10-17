'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import Student from './Student';

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate } = useStudents();
  
  const onDeleteHandler = (id: number): void => {
    deleteStudentMutate(id);
  };

  return (
    <div className={styles.Students}>
      {students.map((student: StudentInterface, index) => (
        <Student
          key={index}
          student={student}
          onDelete={onDeleteHandler}/>
      ))}
    </div>
  );
};

export default Students;
