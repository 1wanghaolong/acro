<template>
  <div class="wrap">
    <Breadcrumb />
    <a-card class="generalCard">
      <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
        <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="name" :label="$t('counterparties.counterparties.5umcd3vjqko0')">
                <a-input v-model="searchInfo.data.name" :placeholder="$t('counterparties.counterparties.5umcd3vjztc0')" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="status" :label="$t('counterparties.counterparties.5umcd3vk0700')">
                <a-select allow-clear v-model="searchInfo.data.status"
                  :placeholder="$t('counterparties.counterparties.5umcd3vk0bg0')">
                  <a-option v-for="item in useEnums('wealth.transaction.counterparty.status')" :value="item.value">{{
                    item.trans[local.lang] }}</a-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="buttonBox">
        <a-space :size="18">
          <a-button @click="searchInfo.show = !searchInfo.show">
            <template #icon>
              <icon-filter />
            </template>
            {{ searchInfo.show ? $t('counterparties.counterparties.5umcd3vk0h40') :
              $t('counterparties.counterparties.5umcd3vk0m40') }}
          </a-button>
          <a-button @click="searchFormRef?.resetFields(), getData()">
            <template #icon>
              <icon-refresh />
            </template>
            {{ $t('counterparties.counterparties.5umcd3vk0ts0') }}
          </a-button>
          <a-button @click="getData" type="primary">
            <template #icon>
              <icon-search />
            </template>
            {{ $t('counterparties.counterparties.5umcd3vk1000') }}
          </a-button>
        </a-space>
        <a-space :size="18">
          <a-button v-permission="['wealthCounterpartiesCreate']" @click="editVisible = true, statusVisible = 1"
            type="primary">
            <template #icon>
              <icon-plus />
            </template>
            {{ $t('counterparties.counterparties.5umcd3vk15o0') }}
          </a-button>
        </a-space>
      </div>
      <div class="tableBox">
        <a-table :bordered="false" column-resizable :pagination="false" :loading="tableData.loading"
          :scroll="tableData.list?.length ? { x: '100%', y: '100%' } : undefined" size="small" :data="tableData.list"
          class="table">
          <template #columns>
            <a-table-column title="#" :width="50">
              <template #cell="{ rowIndex }">
                {{ rowIndex + 1 }}
              </template>
            </a-table-column>
            <a-table-column :title="$t('counterparties.counterparties.5umcd3vjqko0')" data-index="name"></a-table-column>

            <a-table-column :title="$t('counterparties.counterparties.5umcd3vk1cs0')">
              <template #cell="{ record }">
                <span v-if="$permission(['wealthCounterpartiesUpdateStatus'])">
                  <a-switch v-permission="['wealthCounterpartiesUpdateStatus']" size="small"
                    @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                    :unchecked-value="0">
                  </a-switch>
                </span>
                <span v-else>
                  {{ useEnumsFormat('wealth.transaction.counterparty.status', record.status) }}
                </span>
              </template>

            </a-table-column>
            <a-table-column fixed="right" :title="$t('counterparties.counterparties.5umcd3vk1jc0')" :width="80"
              v-if="$permission(['wealthCounterpartiesUpdate'])">
              <template #cell="{ record }">
                <a-space>
                  <a-link v-permission="['wealthCounterpartiesUpdate']"
                    @click="editBtn(record)">{{ $t('counterparties.counterparties.5umcd3vk1n00') }}</a-link>
                </a-space>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </div>
      <div class="pagination">
        <a-pagination size="small" @change="getData" @page-size-change="getData" v-model:current="searchInfo.data.page"
          v-model:page-size="searchInfo.data.per_page" :total="tableData.count" show-total show-jumper show-page-size />
      </div>
    </a-card>
    <a-modal :mask-closable=false v-model:visible="editVisible" :on-before-ok="handleEdit" @close="onCloseEdit">
      <template #title>
        {{ statusVisible == 1 ? $t('counterparties.counterparties.5umcd3vk1pc0') :
          $t('counterparties.counterparties.5umcd3vk1rk0') }}
      </template>
      <div style="display: flex;">
        <a-form ref="formRef" :model="form" layout="vertical">
          <a-form-item field="nameZh" :label="$t('counterparties.counterparties.5umcd3vk1tw0')"
            :rules="[{ required: true, message: $t('counterparties.counterparties.5umce0wop0k0') }]" :validate-trigger="['change', 'input']">
            <a-input v-model="form.nameZh" :placeholder="$t('counterparties.counterparties.5umcd3vjztc0')" />
          </a-form-item>
          <a-form-item field="nameEn" :label="$t('counterparties.counterparties.5umcd3vk1w40')"
            :rules="[{ required: true, message: $t('counterparties.counterparties.5umce0wop0k0') }]" :validate-trigger="['change', 'input']">
            <a-input v-model="form.nameEn" :placeholder="$t('counterparties.counterparties.5umcd3vjztc0')" />
          </a-form-item>
          <a-form-item field="nameTc" :label="$t('counterparties.counterparties.5umcd3vk1yo0')"
            :rules="[{ required: true, message: $t('counterparties.counterparties.5umce0wop0k0') }]" :validate-trigger="['change', 'input']">
            <a-input v-model="form.nameTc" :placeholder="$t('counterparties.counterparties.5umcd3vjztc0')" />
          </a-form-item>
          <a-form-item :label="$t('counterparties.counterparties.5umcd3vk21c0')">
            <a-switch :checked-value="1" :unchecked-value="0" v-model="form.status" /><span style="margin-left:10px">{{
              form.status == 0 ? $t('counterparties.counterparties.5umcd3vk23c0') :
              $t('counterparties.counterparties.5umcd3vk25s0') }}</span>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { useEnums, useEnumsFormat } from '@/hooks/enums'
const { t } = useI18n();
const local = useLocal()
// const router = useRouter()
const searchFormRef = ref()
const searchInfo = reactive({
  show: false,
  data: {
    name: '',
    status: '',
    page: 1,
    per_page: 20
  }
})
const tableData = reactive({
  list: [],
  count: 0,
  message: [],
  loading: false
})
const getData = async () => {
  tableData.loading = true
  const { code, data } = await apiWealth.apiWealthCounterpartiesList({
    ...useFilter(searchInfo.data)
  })
  tableData.loading = false
  if (code != 1) return;
  tableData.list = data?.list || []
  tableData.count = data?.count
}
const handleChangeIntercept = async (val: any) => {

  let obj = await getWealthCounterpartiesInfo(val.id)
  const { code } = await apiWealth.apiWealthCounterpartiesUpdate({
    id: val.id,
    data: {
      name: {
        'zh-CN': obj.name['zh-CN'],
        'tc': obj.name['tc'],
        'en': obj.name['en'],
      },
      'status': val.status,
    }
  })
  if (code != 1) return;
  Message.success({
    content: t('counterparties.counterparties.5umcd3vk29k0'),
  })
  getData();
}
const getWealthCounterpartiesInfo = async (id: any) => {
  const { code, data } = await apiWealth.apiWealthCounterpartiesInfo({ id: id });
  if (code != 1) return;
  return data
}
// 编辑新增
const formRef: any = ref(null)
const statusVisible = ref(1)
const form = ref({
  nameZh: '',
  nameTc: '',
  nameEn: '',
  status: 1,
  id: ''
})
const editVisible = ref(false)
const editVisibleName = ref(t('counterparties.counterparties.5umcd3vk1pc0'))
const handleEdit = async () => {
  const res = await formRef.value?.validate();

  if (!res) {
    if (statusVisible.value == 1) {
      const res: any = await apiWealth.apiWealthCounterpartiesCreate({
        data: {
          status: form.value.status,
          name: {
            'zh-CN': form.value.nameZh,
            'tc': form.value.nameTc,
            'en': form.value.nameEn,
          }
        }
      });
      if (res.code != 1) return;
      Message.success({
        content: t('counterparties.counterparties.5umcd3vk2cs0'),
      })
      getData();

      return true
    } else {
      const res: any = await apiWealth.apiWealthCounterpartiesUpdate({
        id: form.value.id,
        data: {
          status: form.value.status,
          name: {
            'zh-CN': form.value.nameZh,
            'tc': form.value.nameTc,
            'en': form.value.nameEn,
          }
        }
      });
      if (res.code != 1) return;
      Message.success({
        content: t('counterparties.counterparties.5umcd3vk29k0'),
      })
      getData();
      return true
    }

  }
  return false
}
const editBtn = async (val: any) => {
  let obj = await getWealthCounterpartiesInfo(val.id)
  form.value.nameZh = obj.name['zh-CN']
  form.value.nameTc = obj.name['tc']
  form.value.nameEn = obj.name['en']
  form.value.id = val.id
  form.value.status = val.status
  editVisibleName.value = t('counterparties.counterparties.5umcd3vk1rk0')
  statusVisible.value = 2
  editVisible.value = true
}
const onCloseEdit = () => {
  form.value = {
    nameZh: '',
    nameTc: '',
    nameEn: '',
    status: 1,
    id: ''
  }
  formRef.value.resetFields()
}

{
  getData()
}
</script>