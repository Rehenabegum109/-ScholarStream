import { useQuery } from '@tanstack/react-query';
import { UseAuth } from '../../Hook/AuthProvider';
import useAxiosSecure from '../../Hook/UseAxiosSecure';

const useRole = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = 'student', isLoading: roleLoading } = useQuery({
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      if (!user?.email) return 'student';
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      console.log('Role from backend:', res.data); // <-- Debug
      return res.data?.role || 'student';
    },
    enabled: !!user?.email,
  });

  return { role, roleLoading };
};

export default useRole;
