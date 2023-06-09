<template>
  <div class="container">
    <div
      :style="{
        display: 'flex',
        width: '100%',
        boxSizing: 'border-box',
        padding: '15px',
        backgroundColor: 'var(--color-fill-2)',
      }"
    >
      <a-card :style="{ width: '100%' }" :bordered="false">
        <a-space direction="vertical" size="large" fill>
          <a-table
            :data="listDate"
            :pagination="false"
            row-key="id"
            style="margin-top: 30px"
          >
            <template #columns>
              <a-table-column title="id" fixed="left">
                <template #cell="{ record }">
                  {{ record.id }}
                </template>
              </a-table-column>
              <a-table-column title="模块名称" data-index="module">
                <template #cell="{ record }">
                  {{ record.module }}
                </template>
              </a-table-column>
              <a-table-column title="列表" data-index="operate">
                <template #cell="{ record }">
                  {{ record.operate }}
                </template>
              </a-table-column>
              <a-table-column title="路由" data-index="route">
                <template #cell="{ record }">
                  {{ record.route }}
                </template>
              </a-table-column>
              <a-table-column title="参数" data-index="params" ellipsis>
                <template #cell="{ record }">
                  {{ record.params }}
                </template>
              </a-table-column>
              <a-table-column title="ip" data-index="ip">
                <template #cell="{ record }">
                  {{ record.ip }}
                </template>
              </a-table-column>
              <a-table-column title="请求方式" data-index="method">
                <template #cell="{ record }">
                  {{ record.method }}
                </template>
              </a-table-column>
              <a-table-column title="创建时间" data-index="created_at">
                <template #cell="{ record }">
                  {{ record.created_at }}
                </template>
              </a-table-column>
              <a-table-column title="操作人" data-index="creator">
                <template #cell="{ record }">
                  {{ record.creator }}
                </template>
              </a-table-column>
            </template>
          </a-table>
          <a-space direction="vertical" size="large">
            <a-pagination
              class="paginationEnd"
              :total="total"
              show-total
              show-jumper
              show-page-size
              @change="change($event)"
              @page-size-change="pageSizeChange($event)"
            />
          </a-space>
        </a-space>
      </a-card>

      <a-modal
        v-model:visible="visible"
        @cancel="handleCancel"
        @ok="handleOk"
        unmountOnClose
        :align-center="false"
        title-align="start"
      >
        <template #title> 增加下级 </template>
        <div>
          <a-form ref="formRef" :model="form" :style="{ width: '100%' }">
            <a-form-item field="name" label="上级部门" :rules="rules">
              <a-input v-model="form.name" placeholder="请选择上级部门" />
            </a-form-item>
            <a-form-item field="post" label="部门名称" :rules="rules2">
              <a-input v-model="form.post" placeholder="部门名称" />
            </a-form-item>
            <a-form-item field="post" label="部门描述">
              <a-textarea placeholder="部门描述" allow-clear />
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, h } from 'vue';
  import { postManagementList } from '@/api/system';
  import useLoading from '@/hooks/loading';
  import { useI18n } from 'vue-i18n';
  import { getDate } from '@/utils/fifter';
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const visible = ref(false);
  const formRef = ref();
  const total = ref(0);
  const form = reactive({
    name: '',
    post: '',
    isRead: false,
  });
  const rules = [
    { required: true, message: 'name is required' },
    { minLength: 5, message: 'must be greater than 5 characters' },
  ];
  const rules2 = [
    { required: true, message: 'name is required' },
    { minLength: 5, message: 'must be greater than 5 characters' },
  ];
  const secahfrom = reactive({
    module: '',
    page: 1,
    limit: 10,
  });
  const change = (value: any) => {
    secahfrom.page = value;
    fetchSourceData();
  };
  const pageSizeChange = (value: any) => {
    secahfrom.limit = value;
    fetchSourceData();
  };
  const handleOk = () => {
    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
  };
  let listDate: any = ref([]);
  const fetchSourceData = async () => {
    setLoading(true);
    try {
      const res: any = await postManagementList(secahfrom);
      listDate.value = res.data;
      total.value = res.count;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  {
    fetchSourceData();
  }
</script>

<script lang="ts">
  export default {
    name: 'dept', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>

<style lang="less" scoped>
  .container {
    background-color: var(--color-fill-2);
    padding: 16px 20px;
    padding-bottom: 0;
    display: flex;
  }
</style>
