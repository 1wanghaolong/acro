<template>
  <div class="wrap">
    <Breadcrumb />
    <a-card class="generalCard">
      <div class="searchBox" :style="{ 'grid-template-rows': !searchInfo.show ? '0fr' : '1fr' }">
        <a-form auto-label-width layout="vertical" :model="searchInfo.data" ref="searchFormRef">
          <a-row :gutter="16">
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="agentName" :label="$t('channel.channel.5ukm1zdywa80')">
                <a-input v-model="searchInfo.data.agentName" :placeholder="$t('channel.channel.5ukm1zdyxj00')" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="userName" :label="$t('channel.channel.5ukm1zdyxts0')">
                <a-input v-model="searchInfo.data.userName" :placeholder="$t('channel.channel.5ukm1zdyxj00')" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="topAgentName" :label="$t('channel.channel.5ukm1zdyxzk0')">
                <a-input v-model="searchInfo.data.topAgentName" :placeholder="$t('channel.channel.5ukm1zdyxj00')" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="topUserName" :label="$t('channel.channel.5ukm1zdyy4k0')">
                <a-input v-model="searchInfo.data.topUserName" :placeholder="$t('channel.channel.5ukm1zdyxj00')" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="status" :label="$t('channel.channel.5ukm1zdyycs0')">
                <a-select allow-clear v-model="searchInfo.data.status" :placeholder="$t('channel.channel.5ukm1zdyyis0')">
                  <a-option v-for="item in useEnums('cms.agent.channel.status')" :value="item.value">{{
                    item.trans[local.lang] }}</a-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :xs="24" :sm="12" :md="8" :xl="6">
              <a-form-item field="time" :label="$t('channel.channel.5ukm1zdyynw0')">
                <a-range-picker v-model="searchInfo.data.time" format="YYYY-MM-DD" />
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
            {{ searchInfo.show ? $t('channel.channel.5ukm1zdyyto0') : $t('channel.channel.5ukm1zdyyys0') }}
          </a-button>
          <a-button @click="resetBtn">
            <template #icon>
              <icon-refresh />
            </template>
            {{$t('channel.channel.5ukm1zdyz400')}}
          </a-button>
          <a-button @click="getData" type="primary">
            <template #icon>
              <icon-search />
            </template>
            {{$t('channel.channel.5ukm1zdyz980')}}
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
            <a-table-column title="ID" data-index="id" :width="80"></a-table-column>
            <a-table-column :title="$t('channel.channel.5ukm1zdywa80')" data-index="agent_name" :ellipsis="true" :tooltip="true" :width="160">
            </a-table-column>
            <a-table-column :title="$t('channel.channel.5ukm1zdyxts0')" data-index="user_name" :width="local.lang=='en'?150:100">
            </a-table-column>
            <a-table-column :title="$t('channel.channel.5ukm1zdyze00')" data-index="top_agent_name" :ellipsis="true" :tooltip="true" :width="160">
              <template #cell="{ record }">
                <span v-if="record.top_agent_name">
                  {{ record.top_agent_name }}({{ record.top_user_name }})
                </span>
                <span v-else>
                  -
                </span>
              </template>
            </a-table-column>
            <a-table-column :title="$t('channel.channel.5ukm1zdyzjk0')" data-index="commission_rate" :width="local.lang=='en'?160:120">
              <template #cell="{ record }">
                <div>
                  交易:{{ record.commission_rate ? record.commission_rate + '%' : '--' }}
                </div>
                <div v-if='local.config?.agent?.is_show_trs_interest'>
                  利息:{{ record.trs_interest_rate ? record.trs_interest_rate + '%' : '--' }}
                </div>
              </template>
            </a-table-column>
            <a-table-column :title="$t('channel.channel.5ukm1zdyzrk0')" data-index="invite_num"  :width="local.lang=='en'?210:110">
            </a-table-column>
            <a-table-column :title="$t('channel.channel.5ukm1zdyzwc0')" data-index="open_num"  :width="local.lang=='en'?280:110">
            </a-table-column>
            <a-table-column :title="$t('channel.channel.5ukm1zdz01c0')" data-index="payment_num"  :width="local.lang=='en'?210:110">
            </a-table-column>
            <a-table-column :title="$t('channel.channel.5ukm1zdyycs0')" :width="100">
              <template #cell="{ record }">
                <span v-if="$permission(['cmsAgentUserUpdateStatus'])">
                  <a-switch size="small" v-permission="['cmsAgentUserUpdateStatus']"
                    @change="handleChangeIntercept(record)" v-model="record.status" :checked-value="1"
                    :unchecked-value="0">
                  </a-switch>
                </span>
                <span v-else>
                  {{ useEnumsFormat('cms.agent.channel.status', record.status) }}
                </span>
              </template>
            </a-table-column>
            <a-table-column :title="$t('channel.channel.5ukm1zdyynw0')" :width="local.lang=='en'?140:120">
              <template #cell="{ record }">
                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('YYYY-MM-DD') : '--' }}
                </div>
                <div>{{ record.create_time ? dayjs.unix(record.create_time).format('HH:mm:ss') : '--' }}
                </div>
              </template>
            </a-table-column>
            <a-table-column v-if="$permission(['cmsAgentInvite', 'cmsAgentUserResetPassword', 'cmsAgentUserUpdate'])"
              fixed="right" :title="$t('channel.channel.5ukm1zdz06o0')" :width="local.lang=='en'?300:200">
              <template #cell="{ record }">
                <a-space>
                  <a-link v-if="$permission(['cmsAgentUserUpdate'])" @click="updatetBtn(record)">{{$t('channel.channel.5ukm1zdz0aw0')}}</a-link>
                  <a-link v-if="$permission(['cmsAgentInvite'])"
                    @click="router.push({ name: 'cmsAgentInvite', query: { id: record.id } })">{{$t('channel.channel.5ukm1zdz0g00')}}</a-link>
                  <a-link @click="savaPassBtn(record)" v-if="$permission(['cmsAgentUserResetPassword'])">{{$t('channel.channel.5ukm1zdz0m40')}}</a-link>
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
    <a-modal v-model:visible="visible" @ok="handleOk" @cancel="visible = false">
      <template #title>
        {{$t('channel.channel.5ukm1zdz0m40')}}
      </template>
      <div>{{ $t('channel.channel.5ukm1zdz0qs0') }}{{ ` ${dataPass.agent_name}(${dataPass.user_name}) ` }}{{ $t('channel.channel.5ukm1zdz0xo0') }}</div>
    </a-modal>
    <a-modal width="600px" :mask-closable=false v-model:visible="showVisibleUpdate" :on-before-ok="handleUpdateSubmit"
      @close="onClose">
      <template #title>
        {{ $t('channel.channel.5ukm1zdz0aw0') }}
      </template>
      <a-form ref="formRef" :model="form.data" :rules="(form.rules as any)" layout="vertical">
        <a-row :gutter="16">
          <a-col :xs="24" :sm="12" :md="8" :xl="12">
            <a-form-item field="agent_name" :label="$t('channel.channel.5ukm1zdywa80')">
              <a-input v-model="form.data.agent_name" :placeholder="$t('channel.channel.5ukm1zdz12k0')" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="12">
            <a-form-item field="country_code" :label="$t('channel.channel.5ukm1zdz16s0')">
              <a-select allow-search allow-clear v-model="form.data.country_code" :placeholder="$t('channel.channel.5ukm1zdz1ao0')">
                <a-option v-for="item in countryCodeList" :value="item.country_code">
                  {{ item.country_code }} {{ item.name }} {{ item.country_label }}
                </a-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="12">
            <a-form-item field="mobile" :label="$t('channel.channel.5ukm1zdz1f80')">
              <a-input v-model="form.data.mobile" :placeholder="$t('channel.channel.5ukm1zdz1j40')" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="12">
            <a-form-item field="email" :label="$t('channel.channel.5ukm1zdz1nk0')">
              <a-input v-model="form.data.email" :placeholder="$t('channel.channel.5ukm1zdz1rk0')" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="12">
            <a-form-item field="commission_rate" :label="$t('channel.channel.5ukm1zdz1vw0')">
              <a-input-number hide-button v-model="form.data.commission_rate" :placeholder="$t('channel.channel.5ukm1zdz1zk0')">
              </a-input-number>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="12" v-if='local.config?.agent?.is_show_trs_interest'>
            <a-form-item field="trs_interest_rate" :label="$t('channel.channel.5ukm1zdz23o0')" v-if='local.config?.agent?.is_show_trs_interest'>
              <a-input-number hide-button v-model="form.data.trs_interest_rate" :placeholder="$t('channel.channel.5ukm1zdz2880')">
              </a-input-number>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="12" :md="8" :xl="12">
            <a-form-item field="toAgentName" :label="$t('channel.channel.5ukm1zdz2cc0')">
              <div style="width:100%">
                <a-input disabled v-model="form.data.toAgentName" :placeholder="$t('channel.channel.5ukm1zdz2gc0')" />
                <p style="margin-top:10px">{{$t('channel.channel.5ukm1zdz2k40')}}</p>
              </div>
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { useEnumsFormat, useEnums } from '@/hooks/enums'
import dayjs from 'dayjs'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const local = useLocal()
const route = useRoute()
const router = useRouter()
const searchFormRef = ref()
const searchInfo: any = reactive({
  show: false,
  data: {
    agentName: '',
    userName: '',
    topAgentName: '',
    topUserName: '',
    status: '',
    agentId: route.query?.id || '',
    time: [],
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
  let param: any = { ...searchInfo.data }
  Object.keys(param).forEach((item: any) => {
    if (!param[item] && param[item] != '0') {
      delete param[item];
    }
  })
  const { code, data } = await apiCms.cmsAgentUserlowerList({
    ...useFilter(param)
  })
  tableData.loading = false
  if (code != 1) return;
  tableData.list = data?.list || []
  tableData.count = data?.count
}
const resetBtn = () => {
  searchFormRef.value?.resetFields()
  searchInfo.data.market = ''
  searchInfo.data.mobile = ''
  if (route.query?.mobile || route.query?.market) {
    router.push({ name: 'cmsSimulatePosition' })
  }
  getData()
}
const validatorData = (value: any, cb: any) => {
  const number = parseFloat(value);
  const decimalStr = number.toString().split('.')[1];
  const num = decimalStr ? decimalStr.length : 0;
  if (value > 100) {
    cb(t('channel.channel.5ukm1zdz2o40'))
  } else if (value < 0) {
    cb(t('channel.channel.5ukm1zdz2uw0'))
  } else if (num > 2) {
    cb(t('channel.channel.5ukm1zdz2zo0'))
  } else {
    return true
  }
}
const formRef = ref()
const form: any = reactive({
  dataScore: {
    score: 0
  },
  data: {
    mobile: '',
    country_code: '',
    agent_name: '',
    email: '',
    commission_rate: '',
    trs_interest_rate: "",
    toAgentName: '',
  },
  rules: {
    mobile: [{ required: true, message: t('channel.channel.5ukm1zdz1j40') }],
    agent_name: [{ required: true, message: t('channel.channel.5ukm1zdz12k0') }],
    email: [{ required: true, message: t('channel.channel.5ukm1zdz1rk0') }, { type: 'email', message: t('channel.channel.5ukm1zdz33g0') }],
    toAgentName: [{ required: true, message: t('channel.channel.5ukm1zdz2gc0') }],
    commission_rate: [{ required: true, message: t('channel.channel.5ukm1zdz1zk0') }, { validator: validatorData }],
    trs_interest_rate: [{ required: true, message: t('channel.channel.5ukm1zdz2880') }, { validator: validatorData }],
    country_code: [{ required: true, message: t('channel.channel.5ukm1zdz1ao0') }],

  }
})
const onClose = async () => {
  form.data = {
    mobile: '',
    country_code: '',
    agent_name: '',
    email: '',
    commission_rate: '',
    trs_interest_rate: "",
    toAgentName: '',
  },
    formRef.value.resetFields()
}
// 编辑
const showVisibleUpdate = ref(false)
const handleUpdateSubmit = async () => {
  const validate = await formRef.value?.validate();
  if (validate) return false
  let params = { ...form.data }
  params.commission_rate = params.commission_rate + ''
  if (local.config?.agent?.is_show_trs_interest) {
    params.trs_interest_rate = params.trs_interest_rate + ''
  }
  const { code, msg } = await apiCms.cmsAgentUserUpdate({
    agentId: form.data.agentId,
    data: params
  })
  if (code != 1) return false;
  Message.success({ content: msg })
  getData();
  return true

}
const updatetBtn = async (val: any) => {
  const obj = await getDetail(val.id)
  for (let key in form.data) {
    form.data[key] = obj[key]
  }
  form.data.commission_rate = Number(form.data.commission_rate)
  form.data.trs_interest_rate = Number(obj.trs_interest_rate)
  form.data.agentId = obj.id
  form.data.toAgentName = obj.top_agent_name + '(' + obj.top_user_name + ')'
  showVisibleUpdate.value = true
}
// 详情
const getDetail = async (id: any) => {
  const { code, data } = await apiCms.cmsAgentUserInfo({
    agentId: id
  })
  if (code != 1) return;
  return data
}
const countryCodeList = ref()
const getCountryCode = async () => {
  const { code, data } = await apiSystem.countryCodeList()
  if (code != 1) return;
  countryCodeList.value = data.map((item: any) => {
    item.country_code = `+${item.country_code}`
    return item
  })
}
// 修改状态
const handleChangeIntercept = async (val: any) => {
  const { code } = await apiCms.cmsAgentUserUpdateStatus({
    agentId: val.id,
    status: val.status
  })
  if (code != 1) {
    val.status = val.status == 0 ? 1 : 0
    return
  };
  Message.success({
    content: t('channel.channel.5ukm1zdz37g0'),
  })
  getData();
}
const visible = ref(false)
const dataPass = ref({
  agent_name: '',
  user_name: '',
  id: ''
})
const handleOk = async () => {
  const { code, msg } = await apiCms.cmsAgentUserResetPassword({ agentId: dataPass.value.id, })
  if (code != 1) return;
  Message.success({
    content: msg,
  })
  getData();
}

// 重置密码
const savaPassBtn = async (val: any) => {
  console.log(val);
  dataPass.value = val
  visible.value = true
}


{
  getCountryCode()
  getData()
}
</script>
<style scoped>
:deep(.arco-typography) {
  margin-bottom: 0;
}

:deep(.arco-input[disabled]) {
  -webkit-text-fill-color: var(--color-text-1);
}
</style>