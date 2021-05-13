<template>
  <div class="basic-detail">
    <a-form-model ref="ruleForm" :model="form" :rules="rules"
                                  :label-col="{span: 5}" :wrapper-col="{span: 12}">
      <a-form-model-item label="副标题" prop="title" required>
        <a-input v-model="form.title" />
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-input v-model="form.desc" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" required prop="category">
        <a-select v-model="form.category" placeholder="请选择商品类别"
        @change="changeCategory">
          <a-select-option
          v-for="c in categoryList"
          :key="c.id"
          :value="c.id"
          >
            {{ c.name }}
          </a-select-option>
        </a-select>
        <a-select v-model="form.c_item" placeholder="添加商品子类目">
          <a-select-option v-for="c in categoryItems" :key="c" :value="c">
            {{ c }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags" required>
          <a-select
            v-model="form.tags"
            mode="tags"
            placeholder="请选择标签"
            :default-value="['包邮-最晚次日达']"
          >
            <a-select-option value="包邮-最晚次日达">
              包邮-最晚次日达
            </a-select-option>
          </a-select>
      </a-form-model-item>
      <a-form-model-item class="next-btn" label="" :wrapperCol="{span: 24}">
        <a-button @click="next" class="btn">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      // form: {
      //   title: '',
      //   desc: '',
      //   category: '',
      //   c_items: [],
      //   tags: [],
      // },
      rules: {},
      categoryList: [],
      categoryItems: [],
    };
  },
  props: ['form'],
  created() {
    categoryApi.list().then((res) => {
      this.categoryList = res.data;
    });
  },
  methods: {
    changeCategory(category) {
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === category) {
          this.categoryItems = this.categoryList[i].c_items;
        }
        // console.log(this.categoryItems);
      }
    },
    next() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$emit('next', this.form);
          return true;
        }
        console.log('error submit!!');
        return false;
      });
    },
  },
};
</script>
<style lang="less" scoped>
  .basic-detail{
    .next-btn{
      text-align: center;
      .btn{
        background-color: #30A679;
        color: aliceblue;
      }
    }
  }
</style>
