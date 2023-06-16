<template>
  <div class="container">
    <div
      :style="{
        display: 'flex',
        width: '100%',
        boxSizing: 'border-box',
        padding: '15px',
        backgroundColor: 'var(--color-fill-2)',
        flexDirection: 'column',
      }"
    >
      <a-card
        :style="{ width: '100%', marginBottom: '30px' }"
        :bordered="false"
      >
        <a-form :model="secahfrom" layout="inline" ref="refsecahfrom">
          <a-form-item field="mobile" label="通知账号">
            <a-input
              v-model="secahfrom.mobile"
              placeholder="请输入通知账号"
            />
          </a-form-item>
          <a-form-item field="event" label="通知模块">
            <a-select v-model="secahfrom.event" :style="{width:'320px'}" placeholder="请选择通知模块">
              <a-option v-for="item of NoticeData" :value="item.id" :label="item.value" />
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-space>
              <a-button @click="fetchSourceData()">查询</a-button>
              <a-button @click="refsecahfrom.resetFields();fetchSourceData();">重置</a-button>
            </a-space>
          </a-form-item> </a-form>
      </a-card>
      <a-card :style="{ width: '100%' }" :bordered="false">
        <a-space direction="vertical" size="large" fill>
          <div style="width: 100%; text-align: end">
            <a-button @click="secachFrom">查询</a-button>
          </div>
          <a-table
            :data="listDate"
            :pagination="false"
            row-key="id"
            :bordered="{ cell: true }"
            style="margin-top: 10px"
            column-resizable
          >
            <template #columns>
              <a-table-column title="id" :width="120" :align="'center'">
                <template #cell="{ record }">
                  {{ record.id }}
                </template>
              </a-table-column>
              <a-table-column
                title="通知区号"
                data-index="country_code"
                :width="250"
                :align="'center'"
              >
                <template #cell="{ record }">
                  {{ record.country_code }}
                </template>
              </a-table-column>
              <a-table-column
                title="通知账号"
                data-index="mobile"
                :width="250"
                :align="'center'"
              >
                <template #cell="{ record }">
                  {{ record.mobile }}
                </template>
              </a-table-column>
              <a-table-column
                title="通知模块"
                data-index="deleted_at"
                :width="250"
                :align="'center'"
              >
                <template #cell="{ record }">
                  {{ record.deleted_at ? record.deleted_at : '--' }}
                </template>
              </a-table-column>
              <a-table-column
                title="通知内容"
                data-index="options"
                :align="'center'"
              >
                <template #cell="{ record }">
                  {{ record.options }}
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
  import { getsmsList } from '@/api/sms';
  import useLoading from '@/hooks/loading';
  import { useI18n } from 'vue-i18n';
  import { getDate } from '@/utils/fifter';
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const refsecahfrom:any = ref(null)
  const visible = ref(false);
  const formRef = ref();
  const total = ref(0);
  //通知模块
  const NoticeData = [
  {
    id:'openSuccess',
    value:"开户成功" //基金开户成功
  },
  {
    id:'openFailed',
    value:"开户失败" //基金开户失败
  },
  {
    id:'upgradeSuccess',
    value:"账户升级成功" //账户升级成功
  },
  {
    id:'upgradeFailed',
    value:"账户升级失败" //账户升级失败
  }
]
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
  const secachFrom = () => {};
  const handleOk = () => {
    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
  };
  const secahfrom = reactive({
    mobile: "", //通知账户
    event: "", //模块名称
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
  let listDate: any = ref([]);
  const fetchSourceData = async () => {
    setLoading(true);
    try {
      const res: any = await getsmsList(secahfrom);
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
    name: 'sms', // If you want the include property of keep-alive to take effect, you must name the component
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
