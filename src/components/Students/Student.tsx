'use client';

import styles from './Student.module.scss';
import StudentInterface from '@/types/StudentInterface';

interface Props {
  student: StudentInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: Props): React.ReactElement => {
  const onDeleteHandler = (): void => {
    onDelete(student.id);
  };

  return (
    <div className={`${styles.Students} ${student.isDeleted ? styles['--isDeleted'] : ''}`}>
      {student.id}
      {' - '}
      {student.last_name}
      {' '}
      {student.first_name}
      {' '}
      {student.middle_name}
      {' '}
      <button onClick={onDeleteHandler}>Удалить</button>
    </div>
  );
};

export default Student;
