import { useQuery } from '@tanstack/react-query';
import type StudentInterface from '@/types/StudentInterface';
import { getStudentsApi } from '@/api/studentsApi';

interface StudentsHookInterface {
  students: StudentInterface[];
}

const useStudents = (): StudentsHookInterface => {
  // const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['students'],
    queryFn: () => getStudentsApi(),
    enabled: false,
  });

  return {
    students: data ?? [],
  };
};

export default useStudents;
