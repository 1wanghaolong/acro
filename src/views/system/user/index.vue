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
            :expand="expand"
            row-key="id"
            :columns="columns"
            :data="listDate"
            :pagination="false"
            :scroll="scroll"
            :scrollbar="scrollbar"
          >
            <template #optional="{ record }">
              <a-space>
                <a-button type="primary" @click="handleClick">
                  <template #icon>
                    <div>
                      <icon-plus />
                    </div>
                  </template>
                </a-button>
                <a-button type="primary" status="danger">
                  <template #icon>
                    <icon-delete />
                  </template>
                </a-button>
              </a-space>
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
              <a-input
                v-model="form.name"
                placeholder="请选择上级部门"
              />
            </a-form-item>
            <a-form-item field="post" label="部门名称" :rules="rules2">
              <a-input
                v-model="form.post"
                placeholder="部门名称"
              />
            </a-form-item>
            <a-form-item field="post" label="部门描述">
              <a-textarea placeholder="部门描述" allow-clear/>
            </a-form-item>
          </a-form>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { queryMessageList } from '@/api/system';
  import useLoading from '@/hooks/loading';
  import { useI18n } from 'vue-i18n';
  const { loading, setLoading } = useLoading(true);
  const scrollbar = ref(true);
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
    {required:true,message:'name is required'},{minLength:5,message:'must be greater than 5 characters'}
  ];
  const rules2 = [
    {required:true,message:'name is required'},{minLength:5,message:'must be greater than 5 characters'}
  ];
  const handleClick = () => {
    visible.value = true;
  };
  const handleOk = () => {
    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
  };
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
  const scroll = {
    x: 200,
    y: '100%',
  };
  const expand = ref({
    rowKey: 1,
  });
  const columns = ref([
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: t('system.user.department_name'),
      dataIndex: 'department_name',
    },
    {
      title: t('system.user.description'),
      dataIndex: 'description',
    },
    {
      title: t('system.user.Optional'),
      slotName: 'optional',
    },
  ]);
  let listDate: any = ref([]);
  const fetchSourceData = async () => {
    setLoading(true);
    try {
      const res:any = await queryMessageList(secahfrom);
      listDate.value = res.data;
      total.value = res.data.length;
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
    name: 'User', // If you want the include property of keep-alive to take effect, you must name the component
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
