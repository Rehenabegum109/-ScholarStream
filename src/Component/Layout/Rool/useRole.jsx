import { useQuery } from '@tanstack/react-query';
import { UseAuth } from '../../Hook/AuthProvider';
import useAxiosSecure from '../../Hook/useAxiosSecure';

const useRole = () => {
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = 'student', isLoading: roleLoading } = useQuery({
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      if (!user?.email) return 'Student';
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      console.log('Role from backend:', res.data); 
      return res.data?.role || 'Student';
    },
    enabled: !!user?.email,
  });

  return { role, roleLoading };
};

export default useRole;
