import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type StudentInterface from '@/types/StudentInterface';
import { getStudentsApi, deleteStudentApi, addStudentApi } from '@/api/studentsApi';

interface StudentsHookInterface {
  students: StudentInterface[];
  deleteStudentMutate: (studentId: number) => void;
  addStudentMutate: (student: StudentInterface) => void;
}

const useStudents = (): StudentsHookInterface => {
  const queryClient = useQueryClient();

  const { data, refetch } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsApi(),
    enabled: true,
  });

  const deleteStudentMutate = useMutation({
    mutationFn: async (studentId: number) => deleteStudentApi(studentId),
    onMutate: async (studentId: number) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);

      let updatedStudents = [...(previousStudents ?? [])];

      //if (!updatedStudents) return;

      updatedStudents = updatedStudents.map((student: StudentInterface) => ({
        ...student,
        ...(student.id === studentId ? { isDeleted: true} : {}),
      }));
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);

      debugger;

      return { previousStudents, updatedStudents };
    },
    onError: (err, variables, context) => {
      console.log('deleteStudentMutate err', err);
      debugger;
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },
    onSuccess: async (studentId, variable, { previousStudents }) => {
      debugger;

      await queryClient.cancelQueries({ queryKey: ['students'] });

      if (!previousStudents) {
        return;
      }

      const updatedStudents = previousStudents.filter((student: StudentInterface) => student.id !== studentId);
      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);
     },
  });

  const addStudentMutate = useMutation({
    mutationFn: async (student: StudentInterface) => addStudentApi(student),

    onMutate: async (student: StudentInterface) => {
      await queryClient.cancelQueries({ queryKey: ['students'] });
      const previousStudents = queryClient.getQueryData<StudentInterface[]>(['students']);

      let updatedStudents = [...(previousStudents ?? [])];

      if (!updatedStudents) return;

      updatedStudents.push({
        ...student,
        isNew: true,
      });

      queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents);

      return { previousStudents, updatedStudents };
    },

    onError: (err, variables, context) => {
      console.log('addStudentMutate err', err);
      queryClient.setQueryData<StudentInterface[]>(['students'], context?.previousStudents);
    },

    onSuccess: async (newStudent, variable, { updatedStudents }) => {
      refetch();

      queryClient.invalidateQueries({ queryKey: ['groups'] });

      // await queryClient.cancelQueries({ queryKey: ['students'] });

      // if (!updatedStudents) {
      //   return;
      // }

      // queryClient.setQueryData<StudentInterface[]>(['students'], updatedStudents.map((student: StudentInterface) => ({
      //   ...(student.uuid == newStudent.uuid ? newStudent : student),
      // })));
     },
  });

  return {
    students: data ?? [],
    deleteStudentMutate: deleteStudentMutate.mutate,
    addStudentMutate: addStudentMutate.mutate,
  };
};

export default useStudents;
