import axios from '@/axios';
// 所有类目接口
export default {
  list(params) {
    return axios.get('/category/all', { params });
  },
};
