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
          <a-button type="primary" @click="addnewBuilt">
            <template #icon>
              <icon-plus />
            </template>
            <!-- Use the default slot to avoid extra spaces -->
            <template #default>新建</template>
          </a-button>
          <a-table
            v-if="listDate.length > 0"
            ref="table"
            @expand="expand"
            row-key="id"
            :columns="columns"
            :data="listDate"
            :expanded-keys="expandedkeys"
            :pagination="false"
            :scroll="scroll"
            :scrollbar="scrollbar"
            :defaultExpandAllRows="true"
            @cell-click="cellclick"
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
      <!-- 新建弹框和编辑 -->
      <a-modal
        v-model:visible="visible"
        @cancel="handleCancel"
        @ok="handleOk"
        unmountOnClose
        :align-center="false"
        title-align="start"
      >
        <template #title> {{ title }} </template>
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
    <!-- 新建弹框和编辑 -->
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
  const title = ref('');
  const table: any = ref(null);
  const expandedkeys: any = ref([]);
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
  const handleClick = () => {
    title.value = '新增下级';
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
  const cellclick = (record: any, column: any, ev: Event) => {
    if (expandedkeys.value.length == 0) {
      expandedkeys.value.push(record.id);
      return
    }
    expandedkeys.value.forEach((item: any, index: string | number) => {
      if (item == record.id) {
        expandedkeys.value.splice(index, 1);
      } else {
        if (expandedkeys.value.indexOf(record.id) == -1) {
          expandedkeys.value.push(record.id);
        }
      }
    });
  };
  const addnewBuilt = () => {
    title.value = '新增组织架构';
    visible.value = true;
  };
  const scroll = {
    x: 200,
    y: '100%',
  };
  const expand = (rowKey: any, checked: any) => {
    console.log('rowKey', rowKey);
    console.log('checked', checked);
  };
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
      const res: any = await queryMessageList(secahfrom);
      listDate.value = res.data;
      total.value = res.data.length;
      expandedkeysArray(res.data);
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  const expandedkeysArray = (data: any) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];

      // 将当前节点的 id 放入数组中
      expandedkeys.value.push(node.id);

      // 如果当前节点有子节点，则递归遍历子节点
      if (node.children && node.children.length > 0) {
        expandedkeysArray(node.children);
      }
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
  :deep(.arco-space-item .arco-space-vertical) {
    width: 100%;
  }
  :deep(.arco-space-item .arco-space-vertical .arco-space-item) {
    width: 100%;
    display: flex;
    justify-content: end;
  }
</style>
