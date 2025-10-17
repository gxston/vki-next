'use client';

import { useForm } from 'react-hook-form';
import styles from './AddStudent.module.scss';

import StudentInterface from '@/types/StudentInterface';

interface Props {
  onSubmit: (student: StudentInterface) => void;
};

const AddStudent = ({ onSubmit }: Props): React.ReactElement => {
  const { register, handleSubmit, formState: { errors } } = useForm<StudentInterface>();

  const onSubmitHandler = (student: StudentInterface) => {
debugger;
    console.log(student);
    onSubmit(student);
  };

  return (
    <div className={styles.Students}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <label htmlFor="last_name">Фамилия</label>
        <input id="last_name" {...register('last_name', { required: 'Поле фамилия не может быть пустым'})}/>
        {errors?.last_name && <p>{errors.last_name.message}</p>}
        <br/>

        <label htmlFor="first_name">Имя</label>
        <input id="first_name" {...register('first_name', { required: 'Поле имя не может быть пустым'})}/>
        {errors?.first_name && <p>{errors.first_name.message}</p>}
        <br/>

        <label htmlFor="middle_name">Отчество</label>
        <input id="middle_name" {...register('middle_name', { required: 'Поле отчество не может быть пустым'})}/>
        {errors?.middle_name && <p>{errors.middle_name.message}</p>}
        <br/>

        <label htmlFor="groupId">Группа</label>
        <input id="groupId" {...register('groupId', { required: 'Поле группа не может быть пустым', valueAsNumber: true})}/>
        {errors?.groupId && <p>{errors.groupId.message}</p>}
        <br/>

        <button type="submit">Добавить</button>
      </form>
    </div>
  );
};

export default AddStudent;