'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import Student from './Student';
import { useState } from 'react';
import AddStudent from '../AddStudent/AddStudent';

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate, addStudentMutate } = useStudents();
  
  const onDeleteHandler = (id: number): void => {
    deleteStudentMutate(id);
  };

  const onSubmitHandler = (student: StudentInterface): void => {
    addStudentMutate(student);
  };

  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleClick = () => {
    setIsAddOpen(true);
  };

  return (
    <div className={styles.Students}>
      {students.map((student: StudentInterface, index) => (
        <Student
          key={index}
          student={student}
          onDelete={onDeleteHandler}/>
      ))}

      <button onClick={handleClick}>Добавить студента</button>
      {isAddOpen && <AddStudent onSubmit={onSubmitHandler}/>}
    </div>
  );
};

export default Students;
