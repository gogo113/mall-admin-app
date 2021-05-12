<template>
  <div class="product-list">
    <!-- 搜索 -->
      <search-box @submit="searchSubmit" :data="categoryList"/>
    <!-- 列表 -->
      <product-table :data="tableData"
      :page="page"
      @change="changePage"
      :categoryList="categoryList"/>
  </div>
</template>

<script>
import searchBox from '@/components/search.vue';
import ProductTable from '@/components/productsTable.vue';
import api from '@/api/product';
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      tableData: [],
      searchForm: {},
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryObj: {},
    };
  },
  components: {
    searchBox,
    ProductTable,
  },
  async created() {
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
    },
    // 获取表格数据
    getTableData() {
      api.list({
        page: this.page.current,
        size: this.page.pageSize,
        ...this.searchForm,
      }).then((res) => {
        // console.log(res);
        this.page.total = res.total;
        this.tableData = res.data.map((item) => ({
          ...item,
          categoryName: this.categoryObj[item.category].name,
        }));
      });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
  },
};
</script>

<style>

</style>
