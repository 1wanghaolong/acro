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
            :pagination="pagination"
            :scroll="scroll"
            :scrollbar="scrollbar"
          >
             <template #expand>
                <icon-right />
             </template>
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
  import { reactive, ref,h } from 'vue';
  import { permissionsMessageList } from '@/api/system';
  import { IconSearch } from '@arco-design/web-vue/es/icon';
  import useLoading from '@/hooks/loading';
  import { useI18n } from 'vue-i18n';
  import { getDate } from '@/utils/fifter'
  const { loading, setLoading } = useLoading(true);
  const scrollbar = ref(true);
  const { t } = useI18n();
  const visible = ref(false);
  const formRef = ref();
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
  const scroll = {
    x: 200,
    y: '100%',
  };
  const expand = ref({
    rowKey: 1,
  });
  const pagination = { pageSize: 20 };
  const columns = ref([
    {
      title: '菜单标题',
      dataIndex: 'permission_name',
    },
    {
      title: '图标',
      dataIndex: 'icon',
    },
    {
      title: '权限标识',
      dataIndex: 'permission_mark',
    },
    {
      title: '组件路径',
      dataIndex: 'component',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
    },
    {
      title: t('system.user.Optional'),
      slotName: 'optional',
    },
  ]);
  const addzj = () => {};
  let listDate: any = ref([]);
  const fetchSourceData = async () => {
    setLoading(true);
    try {
      const { data } = await permissionsMessageList();
      data.forEach((item:any) =>{
        if (typeof item.created_at ===  'number') {
          item.created_at = getDate(item.created_at,'year')
        }
      })
      listDate.value = data;
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
